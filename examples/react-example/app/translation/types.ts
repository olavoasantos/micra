export type Language = "en" | "fr";

export interface TranslationConfig<T = Record<string, any>> {
  default: Language;
  languages: Language[];
  options: T;
}
