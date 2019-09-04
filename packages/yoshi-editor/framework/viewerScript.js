// import fetchFrameworkData from './fetchFrameworkData';
// import { createController } from '../example/widgets/todo/controller';
// import initApp from '../example/initApp';
// import createInstances from './createInstances';
// import { objectPromiseAll } from './utils';

// let frameworkData;

// export const createControllers = controllerConfigs => {
//   const [controllerConfig] = controllerConfigs;
//   const { appParams, platformAPIs, wixCodeApi, csrfToken } = controllerConfig;

//   const appData = initApp({
//     controllerConfigs,
//     frameworkData,
//     appParams,
//     platformAPIs,
//     wixCodeApi,
//     csrfToken,
//   });

//   const userControllerPromise = createController({
//     controllerConfig,
//     frameworkData,
//     appData,
//   });

//   const { setProps } = controllerConfig;

//   const wrappedControllerPromise = userControllerPromise.then(
//     userController => ({
//       ...userController,
//       pageReady: async (...args) => {
//         const awaitedFrameworkData = await objectPromiseAll(frameworkData);
//         setProps(awaitedFrameworkData);
//         return userController.pageReady(setProps, ...args);
//       },
//     }),
//   );

//   return [wrappedControllerPromise];
// };

// export const initAppForPage = async (
//   initParams,
//   platformApis,
//   scopedSdkApis,
//   platformServicesApis,
// ) => {
//   frameworkData = fetchFrameworkData();

//   // TODO: Generalize
//   frameworkData.experimentsPromise = frameworkData.experimentsPromise.then(
//     experiments => createInstances({ experiments }).experiments,
//   );
// };
