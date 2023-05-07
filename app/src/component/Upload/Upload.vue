<script setup lang="ts">
import {ref} from "vue";

import * as store from "😺/core/store/Upload";
import Alert from "./Alert.vue";
import Input from "./Input.vue";
import PredictButton from "./PredictButton.vue";

const state = store.use();
const file = ref<File | null>(null);
</script>

<template>
    <v-row justify="center">
        <v-col cols="6" style="width: 70svw">
            <Input v-model="file" />
        </v-col>
    </v-row>
    <div v-if="state.showAlert">
        <v-row justify="center">
            <v-col cols="6">
                <Alert />
            </v-col>
        </v-row>
    </div>
    <v-row justify="center">
        <v-col cols="6">
            <PredictButton :file="file" />
        </v-col>
    </v-row>
</template>
