export const loadTranslations = (imp: (language: string) => any) => async () => {
  const i18n = use('translation');
  const translations = await imp(i18n.language);
  i18n.addResourceBundle(i18n.language, 'translation', translations[i18n.language]);
};
