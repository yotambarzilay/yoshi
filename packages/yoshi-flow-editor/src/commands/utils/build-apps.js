const bfj = require('bfj');
const path = require('path');
const fs = require('fs-extra');
const { inTeamCity: checkInTeamCity } = require('yoshi-helpers/queries');
const { copyTemplates } = require('yoshi/src/commands/utils/copy-assets');
const writeManifest = require('yoshi/src/commands/utils/write-manifest');
const {
  createClientWebpackConfig,
  createServerWebpackConfig,
  createWebWorkerWebpackConfig,
} = require('yoshi/src/commands/utils/../../../config/webpack.config');
const wixDepCheck = require('yoshi/src/commands/utils/../../tasks/dep-check');
const WebpackManager = require('yoshi/src/commands/utils/../../webpack-manager');

const inTeamCity = checkInTeamCity();

module.exports = async function buildApps(apps, options) {
  // Clean tmp folders
  await Promise.all(
    apps.reduce((acc, app) => {
      return [...acc, fs.emptyDir(app.BUILD_DIR), fs.emptyDir(app.TARGET_DIR)];
    }, []),
  );

  // Copy public to statics dir
  Promise.all(
    apps.map(async app => {
      if (await fs.pathExists(app.PUBLIC_DIR)) {
        await fs.copy(app.PUBLIC_DIR, app.ASSETS_DIR);
      }
    }),
  );

  Promise.all(
    apps.map(async app => {
      await Promise.all([
        wixDepCheck({ cwd: app.ROOT_DIR }),
        copyTemplates(app),
      ]);
    }),
  );

  // Run CI related updates
  if (inTeamCity) {
    const petriSpecs = require('yoshi/src/commands/utils/../../tasks/petri-specs');
    const wixMavenStatics = require('yoshi/src/commands/utils/../../tasks/maven-statics');

    await Promise.all(
      apps.reduce((acc, app) => {
        return [
          ...acc,
          petriSpecs({ config: app.petriSpecsConfig }),
          wixMavenStatics({
            clientProjectName: app.clientProjectName,
            staticsDir: app.clientFilesPath,
          }),
        ];
      }, []),
    );
  }

  // Build apps
  const webpackManager = new WebpackManager();

  const {
    buildEditorPlatformEntries,
    buildViewerScriptEntry,
  } = require('../../buildEditorEntires');

  const editorEntries = buildEditorPlatformEntries();

  const customEntry = {
    editorApp: './editorApp/editorApp.js',
    ...editorEntries,
    'wix-private-mock': '../dev/wix-private.mock.js',
  };

  apps.forEach(app => {
    const clientDebugConfig = createClientWebpackConfig({
      app,
      isDebug: true,
      isAnalyze: false,
      isHmr: false,
      withLocalSourceMaps: options['source-map'],
      customEntry,
    });

    const clientOptimizedConfig = createClientWebpackConfig({
      app,
      isDebug: false,
      isAnalyze: options.analyze,
      isHmr: false,
      withLocalSourceMaps: options['source-map'],
      customEntry,
    });

    const serverConfig = createServerWebpackConfig({
      app,
      isDebug: true,
    });

    const webWorkerCustomEntry = buildViewerScriptEntry();

    const webWorkerConfig = createWebWorkerWebpackConfig({
      customEntry: webWorkerCustomEntry,
      isDebug: true,
    });

    const webWorkerOptimizeConfig = createWebWorkerWebpackConfig({
      customEntry: webWorkerCustomEntry,
      isDebug: false,
    });

    webpackManager.addConfigs(
      app,
      [
        clientDebugConfig,
        clientOptimizedConfig,
        serverConfig,
        webWorkerConfig,
        webWorkerOptimizeConfig,
      ].filter(Boolean),
    );
  });

  const { getAppData } = await webpackManager.run();

  // Generate `manifest.[version].json` from optimized webpack bundle
  if (inTeamCity) {
    await Promise.all(
      apps.map(async app => {
        const { configs, stats } = getAppData(app);
        const [, clientOptimizedConfig] = configs;
        const [, clientOptimizedStats] = stats;

        await writeManifest(clientOptimizedConfig, clientOptimizedStats, app);
      }),
    );
  }

  // Write a Webpack stats file
  if (options.stats) {
    await Promise.all(
      apps.map(async app => {
        const { stats } = getAppData(app);
        const [, clientOptimizedStats] = stats;

        await fs.ensureDir(path.dirname(app.STATS_FILE));
        await bfj.write(app.STATS_FILE, clientOptimizedStats.toJson());
      }),
    );
  }

  return {
    getAppData,
  };
};
