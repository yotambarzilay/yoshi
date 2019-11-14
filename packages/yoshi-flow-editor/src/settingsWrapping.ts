import path from 'path';
import fs from 'fs-extra';
import { Dictionary } from './types';

const settingsWrapperPath =
  'yoshi-flow-editor-runtime/build/SettingsWrapper.js';

const settingsWrapper = (
  generatedWidgetEntriesPath: string,
  userSettings: Array<string>,
) => {
  return userSettings.reduce(
    (acc: Dictionary<string>, settingsAbsolutePath: string) => {
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
    },
    {},
  );
};

export default settingsWrapper;
