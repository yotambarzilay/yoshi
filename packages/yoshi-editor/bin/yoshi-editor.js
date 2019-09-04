#!/usr/bin/env node

const prog = require('commander');
// const { version } = require('../package');
// const chalk = require('chalk');
// const { inTeamCity } = require('yoshi-helpers/queries');
const start = require('../src/commands/start');

// prog
//   .command('build')
//   .description('Building an app to production')
//   // .option('--analyze', 'Run webpack-bundle-analyzer plugin')
//   // .option('--stats', 'Generate dist/webpack-stats.json file')
//   // .option('--source-map', 'Explicitly emit bundle source maps')
//   .action(() => build());

prog
  .command('start')
  .description('Local development experience')
  // .option('--url', 'Opens the browser with the supplied URL')
  // .option('--server', 'The main file to start your server')
  .option('-e --entry-point', 'The main file to start your server')
  // .option('--production', 'Start using unminified production build')
  // .option('--ssl', 'Serve the app bundle on https')
  // .option('--https', 'Serve the app bundle on https')
  // .option('--debug', 'Allow app-server debugging')
  // .option(
  //   '--debug-brk',
  //   "Allow app-server debugging, process won't start until debugger will be attached",
  // )
  .action(() => start());

// prog
//   .command('lint [files...]')
//   .description('Run the linter')
//   // .option('--fix', 'Automatically fix lint problems')
//   // .option('--format', 'Use a specific formatter for eslint/tslint')
//   .action(() => runCLI('lint'));

// prog
//   .command('test')
//   .description('Run unit tests and e2e tests if exists')
//   // .option('--mocha', 'Run unit tests with Mocha')
//   // .option('--jasmine', 'Run unit tests with Jasmine')
//   // .option('--karma', 'Run unit tests with Karma')
//   // .option('--jest', 'Run tests with Jest')
//   // .option('--protractor', 'Run e2e tests with Protractor')
//   // .option('--debug', 'Allow test debugging')
//   // .option('--coverage', 'Collect and output code coverage')
//   // .option(
//   //   '--debug-brk',
//   //   "Allow test debugging, process won't start until debugger will be attached",
//   // )
//   .option(
//     '-w, --watch',
//     'Run tests on watch mode (mocha, jasmine, jest, karma)',
//   )
//   .allowUnknownOption()
//   .action(() => runCLI('test'));

// prog
//   .command('release')
//   .description(
//     'use wnpm-ci to bump a patch version if needed, should be used by CI',
//   )
//   // .option('--minor', 'bump a minor version instead of a patch')
//   .action(() => runCLI('release'));

prog.parse(process.argv);
