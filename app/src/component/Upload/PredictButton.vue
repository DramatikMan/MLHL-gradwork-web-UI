<script setup lang="ts">
import * as T from "😺/types";
import config from "😺/core/config";
import * as store from "😺/core/store/Upload";

const props = defineProps<{file: File | null}>();
const state = store.use();

const maxResultChecks = 5;
const msCheckDelay = 1000;

const imageURL = `${config.get("BACKEND_API_URL")}/image`;
const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms));

async function onPredict() {
    if (props.file === null) return;

    state.setProcessing(true);
    const payload = new FormData();
    payload.append("data", props.file);
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
                state.setPredicted(data.category.title);
                state.setResultStatus("success");
                break;
            }

            await sleep(msCheckDelay);
        }

        if (state.processing) {
            state.setResultStatus("timeout");
            state.setIsError(true);
        }
    } else {
        const err: T.APIError = await response.json();
        console.error(err.detail);
        state.setResultStatus("error");
        state.setIsError(true);
    }

    state.setProcessing(false);
    state.setShowAlert(true);
}
</script>

<template>
    <v-btn block :loading="state.processing" @click.prevent="onPredict">
        {{ $vuetify.locale.t("upload.button") }}
    </v-btn>
</template>
