<script setup lang="ts">
import config from "😺/core/config";
import * as store from "😺/core/store/Browse";
import * as T from "😺/types";

import Alert from "./Alert.vue";
import Images from "./Images.vue";
import * as Parameter from "./Parameter";
import RequestButton from "./RequestButton.vue";

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
</script>

<template>
    <div v-if="state.loading">
        <v-row justify="center">
            <v-progress-circular :size="70" :width="7" color="primary" indeterminate />
        </v-row>
    </div>
    <div v-else>
        <v-row justify="center">
            <v-col md="4" xl="2">
                <Parameter.Quantity />
            </v-col>
            <v-col md="6" xl="3">
                <Parameter.Category />
            </v-col>
        </v-row>
        <v-row justify="center">
            <v-col md="4" xl="2">
                <Parameter.Palette />
            </v-col>
            <v-col md="6" xl="3">
                <Parameter.Color />
            </v-col>
        </v-row>
        <v-row justify="center">
            <v-col md="10" xl="5">
                <RequestButton />
            </v-col>
        </v-row>
        <div v-if="state.isError || (state.showImages && state.images.length === 0)">
            <v-row justify="center" :style="{marginTop: 'max(10px, 1svh)'}">
                <v-col md="6" xl="3">
                    <Alert />
                </v-col>
            </v-row>
        </div>
        <div v-else-if="state.showImages">
            <v-row justify="center" :style="{marginTop: 'max(10px, 1svh)'}">
                <v-col md="6" xl="3">
                    <Images :links="state.images" />
                </v-col>
            </v-row>
        </div>
    </div>
</template>
