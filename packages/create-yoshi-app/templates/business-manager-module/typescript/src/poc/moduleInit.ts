import { BusinessManagerModule } from '@wix/business-manager-api';
import { IBMModuleParams } from '../framework/hooks/ModuleProvider';

export default (
  module: BusinessManagerModule,
  moduleParams: IBMModuleParams,
  { set }: any,
) => {
  console.log('🤖 MODULE INITIALIZING 🤖');
  console.log('Module Params:', moduleParams);

  set({
    todos: [
      { id: '0', text: 'Go to work', done: true },
      { id: '1', text: 'Go home' },
      { id: '2', text: 'Sleep' },
    ],
  });

  // module.registerPageComponent(...);
};
