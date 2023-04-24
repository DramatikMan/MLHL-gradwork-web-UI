import {defineStore} from "pinia";

import * as t from "./types";

const initial: t.State = {
    category: null,
};

export const use: t.Store = defineStore("Browse", {
    state: () => initial,
    actions: {
        setCategory(value: string) {
            this.category = value;
        },
    },
});
