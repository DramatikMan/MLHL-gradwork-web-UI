<script setup lang="ts">
import config from "😺/core/config";
import * as store from "😺/core/store/Browse";
import * as T from "😺/types";

const state = store.use();
const apiURL = config.get("BACKEND_API_URL");

fetch(`${apiURL}/category`)
    .then((response) => {
        response
            .json()
            .then((data: T.Category[] | T.APIError) => {
                if ("detail" in data) {
                    console.log(`API Error: ${data.detail}`);
                    state.setLoading(false);
                } else {
                    state.setCategories(data);
                    state.setLoading(false);
                }
            })
            .catch(() => state.setLoading(false));
    })
    .catch(() => state.setLoading(false));

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
        console.log(data);
    } else {
        const err: T.APIError = await response.json();
        console.log(err.detail);
    }

    state.setRequesting(false);
}
</script>

<template>
    <div v-if="state.loading">
        <v-row justify="center">
            <v-progress-circular :size="70" :width="7" color="primary" indeterminate />
        </v-row>
    </div>
    <div v-else>
        <v-row justify="center">
            <v-col cols="4" style="width: 15svh">
                <v-select
                    hint="Number of images to request"
                    persistent-hint
                    :items="[...Array(9).keys()].map((v) => v + 1)"
                    :model-value="state.selectedQuantity"
                    @update:model-value="(v) => state.setSelectedQuantity(v)"
                />
            </v-col>
            <v-col cols="6" style="width: 15svh">
                <v-select
                    hint="Vegetable category"
                    persistent-hint
                    :items="[Object.keys(state.categories)]"
                    :model-value="state.selectedCategory"
                    @update:model-value="(v) => state.setSelectedCategory(v)"
                />
            </v-col>
        </v-row>
        <v-row justify="center">
            <v-col cols="10">
                <v-btn block :loading="state.requesting" @click.prevent="onRequest">Request</v-btn>
            </v-col></v-row
        >
    </div>
</template>
