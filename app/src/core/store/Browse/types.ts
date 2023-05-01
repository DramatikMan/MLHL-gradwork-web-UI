import type {StoreDefinition} from "pinia";

import * as T from "😺/types";

export interface State {
    loading: boolean;
    categories: Record<string, number>;
    selectedQuantity: number;
    selectedCategory: string;
    requesting: boolean;
    images: string[];
    showImages: boolean;
}

export interface Getters {
    [key: string]: () => void;
}

export interface Actions {
    setLoading: (value: State["loading"]) => void;
    setCategories: (value: T.Category[]) => void;
    setSelectedQuantity: (value: State["selectedQuantity"]) => void;
    setSelectedCategory: (value: State["selectedCategory"]) => void;
    setRequesting: (value: State["requesting"]) => void;
    setImages: (value: State["images"]) => void;
    setShowImages: (value: State["showImages"]) => void;
}

export type Store = StoreDefinition<"Browse", State, Getters, Actions>;
