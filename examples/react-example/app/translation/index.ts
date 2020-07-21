import i18n, { i18n as I18n } from "i18next";
import { Config } from "@micra/core";
import { initReactI18next } from "react-i18next";
import { ServiceProvider } from "@micra/service-provider";
import languageDetection from "i18next-browser-languagedetector";
import { TranslationConfig } from "app/translation/types";

export class TranslationServiceProvider extends ServiceProvider {
  register() {
    this.container.value("translation", i18n);
  }

  boot() {
    const translation = this.container.use<I18n>("translation");
    const config = this.container
      .use<Config>("config")
      .get("translation") as TranslationConfig;

    translation
      .use(initReactI18next)
      .use(languageDetection)
      .init(config.options);
  }
}
