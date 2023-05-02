import type {StoreDefinition} from "pinia";

export interface State {
    processing: boolean;
    isError: boolean;
    showAlert: boolean;
    alertText: string | null;
}

export interface Getters {
    [key: string]: () => void;
}

export interface Actions {
    setProcessing: (value: State["processing"]) => void;
    setIsError: (value: State["isError"]) => void;
    setShowAlert: (value: State["showAlert"]) => void;
    setAlertText: (value: Exclude<State["alertText"], null>) => void;
}

export type Store = StoreDefinition<"Upload", State, Getters, Actions>;
