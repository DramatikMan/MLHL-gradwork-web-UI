import * as vueRouter from "vue-router";

import App from "./App.vue";

const router = vueRouter.createRouter({
    history: vueRouter.createWebHistory(),
    routes: [
        {path: "/", component: App, props: {tab: "Browse"}},
        {path: "/browse", component: App, props: {tab: "Browse"}},
        {path: "/upload", component: App, props: {tab: "Upload"}},
        {path: "/:catchAll(.*)", component: App},
    ],
});

export default router;
