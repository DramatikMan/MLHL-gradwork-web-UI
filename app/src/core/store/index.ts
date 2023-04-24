import {defineStore} from "pinia";

type View = "Browse" | "Upload";

interface Store {
    view: View;
}

export const useStore = defineStore<"store", Store>("store", {
    state: () => ({view: "Browse"}),
    actions: {
        setView(value: View) {
            this.view = value;
        },
    },
});
