<script setup lang="ts">
import {ref} from "vue";

import * as T from "😺/types";
import config from "😺/core/config";

const file = ref<File | null>(null);
const processing = ref(false);
const isError = ref(false);
const showAlert = ref(false);
const alertText = ref<string | undefined>(undefined);

const maxResultChecks = 5;
const msCheckDelay = 1000;

const imageURL = `${config.get("BACKEND_API_URL")}/image`;
const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms));

async function onUpdate(files: File[]) {
    isError.value = false;
    showAlert.value = false;
    alertText.value = undefined;
    if (files.length === 0) return;
    const first = files[0];
    if (first !== undefined) file.value = first;
}

async function onPredict() {
    if (file.value === null) return;

    processing.value = true;
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
                processing.value = false;
                alertText.value = `Predicted category: ${data.category.title}`;
                break;
            }

            await sleep(msCheckDelay);
        }

        if (processing.value) {
            alertText.value = `Could not get a prediction within ${maxResultChecks} second(s)`;
            isError.value = true;
        }
    } else {
        const err: T.APIError = await response.json();
        alertText.value = err.detail;
        isError.value = true;
    }

    processing.value = false;
    showAlert.value = true;
}
</script>

<template>
    <v-row justify="center">
        <v-col cols="6" style="width: 70svh">
            <v-file-input
                accept="image/jpeg"
                density="compact"
                hide-details
                persistent-clear
                prepend-icon="mdi-camera"
                variant="solo"
                @update:model-value="onUpdate"
            />
        </v-col>
    </v-row>
    <v-row justify="center">
        <v-col cols="6" :hidden="!showAlert">
            <v-alert
                closable
                density="compact"
                :icon="isError ? 'mdi-emoticon-cry' : 'mdi-check-circle'"
                :model-value="showAlert"
                :text="alertText"
                :title="isError ? 'Error' : 'Success'"
                :type="isError ? 'error' : 'success'"
            />
        </v-col>
    </v-row>
    <v-row justify="center">
        <v-col cols="6">
            <v-btn block :loading="processing" @click.prevent="onPredict">Get prediction</v-btn>
        </v-col>
    </v-row>
</template>
