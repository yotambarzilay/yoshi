import React, { createContext, FC, useMemo } from 'react';
import { create, FedopsLogger } from '@wix/fedops-logger';

export const FedopsContext = createContext<FedopsLogger | null>(null);

export interface FedopsProviderProps {
  appName: string;
}

const FedopsProvider: FC<FedopsProviderProps> = ({ appName, children }) => {
  const client = useMemo(() => create(appName), [appName]);
  return (
    <FedopsContext.Provider value={client}>{children}</FedopsContext.Provider>
  );
};

export default FedopsProvider;
