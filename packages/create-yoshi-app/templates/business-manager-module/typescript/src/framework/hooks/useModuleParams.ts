import { useContext } from 'react';
import { IBMModuleParams, ModuleContext } from './ModuleProvider';

const useModuleParams = () => useContext(ModuleContext) as IBMModuleParams;

export default useModuleParams;
