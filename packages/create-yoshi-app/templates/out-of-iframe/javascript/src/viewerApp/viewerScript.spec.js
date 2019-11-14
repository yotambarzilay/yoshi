import 'isomorphic-fetch';
import createController from '../example/components/todo/controller';
import { EXPERIMENTS_SCOPE } from '../config/constants';
import { mockExperiments } from '../components/Widget/appController.spec';

describe('createControllers', () => {
  let widgetConfig;
  beforeEach(() => {
    widgetConfig = {
      appParams: {
        baseUrls: {
          staticsBaseUrl: 'http://localhost:3200/',
        },
      },
      wixCodeApi: {
        window: {
          multilingual: {
            isEnabled: false,
          },
        },
        site: {
          language: 'en',
        },
      },
    };
  });

  it('should return controllers with pageReady method given widgets config', async () => {
    const experiments = { someExperiment: 'true' };
    mockExperiments(EXPERIMENTS_SCOPE, experiments);

    const result = createController.call(
      { state: undefined },
      {
        frameworkData: {
          experimentsPromise: () => Promise.resolve(experiments),
        },
      },
      widgetConfig,
    );
    expect(result).resolves.toHaveProperty('methods');
    expect(result).resolves.toHaveProperty('exports');
  });
});
