const path = require('path');
const globby = require('globby');
const componentWrapping = require('./componentWrapping');
const editorAppWrapping = require('./editorAppWrapping');
const settingsWrapping = require('./settingsWrapping');
const wixPrivateMockWrapping = require('./wixPrivateMockWrapping');
const viewerScriptWrapping = require('./viewerScriptWrapping');

const generatedWidgetEntriesPath = path.resolve(__dirname, '../tmp/components');

const buildEditorPlatformEntries = () => {
  const userComponents = globby.sync('./src/example/**/Component.js', {
    absolute: true,
  });

  const componentEntries = componentWrapping(
    generatedWidgetEntriesPath,
    userComponents,
  );

  const userController = globby.sync('./src/example/**/controller.js', {
    absolute: true,
  });
  const userInitApp = globby.sync('./src/example/**/initApp.js', {
    absolute: true,
  });

  const editorAppEntries = editorAppWrapping(
    generatedWidgetEntriesPath,
    userComponents,
    userController,
    userInitApp,
  );

  const userSettings = globby.sync('./src/example/**/Settings.js', {
    absolute: true,
  });

  const settingsEntries = settingsWrapping(
    generatedWidgetEntriesPath,
    userSettings,
  );
  const wixPrivateMockEntry = wixPrivateMockWrapping();

  return {
    ...wixPrivateMockEntry,
    ...componentEntries,
    ...editorAppEntries,
    ...settingsEntries,
  };
};

const buildViewerScriptEntry = () => {
  const userController = globby.sync('./src/example/**/controller.js', {
    absolute: true,
  });
  const userInitApp = globby.sync('./src/example/**/initApp.js', {
    absolute: true,
  });

  return viewerScriptWrapping(
    generatedWidgetEntriesPath,
    userController,
    userInitApp,
  );
};

const webWorkerExternals = {
  lodash: {
    commonjs: 'lodash',
    amd: 'lodash',
    root: '_',
  },
};

module.exports = {
  buildEditorPlatformEntries,
  buildViewerScriptEntry,
  webWorkerExternals,
};
