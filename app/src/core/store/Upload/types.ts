import type {StoreDefinition} from "pinia";

export interface Alert {
    status: "error" | "success" | "timeout" | null;
    errorReason: "type" | "size" | "other" | null;
    text: string | null;
}

export interface State {
    processing: boolean;
    predicted: string | null;
    alert: Alert;
}

export interface Getters {
    [key: string]: () => void;
}

export interface Actions {
    setProcessing: (value: State["processing"]) => void;
    setPredicted: (value: State["predicted"]) => void;
    setAlertStatus: (value: Alert["status"]) => void;
    setAlertErrorReason: (value: Alert["errorReason"]) => void;
    setAlertText: (value: Alert["text"]) => void;
}

export type Store = StoreDefinition<"Upload", State, Getters, Actions>;
