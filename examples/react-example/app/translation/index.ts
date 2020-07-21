import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import { ServiceProvider } from '@micra/service-provider';
import languageDetection from 'i18next-browser-languagedetector';

export class TranslationServiceProvider extends ServiceProvider {
  register() {
    this.container.value('translation', i18n);
  }

  boot() {
    const config = this.container.use('config').get('translation');
    const translation = this.container.use<typeof i18n>('translation');

    translation
      .use(initReactI18next)
      .use(languageDetection)
      .init(config.options);
  }
}
