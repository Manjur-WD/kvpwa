import i18n from "i18next";
import languageDetector from "i18next-browser-languagedetector";
import { initReactI18next } from "react-i18next";
import Backend from "i18next-http-backend"
import BASE_URL from "../../config";

i18n.use(languageDetector).use(initReactI18next).use(Backend).init({
  debug: false,
  fallbacklang: "en",
  returnObjects: true,
  backend: {
    loadPath: `${BASE_URL}/locales/{{lng}}/translation.json`,// Make sure this path is correct
  },
});
