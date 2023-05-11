import type {StoreDefinition} from "pinia";

export type Tab = "Browse" | "Upload";

export interface State {
    tab: Tab | null;
}

export interface Getters {
    [key: string]: () => void;
}

export interface Actions {
    setTab: (value: Tab) => void;
}

export type Store = StoreDefinition<"main", State, Getters, Actions>;
