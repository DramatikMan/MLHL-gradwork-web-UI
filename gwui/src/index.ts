import {createApp} from "vue";
import {createI18n, useI18n} from "vue-i18n";
import {createPinia} from "pinia";

// Vuetify
import "vuetify/styles";
import {createVuetify} from "vuetify";
import * as components from "vuetify/components";
import * as directives from "vuetify/directives";
import {createVueI18nAdapter} from "vuetify/locale/adapters/vue-i18n";
import "@mdi/font/css/materialdesignicons.css";

import "😺/style.css";
import App from "😺/app";
import * as tl from "😺/core/translation";

const pinia = createPinia();
const i18n = createI18n<false, typeof tl.options, tl.MessageSchema>(tl.options);

const vuetify = createVuetify({
    components,
    directives,
    locale: {adapter: createVueI18nAdapter({i18n, useI18n})},
    theme: {defaultTheme: "dark"},
});

createApp(App).use(pinia).use(i18n).use(vuetify).mount("#app");
