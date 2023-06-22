import {defineStore} from "pinia";

import * as types from "./types";

const initial: types.State = {
    imageIsSquare: false,
    resizing: false,
    prompting: false,
    cropping: false,
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
        setImageIsSquare(value) {
            this.imageIsSquare = value;
        },
        setResizing(value) {
            this.resizing = value;
            this.prompting = false;
            this.cropping = false;
        },
        setPrompting(value) {
            this.prompting = value;
        },
        setCropping(value) {
            this.cropping = value;
        },
        setProcessing(value) {
            this.processing = value;
        },
        setResponse(value) {
            this.response = value;
        },
        setAlertStatus(value) {
            this.alert.status = value;
        },
        setAlertErrorReason(value) {
            this.alert.errorReason = value;
        },
        setAlertText(value) {
            this.alert.text = value;
        },
        reset() {
            this.response = null;
            this.alert = {status: null, errorReason: null, text: null};
            this.imageIsSquare = false;
        },
    },
});
