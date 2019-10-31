import path from 'path';
import fs from 'fs';
import globby from 'globby';
import config from 'yoshi-config';
import * as globs from 'yoshi-config/globs';
import getGitConfig from 'parse-git-config';
import { defaultEntry, WIX_EMAIL_PATTERN } from './constants';

export const exists = (
  patterns: string | ReadonlyArray<string>,
  options?: globby.GlobbyOptions,
) => {
  return globby.sync(patterns, options).length > 0;
};

export const isSingleEntry = (entry: any) =>
  typeof entry === 'string' || Array.isArray(entry);

export const watchMode = () => {
  return !!process.env.WIX_NODE_BUILD_WATCH_MODE;
};

export const inTeamCity = () => {
  return process.env.BUILD_NUMBER || process.env.TEAMCITY_VERSION;
};

export const inPRTeamCity = () => {
  return inTeamCity() && process.env.agentType === 'pullrequest';
};

export const isProduction = () =>
  (process.env.NODE_ENV || '').toLowerCase() === 'production';

export const shouldRunWebpack = (webpackConfig: any): boolean => {
  const defaultEntryPath = path.join(webpackConfig.context, defaultEntry);
  return (config.entry ||
    exists(`${defaultEntryPath}.{js,jsx,ts,tsx}`)) as boolean;
};

export const shouldRunSass = () => {
  return (
    globby.sync(globs.scss).filter(file => path.basename(file)[0] !== '_')
      .length > 0
  );
};

export const isTypescriptProject = () =>
  fs.existsSync(path.resolve('tsconfig.json'));

export const isUsingTSLint = () => exists('tslint.*');

export const shouldExportModule = () => {
  return !!config.pkgJson.module;
};

export const shouldRunLess = () => {
  return exists(globs.less);
};

export const hasE2ETests = (cwd = process.cwd()) => {
  return exists(globs.e2eTests, { gitignore: true, cwd });
};

export const hasProtractorConfigFile = () => {
  return exists(path.resolve('protractor.conf.js'));
};

export const hasBundleInStaticsDir = (cwd = process.cwd()) => {
  return (
    globby.sync(path.resolve(globs.statics, '*.bundle.js'), { cwd }).length > 0
  );
};

export const shouldDeployToCDN = (app: any) => {
  return (
    inTeamCity() &&
    (process.env.ARTIFACT_VERSION || process.env.BUILD_VCS_NUMBER) &&
    fs.existsSync(app.POM_FILE)
  );
};

export const isWebWorkerBundle = !!config.webWorkerEntry;

export const guessSuricateTunnelId = (namespace: string) => {
  const gitConfig = getGitConfig.sync({ include: true, type: 'global' });
  const gitEmail = gitConfig.user ? gitConfig.user.email : '';
  const processUser = process.env.USER;
  let uniqueTunnelId;
  if (gitEmail.endsWith(WIX_EMAIL_PATTERN)) {
    uniqueTunnelId = gitEmail.replace(WIX_EMAIL_PATTERN, '');
  } else if (processUser) {
    uniqueTunnelId = processUser;
  } else if (process.env.SURICATE_TUNNEL_ID) {
    uniqueTunnelId = process.env.SURICATE_TUNNEL_ID;
  } else {
    return undefined;
  }

  const normalizedNamespace = namespace.replace('/', '-');

  return `${uniqueTunnelId}.${normalizedNamespace}`;
};
