import {defineStore} from "pinia";

import * as types from "./types";

const initial: types.State = {tab: null};

export const use: types.Store = defineStore("main", {
    state: () => initial,
    actions: {
        setTab(value: types.Tab) {
            this.tab = value;
        },
    },
});

export * as types from "./types";
