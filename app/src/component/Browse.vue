<script setup lang="ts">
import config from "😺/core/config";
import * as store from "😺/core/store/Browse";
import * as T from "😺/types";

import Images from "./Images.vue";

const state = store.use();
const apiURL = config.get("BACKEND_API_URL");

if (Object.keys(state.categories).length === 0) {
    fetch(`${apiURL}/category`)
        .then((response) => {
            response
                .json()
                .then((data: T.Category[] | T.APIError) => {
                    if ("detail" in data) {
                        console.error(data.detail);
                        state.setLoading(false);
                    } else {
                        state.setCategories(data);
                        state.setLoading(false);
                    }
                })
                .catch((e) => console.error(e));
        })
        .catch((e) => console.error(e));
}

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
    <div v-if="state.loading">
        <v-row justify="center">
            <v-progress-circular :size="70" :width="7" color="primary" indeterminate />
        </v-row>
    </div>
    <div v-else>
        <v-row justify="center">
            <v-col cols="4" style="width: 15svh">
                <v-select
                    v-model:model-value="state.selectedQuantity"
                    hint="Number of images to request"
                    :items="[...Array(9).keys()].map((v) => v + 1)"
                />
            </v-col>
            <v-col cols="6" style="width: 15svh">
                <v-select
                    v-model:model-value="state.selectedCategory"
                    hint="Vegetable category"
                    persistent-hint
                    :items="Object.keys(state.categories)"
                />
            </v-col>
        </v-row>
        <v-row justify="center">
            <v-col cols="10" style="width: 15svh">
                <v-btn block :loading="state.requesting" @click.prevent="onRequest">Request</v-btn>
            </v-col>
        </v-row>
        <div v-if="state.isError || (state.showImages && state.images.length === 0)">
            <v-row justify="center" :style="{marginTop: 'max(10px, 1svh)'}">
                <v-col cols="10" style="width: 15svh">
                    <v-alert
                        icon="mdi-emoticon-cry"
                        variant="text"
                        :title="
                            state.isError
                                ? 'Sorry, something went wrong'
                                : 'Sorry, no images fitting your request were found'
                        "
                        :type="state.isError ? 'error' : 'info'"
                    />
                </v-col>
            </v-row>
        </div>
        <div v-else-if="state.showImages">
            <v-row justify="center" :style="{marginTop: 'max(10px, 1svh)'}">
                <v-col cols="10" style="width: 15svh">
                    <Images :links="state.images" />
                </v-col>
            </v-row>
        </div>
    </div>
</template>

<style scoped>
div.v-alert {
    justify-content: center;
}
</style>
