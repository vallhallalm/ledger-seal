import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";
import enTranslation from "./translations/en/common.json";
import frTranslation from "./translations/fr/common.json";
import esTranslation from "./translations/es/common.json";
import ptTranslation from "./translations/pt/common.json";
import deTranslation from "./translations/de/common.json";

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    fallbackLng: "en",
    debug: true,
    interpolation: { escapeValue: false },
    resources: {
      en: { translation: enTranslation },
      fr: { translation: frTranslation },
      es: { translation: esTranslation },
      pt: { translation: ptTranslation },
      de: { translation: deTranslation },
    },
  });

export default i18n;
