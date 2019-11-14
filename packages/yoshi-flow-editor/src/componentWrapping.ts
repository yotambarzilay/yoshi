import path from 'path';
import fs from 'fs-extra';
import { Dictionary } from './types';

const widgetWrapperPath = 'yoshi-flow-editor-runtime/build/WidgetWrapper.js';

const componentWrapper = (
  generatedWidgetEntriesPath: string,
  userComponents: Array<string>,
) => {
  return userComponents.reduce(
    (acc: Dictionary<string>, widgetAbsolutePath: string) => {
      const widgetName = path.basename(path.dirname(widgetAbsolutePath));
      const generatedWidgetEntryPath = path.join(
        generatedWidgetEntriesPath,
        `${widgetName}Component.js`,
      );

      const generateWidgetEntryContent = `
    import WidgetWrapper from '${widgetWrapperPath}';
    import Widget from '${widgetAbsolutePath}';

    export default { component: WidgetWrapper(Widget)};`;

      fs.outputFileSync(generatedWidgetEntryPath, generateWidgetEntryContent);

      if (widgetName === 'todo') {
        acc['viewerWidget'] = generatedWidgetEntryPath;
      }

      acc[widgetName] = generatedWidgetEntryPath;

      return acc;
    },
    {},
  );
};

export default componentWrapper;
