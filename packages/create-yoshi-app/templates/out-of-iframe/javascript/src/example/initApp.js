export default async ({ platformParams, controllerConfigs, frameworkData }) => {
  console.log('InitApp');
  console.log({ platformParams, controllerConfigs, frameworkData });

  return { foo: 'bar' };
};
