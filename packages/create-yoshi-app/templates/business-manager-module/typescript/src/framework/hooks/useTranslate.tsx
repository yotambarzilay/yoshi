import React, { useContext } from 'react';
import { TranslationContext } from './TranslationProvider';

const useTranslate = () => useContext(TranslationContext);

export default useTranslate;
