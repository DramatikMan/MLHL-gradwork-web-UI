import {defineStore} from "pinia";

type View = "Browse" | "Upload";

export const useStore = defineStore("store", {
    state: () => ({view: "Browse"}),
    actions: {
        setView(value: View) {
            this.view = value;
        },
    },
});
