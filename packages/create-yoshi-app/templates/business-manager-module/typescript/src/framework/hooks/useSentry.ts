import { BrowserClient } from '@sentry/browser';
import { useContext } from 'react';
import { SentryContext } from './SentryProvider';

const useSentry = () => useContext(SentryContext) as BrowserClient;

export default useSentry;
