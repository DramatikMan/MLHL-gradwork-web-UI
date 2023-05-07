<script setup lang="ts">
import config from "😺/core/config";
import * as store from "😺/core/store/Browse";
import * as T from "😺/types";

const state = store.use();
const apiURL = config.get("BACKEND_API_URL");

async function onRequest() {
    state.setRequesting(true);
    const requestURL = [`${apiURL}/image/sample`, `?qty=${state.selectedQuantity}`];

    if (state.selectedCategory !== null)
        requestURL.push(`&category_uid=${state.categories[state.selectedCategory]}`);

    const response = await fetch(requestURL.join(""));

    if (response.ok) {
        const data: string[] = await response.json();
        state.setImages(data);
        state.setIsError(false);
        state.setShowImages(true);
    } else {
        const err: T.APIError = await response.json();
        console.error(err.detail);
        state.setShowImages(false);
        state.setIsError(true);
    }

    state.setRequesting(false);
}
</script>

<template>
    <v-btn size="3rem" block :loading="state.requesting" @click.prevent="onRequest">
        <v-icon icon="mdi-refresh" size="2rem" />
    </v-btn>
</template>
