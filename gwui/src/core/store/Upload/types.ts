import type {StoreDefinition} from "pinia";

import * as T from "😺/types";

export interface Alert {
    status: "error" | "success" | "timeout" | null;
    errorReason: "type" | "size" | "other" | null;
    text: string | null;
}

export interface State {
    imageIsSquare: boolean;
    resizing: boolean;
    prompting: boolean;
    cropping: boolean;
    processing: boolean;
    response: T.Image | null;
    alert: Alert;
}

export interface Getters {
    [key: string]: () => void;
}

export interface Actions {
    setImageIsSquare: (value: State["imageIsSquare"]) => void;
    setResizing: (value: State["resizing"]) => void;
    setPrompting: (value: State["prompting"]) => void;
    setCropping: (value: State["cropping"]) => void;
    setProcessing: (value: State["processing"]) => void;
    setResponse: (value: State["response"]) => void;
    setAlertStatus: (value: Alert["status"]) => void;
    setAlertErrorReason: (value: Alert["errorReason"]) => void;
    setAlertText: (value: Alert["text"]) => void;
    reset: () => void;
}

export type Store = StoreDefinition<"Upload", State, Getters, Actions>;
