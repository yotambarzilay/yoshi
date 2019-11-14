// tslint:disable-next-line:no-reference
/// <reference path="../external-types.d.ts" />

import path from 'path';

// const groupId = 'com.wixpress';
const artifactId = '{%projectName%}';

const generate = (pages: Array<string>) => {
  return pages.map(filePath => {
    const { name } = path.parse(filePath);

    const pageComponentId = `${artifactId}.pages.${name}`;

    const pagesDir = path.resolve('src/poc/pages');
    const relativePath = path.relative(pagesDir, filePath);

    const {
      config: { fedops = {} } = {},
    } = require(`../poc/pages/${relativePath}`);

    return {
      app_name: pageComponentId,
      ignore_first_request_roundtrip: true,
      ...fedops,
    };
  });
};

console.log(
  JSON.stringify(
    generate(['/Users/amitda/dev/{%projectName%}/src/poc/pages/index.tsx']),
    null,
    2,
  ),
);
