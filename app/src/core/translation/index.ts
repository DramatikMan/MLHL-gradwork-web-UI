import ruRU from "./locales/ru.json";
import enGB from "./locales/en.json";

const localeRU = "ru";
const localeEN = "en";
type LocaleRU = typeof localeRU;
type LocaleEN = typeof localeEN;

export const options = {
    legacy: false,
    locale: localeRU,
    fallbackLocale: localeEN,
    messages: {
        [localeRU]: {$vuetify: ruRU},
        [localeEN]: {$vuetify: enGB},
    },
};

export type Locale = LocaleRU | LocaleEN;
export type MessageSchema = typeof ruRU;
