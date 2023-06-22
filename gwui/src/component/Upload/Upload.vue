<script setup lang="ts">
import {ref} from "vue";

import config from "😺/core/config";
import * as store from "😺/core/store/Upload";
import * as T from "😺/types";
import Alert from "./Alert.vue";
import Input from "./Input.vue";
import PredictButton from "./PredictButton.vue";
import Resize from "./Resize.vue";
import type {PostImageAPIError} from "./types";

const state = store.use();
const file = ref<File | null>(null);

const maxResultChecks = 5;
const msCheckDelay = 1000;

const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms));

async function predict(file: File) {
    state.setProcessing(true);
    const payload = new FormData();
    payload.append("data", file);

    const imageURL = `${config.get("BACKEND_API_URL")}/image`;
    const response = await fetch(imageURL, {method: "POST", body: payload});

    if (response.ok) {
        const data: T.Image = await response.json();
        const uid = data.uid;
        let resultChecks = 0;

        while (resultChecks < maxResultChecks) {
            resultChecks++;
            const response = await fetch(`${imageURL}/${uid}`);
            const data: T.Image = await response.json();

            if (data.category !== null) {
                state.setProcessing(false);
                state.setResponse(data);
                state.setAlertStatus("success");
                break;
            }

            await sleep(msCheckDelay);
        }

        if (state.processing) state.setAlertStatus("timeout");
    } else {
        const err: PostImageAPIError = await response.json();
        console.error(err.detail);
        state.setAlertStatus("error");

        if (err.extra === null) {
            state.setAlertErrorReason("other");
            state.setProcessing(false);
            return;
        } else if ("type" in err.extra) {
            state.setAlertErrorReason("type");
            state.setAlertText(err.extra.type);
        } else if ("size" in err.extra) {
            state.setAlertErrorReason("size");
            const size = `[${err.extra.size[0].toString()}, ${err.extra.size[1].toString()}]`;
            state.setAlertText(size);
        }
    }

    state.setProcessing(false);
}
</script>

<template>
    <v-row justify="center">
        <v-col md="6" xl="4">
            <Input v-model="file" />
        </v-col>
    </v-row>
    <div v-if="state.alert.status !== null">
        <v-row justify="center">
            <v-col md="6" xl="4">
                <Alert />
            </v-col>
        </v-row>
    </div>
    <v-row justify="center">
        <v-col md="6" xl="4">
            <PredictButton :file="file" :predict="predict" />
        </v-col>
    </v-row>
    <Resize :file="file" :predict="predict" />
</template>
