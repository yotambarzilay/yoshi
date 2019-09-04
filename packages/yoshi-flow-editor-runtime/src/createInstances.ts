import Experiments from '@wix/wix-experiments';

// accpets platform data and return instances of each class
export function createInstances({
  experiments,
}: {
  experiments: Record<string, any>;
}) {
  return {
    experiments: new Experiments({ experiments }),
  };
}
