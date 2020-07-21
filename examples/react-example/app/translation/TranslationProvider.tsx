import React, { memo } from "react";
import { I18nextProvider } from "react-i18next";

export interface TranslationProviderProps {
  children?: React.ReactChild;
}

const TranslationProvider = ({ children }: TranslationProviderProps) => {
  return (
    <I18nextProvider i18n={use("translation")}>{children}</I18nextProvider>
  );
};

export default memo(TranslationProvider);
