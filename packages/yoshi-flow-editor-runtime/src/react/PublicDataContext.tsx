import React from 'react';

export interface IPublicDataContext {
  ready: boolean;
  readyPromise: Promise<boolean> | null;
  set: ((key: string, value: any) => void) | null;
  // It actually returns PublicData | boolean | null | Promise<boolean>
  // We just don't have the PublicData type yet
  get: ((key: string) => any) | null;
  type: PublicDataType | null;
}

export enum PublicDataType {
  ViewerPublicData,
  EditorPublicData,
}

export const PublicDataContext = React.createContext<IPublicDataContext>({
  ready: false,
  readyPromise: null,
  set: null,
  get: null,
  type: null,
});
