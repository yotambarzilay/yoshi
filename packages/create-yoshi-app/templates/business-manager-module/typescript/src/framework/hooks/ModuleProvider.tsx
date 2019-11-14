import React, { createContext, FC } from 'react';
import { TModuleParams } from '@wix/business-manager-api';

export const ModuleContext = createContext<IBMModuleParams | null>(null);

export type IERBConfig<C, T> = {
  topology: {
    staticsUrl: string;
  } & T;
} & C;

export interface IBMModuleParams<
  C = Record<string, any>,
  T = Record<string, any>
> extends TModuleParams {
  config: IERBConfig<C, T>;
}

export interface ModuleProviderProps {
  moduleParams: IBMModuleParams;
}

const ModuleProvider: FC<ModuleProviderProps> = ({
  moduleParams,
  children,
}) => {
  return (
    <ModuleContext.Provider value={moduleParams}>
      {children}
    </ModuleContext.Provider>
  );
};

export default ModuleProvider;
