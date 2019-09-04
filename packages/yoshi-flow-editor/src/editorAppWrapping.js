const path = require('path');
const fs = require('fs-extra');

const editorAppWrapperPath =
  'yoshi-flow-editor-runtime/build/EditorAppWrapper.js';

const componentWrapper = (
  generatedWidgetEntriesPath,
  userComponents,
  userController,
  userInitApp,
) => {
  return userComponents.reduce((acc, widgetAbsolutePath) => {
    const widgetName = path.basename(path.dirname(widgetAbsolutePath));
    const generatedWidgetEntryPath = path.join(
      generatedWidgetEntriesPath,
      `${widgetName}EditorApp.js`,
    );

    const generateWidgetEntryContent = `
    import React from 'react';
    import ReactDOM from 'react-dom';
    import EditorAppWrapper from '${editorAppWrapperPath}';

    import Component from '${widgetAbsolutePath}';
    import createController from '${userController}';
    import initApp from '${userInitApp}';

    const EditorApp = EditorAppWrapper(Component, createController, initApp);

    ReactDOM.render(<EditorApp />, document.getElementById('root'));`;

    fs.outputFileSync(generatedWidgetEntryPath, generateWidgetEntryContent);

    if (widgetName === 'todo') {
      acc['editorApp'] = generatedWidgetEntryPath;
    }

    return acc;
  }, {});
};

module.exports = componentWrapper;
