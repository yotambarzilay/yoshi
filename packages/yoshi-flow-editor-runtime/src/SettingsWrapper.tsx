import React, { Suspense } from 'react';
import { IWixAPI } from '@wix/native-components-infra/dist/src/types/types';
import { PublicDataProviderEditor } from './react/PublicDataProviderEditor';
import { PublicDataProviderViewer } from './react/PublicDataProviderViewer';
import { ErrorBoundary } from './react/ErrorBoundary';

declare global {
  interface Window {
    Wix: undefined | IWixAPI;
  }
}

const PublicDataProvider: typeof React.Component =
  typeof window.Wix === 'undefined'
    ? PublicDataProviderViewer
    : PublicDataProviderEditor;

interface SettingsWrapperProps {
  children?: React.Component;
}

const SettingsWrapper: React.FunctionComponent<
  SettingsWrapperProps
> = props => {
  return (
    <ErrorBoundary handleException={error => console.log(error)}>
      <PublicDataProvider Wix={window.Wix}>
        <Suspense fallback={<div>Loading...</div>}>{props.children}</Suspense>
      </PublicDataProvider>
    </ErrorBoundary>
  );
};

export default SettingsWrapper;
