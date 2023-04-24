import {defineStore} from "pinia";

type View = "Browse" | "Upload";

interface State {
    view: View;
}

interface Getters {
    [key: string]: () => void;
}

interface Actions {
    setView: (value: View) => void;
}

export const useStore = defineStore<"store", State, Getters, Actions>("store", {
    state: () => ({view: "Browse"}),
    actions: {
        setView(value: View) {
            this.view = value;
        },
    },
});
