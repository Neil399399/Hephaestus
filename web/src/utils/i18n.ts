import i18n from "i18next";
import Backend from "i18next-http-backend";
import { initReactI18next } from "react-i18next";

i18n
  .use(Backend)
  .use(initReactI18next) // passes i18n down to react-i18next
  .init({
    fallbackLng: "en",
    lng: "en",
    preload: ["en", "zh_tw"],
    debug: false,
    react: {
      useSuspense: false,
    },
    keySeparator: false, // we do not use keys in form messages.welcome

    interpolation: {
      escapeValue: false, // react already safes from xss
      format: function (value, format, lng) {
        switch (format) {
          case "amountDisplay":
            let parts = value.toString().split(".");
            parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
            return parts.join(".");
          case "upperCase":
            return value.toUpperCase();
          default:
            return value;
        }
      },
    },
  });

export default i18n;
