import {defineStore} from "pinia";

import * as types from "./types";

const initial: types.State = {
    processing: false,
    predicted: null,
    isError: false,
    showAlert: false,
    resultStatus: null,
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
        setIsError(value: types.State["isError"]) {
            this.isError = value;
        },
        setShowAlert(value: types.State["showAlert"]) {
            this.showAlert = value;
        },
        setResultStatus(value: types.State["resultStatus"]) {
            this.resultStatus = value;
        },
    },
});
