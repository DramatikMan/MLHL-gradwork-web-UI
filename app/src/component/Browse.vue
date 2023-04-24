<script setup lang="ts">
import {ref} from "vue";

import config from "😺/core/config";
import * as store from "😺/core/store/Browse";
import * as T from "😺/types";

const state = store.use();
const categories = ref<string[]>([]);
const categoryURL = `${config.get("BACKEND_API_URL")}/category`;

fetch(categoryURL)
    .then((response) => {
        response
            .json()
            .then((data: T.Category[]) => {
                categories.value = data.map((v) => v.title);
            })
            .catch((e) => console.log(e));
    })
    .catch((e) => console.log(e));
</script>

<template>
    <v-row justify="center">
        <v-col cols="6" style="width: 50svh">
            <v-select
                clearable
                placeholder="Select vegetable category"
                persistent-clear
                :items="categories"
                @update:model-value="(v: string) => state.setCategory(v)"
            />
        </v-col>
    </v-row>
</template>
