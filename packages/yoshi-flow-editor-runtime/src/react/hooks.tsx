import { useContext } from 'react';
import { PublicDataContext } from './PublicDataContext';
import { ControllerContext } from './ControllerContext';

export function usePublicData() {
  const publicDataContext = useContext(PublicDataContext);

  if (!publicDataContext.ready && publicDataContext.readyPromise) {
    throw publicDataContext.readyPromise;
  }

  return publicDataContext;
}

export function useController() {
  return useContext(ControllerContext);
}
