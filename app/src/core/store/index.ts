import {defineStore} from "pinia";

import * as t from "./types";

const initial: t.State = {
    tab: "Browse",
};

export const use: t.Store = defineStore("main", {
    state: () => initial,
    actions: {
        setTab(value: t.Tab) {
            this.tab = value;
        },
    },
});
