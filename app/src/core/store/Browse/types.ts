import type {StoreDefinition} from "pinia";

import * as T from "😺/types";

export interface Request {
    quantity: number;
    category: string | null;
    palette: string | null;
    color: string | null;
}

export interface State {
    loading: boolean;
    categories: Record<string, number>;
    request: Request;
    requesting: boolean;
    images: string[];
    isError: boolean;
    showImages: boolean;
}

export interface Getters {
    [key: string]: () => void;
}

export interface Actions {
    setLoading: (value: State["loading"]) => void;
    setCategories: (value: T.Category[]) => void;
    setRequestQuantity: (value: Request["quantity"]) => void;
    setRequestCategory: (value: Request["category"]) => void;
    setRequestPalette: (value: Request["palette"]) => void;
    setRequestColor: (value: Request["color"]) => void;
    setRequesting: (value: State["requesting"]) => void;
    setImages: (value: State["images"]) => void;
    setIsError: (value: State["isError"]) => void;
    setShowImages: (value: State["showImages"]) => void;
}

export type Store = StoreDefinition<"Browse", State, Getters, Actions>;
