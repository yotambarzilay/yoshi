import { createInstances, objectPromiseAll, fetchFrameworkData } from './utils';

let frameworkData: any;

export const createControllers = (
  createController: Function,
  initApp: Function,
) => (controllerConfigs: any) => {
  const [controllerConfig] = controllerConfigs;
  const { appParams, platformAPIs, wixCodeApi, csrfToken } = controllerConfig;

  initializeExperiments();

  const appData = initApp({
    controllerConfigs,
    frameworkData,
    appParams,
    platformAPIs,
    wixCodeApi,
    csrfToken,
  });

  const { setProps } = controllerConfig;

  const setState = (newState: any) => {
    const updatedState = {
      ...context.state,
      ...newState,
    };

    // Track state
    context.state = updatedState;

    // Run state change callback
    wrappedControllerPromise.then((userController: any) => {
      userController.stateChange();
    });

    // Update render cycle
    return setProps(updatedState);
  };

  const context = {
    state: {},
    setState,
  };

  const userControllerPromise = createController.call(context, {
    controllerConfig,
    frameworkData,
    appData,
  });

  const wrappedControllerPromise = userControllerPromise.then(
    (userController: any) => {
      return {
        ...userController,
        pageReady: async (...args: Array<any>) => {
          const awaitedFrameworkData = await objectPromiseAll(frameworkData);
          setProps({
            __publicData__: controllerConfig.config.publicData,
            ...awaitedFrameworkData,
            // Set initial state
            ...context.state,
            // Set methods
            ...userController.methods,
          });

          // Optional `pageReady`
          if (userController.pageReady) {
            return userController.pageReady(setProps, ...args);
          }
        },
      };
    },
  );

  return [wrappedControllerPromise];
};

const initializeExperiments = () => {
  frameworkData = fetchFrameworkData();

  // TODO: Generalize
  frameworkData.experimentsPromise = frameworkData.experimentsPromise.then(
    (experiments: any) => createInstances({ experiments }).experiments,
  );
};

export const initAppForPage = async () =>
  // initParams,
  // platformApis,
  // scopedSdkApis,
  // platformServicesApis,
  {};
