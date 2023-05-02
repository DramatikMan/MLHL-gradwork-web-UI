import {defineStore} from "pinia";

import * as t from "./types";

const initial: t.State = {
    processing: false,
    isError: false,
    showAlert: false,
    alertText: null,
};

export const use: t.Store = defineStore("Upload", {
    state: () => initial,
    actions: {
        setProcessing(value: t.State["processing"]) {
            this.processing = value;
        },
        setIsError(value: t.State["isError"]) {
            this.isError = value;
        },
        setShowAlert(value: t.State["showAlert"]) {
            this.showAlert = value;
        },
        setAlertText(value: t.State["alertText"]) {
            this.alertText = value;
        },
    },
});
