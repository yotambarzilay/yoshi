import path from 'path';
import config from '../poc/config.json';

const groupId = 'com.wixpress';
const artifactId = '{%projectName%}';

const generate = (pages: Array<string>) => {
  const pageComponents = pages.map(filePath => {
    const { name } = path.parse(filePath);

    const pageComponentId = `${artifactId}.pages.${name}`;
    const pagesDir = path.resolve('src/poc/pages');
    const relativePath = path.relative(pagesDir, filePath);

    const route = path.join(
      config.routeNamespace,
      ...relativePath.split(path.delimiter).slice(0, -1),
      name !== 'index' ? name : '',
    );

    return {
      pageComponentId,
      pageComponentName: pageComponentId,
      route,
    };
  });

  return {
    moduleId: artifactId,
    mainPageComponentId: pageComponents.reduce((prev, { route, ...rest }) =>
      route.split(path.delimiter).length >
      prev.route.split(path.delimiter).length
        ? prev
        : { ...rest, route },
    ).pageComponentId,
    pageComponents,

    config: {
      topology: {
        staticsUrl: "<%= static_url('com.wixpress.{%projectName%}') %>",
        ...(config.topology || {}),
      },
      ...(config.config || {}),
    },
    bundles: [
      {
        file: `<%= static_url('${groupId}.${artifactId}') %>module.bundle.min.js`,
        debugFile: `<%= static_url('${groupId}.${artifactId}') %>module.bundle.js`,
      },
    ],
  };
};

console.log(
  JSON.stringify(
    generate(['/Users/amitda/dev/{%projectName%}/src/poc/pages/index.tsx']),
    null,
    2,
  ),
);
