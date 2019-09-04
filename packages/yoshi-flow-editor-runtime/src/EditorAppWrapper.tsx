import React from 'react';
import { ViewerScriptWrapper } from '@wix/native-components-infra';
import WidgetWrapper from './WidgetWrapper';
import { createControllers, initAppForPage } from './viewerScript.js';

const EditorAppWrapper = (
  UserComponent: typeof React.Component,
  userController: Function,
  initApp: Function,
) =>
  ViewerScriptWrapper(WidgetWrapper(UserComponent), {
    viewerScript: {
      createControllers: createControllers(userController, initApp),
      initAppForPage,
    },
    Wix: window.Wix,
    widgetConfig: {
      widgetId: '',
    },
  });

export default EditorAppWrapper;
