import app from '@micra/application';
import { en } from 'app/translation/languages/en';
import { fr } from 'app/translation/languages/fr';

app.config.set('translation', {
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
