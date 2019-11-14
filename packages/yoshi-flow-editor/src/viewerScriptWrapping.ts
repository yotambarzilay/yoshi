import path from 'path';
import fs from 'fs-extra';
import { Dictionary } from './types';

const viewerScriptWrapperPath =
  'yoshi-flow-editor-runtime/build/viewerScript.js';

const viewerScriptWrapper = (
  generatedWidgetEntriesPath: string,
  userController: Array<string>,
  userInitApp: string,
) => {
  return userController.reduce(
    (acc: Dictionary<string>, userControllerAbsolutePath) => {
      const controllerName = path.basename(
        path.dirname(userControllerAbsolutePath),
      );
      const generatedWidgetEntryPath = path.join(
        generatedWidgetEntriesPath,
        `${controllerName}ViewerScript.js`,
      );

      const generateSettingsEntryContent = `
    import {createControllers as createControllersWrapper, initAppForPage as initAppForPageWrapper} from '${viewerScriptWrapperPath}';
    import userController from '${userControllerAbsolutePath}';
    import userInitApp from '${userInitApp}';

    export const initAppForPage = initAppForPageWrapper;
    export const createControllers = createControllersWrapper(userController, userInitApp);`;

      fs.outputFileSync(generatedWidgetEntryPath, generateSettingsEntryContent);

      if (controllerName === 'todo') {
        acc['viewerScript'] = generatedWidgetEntryPath;
      }
      return acc;
    },
    {},
  );
};

export default viewerScriptWrapper;
