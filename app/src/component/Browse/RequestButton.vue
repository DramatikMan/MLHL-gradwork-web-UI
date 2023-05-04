<script setup lang="ts">
import config from "😺/core/config";
import * as store from "😺/core/store/Browse";
import * as T from "😺/types";

const state = store.use();
const apiURL = config.get("BACKEND_API_URL");

async function onRequest() {
    state.setRequesting(true);

    const response = await fetch(
        [
            `${apiURL}/image/sample`,
            `?category_uid=${state.categories[state.selectedCategory]}`,
            `&qty=${state.selectedQuantity}`,
        ].join(""),
    );

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
    <v-btn block :loading="state.requesting" @click.prevent="onRequest">Request</v-btn>
</template>
