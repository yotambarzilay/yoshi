import { useContext } from 'react';
import { FedopsLogger } from '@wix/fedops-logger';
import { FedopsContext } from './FedopsProvider';

const useFedops = () => useContext(FedopsContext) as FedopsLogger;

export default useFedops;
