const path = require('path');
const fs = require('fs-extra');
const globby = require('globby');

const widgetWrapperPath = path.resolve(
  __dirname,
  '../framework/WidgetWrapper.js',
);

const generatedWidgetEntriesPath = path.resolve(__dirname, '../tmp/components');

// const buildEditorComponents = () => {};

const buildEditorPlatformEntries = () => {
  const userComponents = globby.sync(
    './src/example/components/*/Component.js',
    {
      absolute: true,
    },
  );

  const componentEntries = userComponents.reduce((acc, widgetAbsolutePath) => {
    const widgetName = path.basename(path.dirname(widgetAbsolutePath));
    const generatedWidgetEntryPath = path.join(
      generatedWidgetEntriesPath,
      `${widgetName}.js`,
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

  return { componentEntries };
};

module.exports = buildEditorPlatformEntries;
