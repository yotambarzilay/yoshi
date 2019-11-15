import {
  BusinessManagerModule,
  ModuleId,
  PageComponentId,
  registerModule,
  registerPageComponentMonitors,
} from '@wix/business-manager-api';
import { ModuleRegistry, ReactLoadableComponent } from 'react-module-container';
import Experiments from '@wix/wix-experiments';
import { BrowserClient } from '@sentry/browser';
import customInit from '../poc/moduleInit';
import { experimentsScopes } from '../poc/config.json';
import english from '../poc/translations/en.json';
import { getModuleId } from './utils';
import withBM from './withBM';
import { IBMModuleParams } from './hooks/ModuleProvider';

const pages = ['index'];
const components = ['LegacyTodoList'];
const methods = ['getTodos'];
const sentryClient = new BrowserClient({
  dsn: 'https://123456@sentry.ioo/1337',
});

class BMModule extends BusinessManagerModule {
  state: any = {};

  constructor(moduleId: ModuleId) {
    super(moduleId);

    pages.forEach(filename => {
      const componentId = `${getModuleId()}.pages.${filename}`;

      registerPageComponentMonitors(componentId as PageComponentId, {
        sentryClient,
      });

      this.registerPageComponent(
        componentId,
        ReactLoadableComponent(componentId, async () => {
          const experiments = new Experiments();
          experimentsScopes.forEach(scope => experiments.load(scope));

          // TODO: Do this the react-loadable way
          const [{ default: Component }] = await Promise.all([
            import(`../poc/pages/${filename}`),
            experiments.ready(),
          ]);

          return {
            default: withBM(
              componentId,
              experiments.all(),
              english,
              sentryClient,
            )(Component),
          };
        }),
      );
    });

    components.forEach(filename => {
      const componentId = `${getModuleId()}.components.${filename}`;

      this.registerComponentWithModuleParams(
        componentId,
        ReactLoadableComponent(componentId, async () => {
          const experiments = new Experiments();
          experimentsScopes.forEach(scope => experiments.load(scope));

          // TODO: Do this the react-loadable way
          const [{ default: Component }] = await Promise.all([
            import(`../poc/components/${filename}`),
            experiments.ready(),
          ]);

          return {
            default: withBM(
              componentId,
              experiments.all(),
              english,
              sentryClient,
            )(Component),
          };
        }),
      );
    });

    methods.forEach(filename => {
      const methodId = `${getModuleId()}.methods.${filename}`;

      ModuleRegistry.registerMethod(methodId, () =>
        require(`../poc/methods/${filename}`).default({
          get: () => this.state,
          set: (newState: any) => (this.state = newState),
        }),
      );
    });
  }

  init(moduleParams: IBMModuleParams) {
    if (customInit) {
      customInit(this, moduleParams, {
        get: () => this.state,
        set: (newState: any) => (this.state = newState),
      });
    }
  }
}

registerModule('{%PROJECT_NAME%}' as ModuleId, BMModule);
