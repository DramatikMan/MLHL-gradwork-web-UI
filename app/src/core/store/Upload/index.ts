import {defineStore} from "pinia";

import * as types from "./types";

const initial: types.State = {
    processing: false,
    predicted: null,
    alert: {
        status: null,
        errorReason: null,
        text: null,
    },
};

export const use: types.Store = defineStore("Upload", {
    state: () => initial,
    actions: {
        setProcessing(value: types.State["processing"]) {
            this.processing = value;
        },
        setPredicted(value: types.State["predicted"]) {
            this.predicted = value;
        },
        setAlertStatus(value: types.Alert["status"]) {
            this.alert.status = value;
        },
        setAlertErrorReason(value: types.Alert["errorReason"]) {
            this.alert.errorReason = value;
        },
        setAlertText(value: types.Alert["text"]) {
            this.alert.text = value;
        },
    },
});
