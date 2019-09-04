import React, { Suspense } from 'react';
import { getProcessedCss } from 'tpa-style-webpack-plugin/runtime';
import {
  IWixAPI,
  IHostProps,
} from '@wix/native-components-infra/dist/src/types/types';
import { createInstances } from './createInstances';
import { ControllerProvider } from './react/ControllerProvider';
import { PublicDataProviderEditor } from './react/PublicDataProviderEditor';
import { PublicDataProviderViewer } from './react/PublicDataProviderViewer';
import { ErrorBoundary } from './react/ErrorBoundary';

declare global {
  interface Window {
    Wix: undefined | IWixAPI;
  }
}

// TODO - improve this type or bring from controller wrapper
interface IFrameworkProps {
  __publicData__: any;
  experiments: any;
}

const PublicDataProvider: typeof React.Component =
  typeof window.Wix === 'undefined'
    ? PublicDataProviderViewer
    : PublicDataProviderEditor;

const WidgetWrapper = (UserComponent: typeof React.Component) => (
  props: IHostProps & IFrameworkProps,
) => {
  console.log(props.style);
  const css = getProcessedCss(props.style);
  console.log(css);

  return (
    <div>
      <link
        href="https://localhost:3200/viewerWidget.css"
        rel="stylesheet"
        type="text/css"
      />
      <style dangerouslySetInnerHTML={{ __html: css }} />
      <ErrorBoundary handleException={error => console.log(error)}>
        <Suspense fallback={<div>Loading...</div>}>
          <PublicDataProvider data={props.__publicData__} Wix={window.Wix}>
            <ControllerProvider data={props}>
              <UserComponent
                {...createInstances(props.experiments)}
                {...props}
              />
            </ControllerProvider>
          </PublicDataProvider>
        </Suspense>
      </ErrorBoundary>
    </div>
  );
};

export default WidgetWrapper;
