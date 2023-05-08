<script setup lang="ts">
import * as T from "😺/types";
import config from "😺/core/config";
import * as store from "😺/core/store/Upload";
import type {PostImageAPIError} from "./types";

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
    <v-btn block :loading="state.processing" @click.prevent="onPredict">
        {{ $vuetify.locale.t("upload.button") }}
    </v-btn>
</template>
