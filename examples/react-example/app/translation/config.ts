import app from '@micra/application';
import { InitOptions } from 'i18next';
import { en } from 'app/translation/languages/en';
import { fr } from 'app/translation/languages/fr';
import { TranslationConfig } from 'app/translation/types';

app.config.set<TranslationConfig<InitOptions>>('translation', {
  default: 'en',

  languages: ['en', 'fr'],

  options: {
    fallbackLng: 'en',
    whitelist: ['en', 'fr'],
    returnObjects: true,
    interpolation: {
      escapeValue: false,
    },
    detection: {
      order: ['path'],
    },
    // TODO: async loading of the resources
    resources: {
      en,
      fr,
    },
  },
});
