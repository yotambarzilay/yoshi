const path = require('path');
const fs = require('fs-extra');

const settingsWrapperPath =
  'yoshi-flow-editor-runtime/build/SettingsWrapper.js';

const settingsWrapper = (generatedWidgetEntriesPath, userSettings) => {
  return userSettings.reduce((acc, settingsAbsolutePath) => {
    const settingsName = path.basename(path.dirname(settingsAbsolutePath));
    const generatedWidgetEntryPath = path.join(
      generatedWidgetEntriesPath,
      `${settingsName}Settings.js`,
    );

    const generateSettingsEntryContent = `
    import React from 'react';
    import ReactDOM from 'react-dom';
    import SettingsWrapper from '${settingsWrapperPath}';
    import Settings from '${settingsAbsolutePath}';

    ReactDOM.render(<SettingsWrapper><Settings /></SettingsWrapper>, document.getElementById('root'));`;

    fs.outputFileSync(generatedWidgetEntryPath, generateSettingsEntryContent);

    if (settingsName === 'todo') {
      acc['settingsPanel'] = generatedWidgetEntryPath;
    }

    return acc;
  }, {});
};

module.exports = settingsWrapper;
