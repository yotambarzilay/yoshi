import axios from 'axios';
import React, { ComponentType, FC, useEffect, useMemo } from 'react';
import {
  notifyViewFinishedLoading,
  notifyViewStartLoading,
} from '@wix/business-manager-api';
import { wixAxiosConfig } from '@wix/wix-axios-config';
import TranslationProvider from './hooks/TranslationProvider';
import ExperimentsProvider from './hooks/ExperimentsProvider';
import useOnce from './hooks/useOnce';
import ModuleProvider, { IBMModuleParams } from './hooks/ModuleProvider';
import { ExperimentsBag } from '@wix/wix-experiments';
import SentryProvider from './hooks/SentryProvider';
import FedopsProvider from './hooks/FedopsProvider';
import { BrowserClient } from '@sentry/browser';

wixAxiosConfig(axios, {
  baseURL: '/',
});

const withBM = (
  componentId: string,
  experiments: ExperimentsBag,
  translations: Record<string, string>,
  sentryClient: BrowserClient,
) => (Component: ComponentType) => {
  const Wrapped: FC<IBMModuleParams> = ({ children, ...props }) => {
    useOnce(() => {
      notifyViewStartLoading(componentId);
    });

    const experimentsOptions = useMemo(() => ({ experiments }), [experiments]);

    return (
      <ModuleProvider moduleParams={props}>
        <TranslationProvider translations={translations}>
          <ExperimentsProvider options={experimentsOptions}>
            <SentryProvider client={sentryClient}>
              <FedopsProvider appName={componentId}>
                <Component />
              </FedopsProvider>
            </SentryProvider>
          </ExperimentsProvider>
        </TranslationProvider>
      </ModuleProvider>
    );
  };

  return Wrapped;
};

export default withBM;
