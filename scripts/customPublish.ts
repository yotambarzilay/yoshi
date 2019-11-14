import { execSync } from 'child_process';
import execa from 'execa';
import chalk from 'chalk';
import semver from 'semver';
import memoize from 'lodash/memoize';
import get from 'lodash/get';
import { PackageJson } from 'type-fest';
// @ts-ignore
import { getPackages } from '@lerna/project';
import { Package } from '../packages/yoshi-flow-monorepo/src/load-package-graph';

const DEFAULT_REGISTRY = 'https://registry.npmjs.org/';
const LATEST_TAG = 'latest';
const NEXT_TAG = 'next';
const OLD_TAG = 'old';

const getPackageDetails = memoize(pkg => {
  try {
    return JSON.parse(
      execa.sync(`npm show ${pkg.name} --registry=${pkg.registry} --json`)
        .stdout,
    );
  } catch (error) {
    if (error.stderr.toString().includes('npm ERR! code E404')) {
      console.error(
        chalk.red(
          '\nError: package not found. Possibly not published yet, please verify that this package is published to npm.\n\nExit with status 1',
        ),
      );

      // This script will not publish new packages to npm
      process.exit(0);
    }

    throw error;
  }
});

function getPublishedVersions(pkg: PackageJson) {
  return getPackageDetails(pkg).versions || [];
}

function getLatestVersion(pkg: PackageJson) {
  return get(getPackageDetails(pkg), 'dist-tags.latest');
}

function shouldPublishPackage(pkg: PackageJson) {
  const remoteVersionsList = getPublishedVersions(pkg);

  return !remoteVersionsList.includes(pkg.version);
}

function getTag(pkg: PackageJson) {
  const isLessThanLatest = () => semver.lt(pkg.version!, getLatestVersion(pkg));
  const isPreRelease = () => semver.prerelease(pkg.version!) !== null;

  // if the version is less than the version tagged as latest in the registry
  if (isLessThanLatest()) {
    return OLD_TAG;
  }

  // if it's a prerelease use the next tag
  if (isPreRelease()) {
    return NEXT_TAG;
  }

  return LATEST_TAG;
}

function publish(pkg: PackageJson) {
  const publishCommand = `npm publish ${pkg.pkgPath} --tag=${getTag(
    pkg,
  )} --registry=${pkg.registry}`;

  console.log(`Running: "${publishCommand}" for ${pkg.name}@${pkg.version}`);

  execSync(publishCommand, { stdio: 'inherit' });
}

function release(pkg: PackageJson) {
  if (pkg.private) {
    console.log(`> ${pkg.name}(private) - skip publish`);
    return;
  }

  if (!shouldPublishPackage(pkg)) {
    console.log(
      `> ${pkg.name}@${pkg.version} - skip publish (version exist on registry ${pkg.registry})`,
    );

    return;
  }

  publish(pkg);
  console.log(
    `> ${pkg.name}@${pkg.version} - published successfully to ${pkg.registry}`,
  );
}

const packagesList = getPackages(process.cwd());

packagesList.forEach((pkg: Package) => {
  // 1. Read package.json
  // 2. If the package is private, skip publish
  // 3. If the package already exist on the registry, skip publish.
  // 4. choose a dist-tag ->
  //    * `old` for a release that is less than latest (semver).
  //    * `next` for a prerelease (beta/alpha/rc).
  //    * `latest` as default.
  // 5. perform npm publish using the chosen tag.

  release({
    private: pkg.private,
    name: pkg.name,
    version: pkg.version,
    registry: get(pkg.toJSON(), 'publishConfig.registry', DEFAULT_REGISTRY),
    pkgPath: pkg.location,
  });
});
