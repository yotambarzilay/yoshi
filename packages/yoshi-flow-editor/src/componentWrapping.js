const path = require('path');
const fs = require('fs-extra');

const widgetWrapperPath = 'yoshi-flow-editor-runtime/build/WidgetWrapper.js';

const componentWrapper = (generatedWidgetEntriesPath, userComponents) => {
  return userComponents.reduce((acc, widgetAbsolutePath) => {
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
  }, {});
};

module.exports = componentWrapper;
