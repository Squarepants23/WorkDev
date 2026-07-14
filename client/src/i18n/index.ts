import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";

import id from "./locales/id.json";
import en from "./locales/en.json";
import jp from "./locales/jp.json";
import kr from "./locales/kr.json";
import ar from "./locales/ar.json";
import ru from "./locales/ru.json";

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    fallbackLng: "id",

    supportedLngs: [
      "id",
      "en",
      "jp",
      "kr",
      "ar",
      "ru",
    ],

    interpolation: {
      escapeValue: false,
    },

    resources: {
      id: {
        translation: id,
      },

      en: {
        translation: en,
      },

      jp: {
        translation: jp,
      },

      kr: {
        translation: kr,
      },

      ar: {
        translation: ar,
      },

      ru: {
        translation: ru,
      },
    },
  });

export default i18n;