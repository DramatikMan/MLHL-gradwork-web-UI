<script setup lang="ts">
import {ref} from "vue";

import * as T from "😺/types";
import config from "😺/core/config";
import * as store from "😺/core/store/Upload";

const state = store.use();
const file = ref<File | null>(null);

const maxResultChecks = 5;
const msCheckDelay = 1000;

const imageURL = `${config.get("BACKEND_API_URL")}/image`;
const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms));

async function onUpdate(files: File[]) {
    state.setIsError(false);
    state.setShowAlert(false);
    if (files.length === 0) return;
    const first = files[0];
    if (first !== undefined) file.value = first;
}

async function onPredict() {
    if (file.value === null) return;

    state.setProcessing(true);
    const payload = new FormData();
    payload.append("data", file.value);
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
                state.setAlertText(`Predicted category: ${data.category.title}`);
                break;
            }

            await sleep(msCheckDelay);
        }

        if (state.processing) {
            state.setAlertText(`Could not get a prediction within ${maxResultChecks} second(s)`);
            state.setIsError(true);
        }
    } else {
        const err: T.APIError = await response.json();
        console.error(err.detail);
        state.setAlertText("Sorry, something went wrong");
        state.setIsError(true);
    }

    state.setProcessing(false);
    state.setShowAlert(true);
}
</script>
<template>
    <v-row justify="center">
        <v-col cols="6" style="width: 70svh">
            <v-file-input
                accept="image/jpeg"
                density="compact"
                hint="Select a square JPG image"
                persistent-clear
                persistent-hint
                prepend-icon="mdi-camera"
                variant="solo"
                @update:model-value="onUpdate"
            />
        </v-col>
    </v-row>
    <div v-if="state.showAlert">
        <v-row justify="center">
            <v-col cols="6">
                <v-alert
                    v-model:model-value="state.showAlert"
                    closable
                    density="compact"
                    variant="tonal"
                    :icon="state.isError ? 'mdi-emoticon-cry' : 'mdi-check-circle'"
                    :text="state.alertText ?? undefined"
                    :title="state.isError ? 'Error' : 'Success!'"
                    :type="state.isError ? 'error' : 'success'"
                />
            </v-col>
        </v-row>
    </div>
    <v-row justify="center">
        <v-col cols="6">
            <v-btn block :loading="state.processing" @click.prevent="onPredict">
                Get prediction
            </v-btn>
        </v-col>
    </v-row>
</template>
