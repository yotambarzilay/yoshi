import React, { createContext, FC, useMemo } from 'react';
import i18next, { TranslationFunction } from 'i18next';
import {
  I18nextProvider,
  InjectedTranslateProps,
  translate,
} from 'react-i18next';
import useModuleParams from './useModuleParams';

const i18n = (locale: string, translation: Record<string, string>) => {
  return i18next.init({
    lng: locale,
    fallbackLng: 'en',
    keySeparator: '$',
    interpolation: {
      escapeValue: false,
    },
    resources: {
      [locale]: {
        translation,
      },
    },
  });
};

export const TranslationContext = createContext<TranslationFunction>(x => x);

const Adapter = translate()<InjectedTranslateProps>(({ t, children }) => (
  <TranslationContext.Provider value={t}>
    {children}
  </TranslationContext.Provider>
));

export interface TranslationProviderProps {
  translations: Record<string, string>;
}

const TranslationProvider: FC<TranslationProviderProps> = ({
  children,
  translations,
}) => {
  const { locale } = useModuleParams();

  const i18nConfig = useMemo(() => i18n(locale, translations), [locale]);

  return (
    <I18nextProvider i18n={i18nConfig}>
      <Adapter>{children}</Adapter>
    </I18nextProvider>
  );
};

export default TranslationProvider;
