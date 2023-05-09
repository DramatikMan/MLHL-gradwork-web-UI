import {defineStore} from "pinia";

import * as types from "./types";

const initial: types.State = {
    processing: false,
    response: null,
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
        setResponse(value: types.State["response"]) {
            this.response = value;
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
        reset() {
            this.response = null;
            this.alert = {status: null, errorReason: null, text: null};
        },
    },
});
