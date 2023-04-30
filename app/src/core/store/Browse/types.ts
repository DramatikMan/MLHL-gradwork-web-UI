import type {StoreDefinition} from "pinia";

import * as T from "😺/types";

export interface State {
    loading: boolean;
    categories: Record<string, number>;
    selectedQuantity: number;
    selectedCategory: string;
    requesting: boolean;
}

export interface Getters {
    [key: string]: () => void;
}

export interface Actions {
    setLoading: (value: boolean) => void;
    setCategories: (value: T.Category[]) => void;
    setSelectedQuantity: (value: number) => void;
    setSelectedCategory: (value: string) => void;
    setRequesting: (value: boolean) => void;
}

export type Store = StoreDefinition<"Browse", State, Getters, Actions>;
