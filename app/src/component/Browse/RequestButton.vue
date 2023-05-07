<script setup lang="ts">
import config from "😺/core/config";
import * as store from "😺/core/store/Browse";
import * as T from "😺/types";

const state = store.use();
const apiURL = config.get("BACKEND_API_URL");

async function onRequest() {
    state.setRequesting(true);
    const requestURL = `${apiURL}/image/sample`;
    const params = new URLSearchParams();
    params.append("qty", state.request.quantity.toString());

    if (state.request.category !== null) {
        const category_uid = state.categories[state.request.category];
        if (category_uid !== undefined) params.append("category_uid", category_uid.toString());
    }

    if (state.request.color !== null) {
        params.append("color_palette", state.request.palette);
        params.append("color", state.request.color);
    }

    const response = await fetch(requestURL + `?${params.toString()}`);

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
