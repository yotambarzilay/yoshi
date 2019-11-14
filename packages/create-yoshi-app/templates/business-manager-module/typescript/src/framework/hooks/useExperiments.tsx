import React, { useContext } from 'react';
import Experiments from '@wix/wix-experiments';
import { ExperimentsContext } from './ExperimentsProvider';

const useExperiments = (): Pick<Experiments, keyof Experiments> => {
  const experiments = useContext(ExperimentsContext) as Experiments;

  return {
    enabled: key => experiments.enabled(key),
    add: obj => experiments.add(obj),
    all: () => experiments.all(),
    conduct: (spec, fallback) => experiments.conduct(spec, fallback),
    get: key => experiments.get(key),
    load: scope => experiments.load(scope),
    pending: () => experiments.pending(),
    ready: () => experiments.ready(),
  };
};

export default useExperiments;
