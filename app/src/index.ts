import {createApp} from "vue";
import {createPinia} from "pinia";

// Vuetify
import "vuetify/styles";
import {createVuetify} from "vuetify";
import * as components from "vuetify/components";
import * as directives from "vuetify/directives";
import "@mdi/font/css/materialdesignicons.css";

import "./style.css";
import App from "./app";

const vuetify = createVuetify({
    components,
    directives,
    theme: {
        defaultTheme: "dark",
    },
});

const pinia = createPinia();
createApp(App).use(pinia).use(vuetify).mount("#app");
