// Module will be created in compile time, moduleId will be return from package.json name property

import { ModuleId } from '@wix/business-manager-api';

export const getModuleId = () => '{%projectName%}' as ModuleId;
