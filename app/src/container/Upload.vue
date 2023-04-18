<script setup lang="ts">
import {ref} from "vue";

import * as T from "😺/types";
import config from "😺/core/config";

const file = ref<File | null>(null);
const processing = ref(false);
const isError = ref(false);
const showAlert = ref(false);
const alertText = ref<string | undefined>(undefined);
const timeout = 5;

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

async function onSubmit() {
    if (file.value === null) return;

    processing.value = true;
    const payload = new FormData();
    payload.append("data", file.value);

    const response = await fetch(imageURL, {method: "POST", body: payload});

    if (response.ok) {
        const data: T.Image = await response.json();
        const uid = data.uid;
        let tries = 0;

        while (tries < timeout) {
            tries++;
            const response = await fetch(`${imageURL}/${uid}`);
            const data: T.Image = await response.json();

            if (data.category !== null) {
                processing.value = false;
                alertText.value = `Predicted category: ${data.category.title}`;
                file.value = null;
                showAlert.value = true;
                break;
            }

            await sleep(1000);
        }

        if (processing.value) {
            processing.value = false;
            alertText.value = `Could not get a prediction within ${timeout} second(s)`;
            isError.value = true;
            showAlert.value = true;
        }
    } else {
        const err: T.APIError = await response.json();
        processing.value = false;
        isError.value = true;
        alertText.value = err.detail;
        showAlert.value = true;
    }
}
</script>

<template>
    <v-row justify="center">
        <v-col cols="9">
            <v-file-input
                density="compact"
                accept="image/jpeg"
                label="Image"
                prepend-icon="mdi-camera"
                variant="solo"
                hide-details
                @update:model-value="onUpdate"
            ></v-file-input>
        </v-col>
        <v-responsive width="100%"></v-responsive>
        <v-col cols="9" :hidden="!showAlert">
            <v-alert
                v-model:model-value="showAlert"
                closable
                :icon="isError ? 'mdi-emoticon-cry' : 'mdi-check-circle'"
                density="compact"
                :type="isError ? 'error' : 'success'"
                :title="isError ? 'Error' : 'Success'"
                :text="alertText"
            ></v-alert>
        </v-col>
        <v-responsive width="100%"></v-responsive>
        <v-col cols="9">
            <v-btn block :loading="processing" @click.prevent="onSubmit">Submit</v-btn>
        </v-col>
    </v-row>
</template>
