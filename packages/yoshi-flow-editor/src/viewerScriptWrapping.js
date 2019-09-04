const path = require('path');
const fs = require('fs-extra');

const viewerScriptWrapperPath =
  'yoshi-flow-editor-runtime/build/viewerScript.js';

const viewerScriptWrapper = (
  generatedWidgetEntriesPath,
  userController,
  userInitApp,
) => {
  return userController.reduce((acc, userControllerAbsolutePath) => {
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
  }, {});
};

module.exports = viewerScriptWrapper;
