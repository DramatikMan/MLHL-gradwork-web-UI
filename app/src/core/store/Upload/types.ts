import type {StoreDefinition} from "pinia";

export interface State {
    processing: boolean;
    predicted: string | null;
    isError: boolean;
    showAlert: boolean;
    resultStatus: "error" | "success" | "timeout" | null;
}

export interface Getters {
    [key: string]: () => void;
}

export interface Actions {
    setProcessing: (value: State["processing"]) => void;
    setPredicted: (value: State["predicted"]) => void;
    setIsError: (value: State["isError"]) => void;
    setShowAlert: (value: State["showAlert"]) => void;
    setResultStatus: (value: State["resultStatus"]) => void;
}

export type Store = StoreDefinition<"Upload", State, Getters, Actions>;
