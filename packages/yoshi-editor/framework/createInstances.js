import Experiments from '@wix/wix-experiments';

// accpets platform data and return instances of each class
function createInstances({ experiments }) {
  return {
    experiments: new Experiments({ experiments }),
  };
}

export default createInstances;
