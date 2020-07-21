import app from '@micra/application';
import { en } from 'app/translation/languages/en';
import { fr } from 'app/translation/languages/fr';
import { DEFAULT_LANGUAGE, LANGUAGES } from './constants';

app.config.set('translation', {
  default: DEFAULT_LANGUAGE,
  languages: LANGUAGES,
  options: {
    fallbackLng: DEFAULT_LANGUAGE,
    whitelist: LANGUAGES,
    returnObjects: true,
    interpolation: {
      escapeValue: false,
    },
    detection: {
      order: ['path'],
    },
    resources: {
      en,
      fr,
    },
  },
});
