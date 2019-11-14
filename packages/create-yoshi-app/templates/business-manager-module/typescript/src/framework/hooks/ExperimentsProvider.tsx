import React, { createContext, FC } from 'react';
import {
  ExperimentsProvider as WixExperimentsProvider,
  ExperimentsProviderProps,
  InjectedExperimentsProps,
  withExperiments,
} from '@wix/wix-experiments-react';
import Experiments from '@wix/wix-experiments';

export const ExperimentsContext = createContext<Experiments | null>(null);

const Adapter = withExperiments<InjectedExperimentsProps>(
  ({ experiments, children }) => (
    <ExperimentsContext.Provider value={experiments}>
      {children}
    </ExperimentsContext.Provider>
  ),
);

const ExperimentsProvider: FC<ExperimentsProviderProps> = ({
  children,
  ...props
}) => {
  return (
    <WixExperimentsProvider {...props}>
      <Adapter>{children}</Adapter>
    </WixExperimentsProvider>
  );
};

export default ExperimentsProvider;
