import type {StoreDefinition} from "pinia";

export interface State {
    category: string | null;
}

export interface Getters {
    [key: string]: () => void;
}

export interface Actions {
    setCategory: (value: string) => void;
}

export type Store = StoreDefinition<"Browse", State, Getters, Actions>;
