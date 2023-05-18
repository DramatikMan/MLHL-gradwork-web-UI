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
        <v-col md="6" xl="4">
            <Input v-model="file" />
        </v-col>
    </v-row>
    <div v-if="state.alert.status !== null">
        <v-row justify="center">
            <v-col md="6" xl="4">
                <Alert />
            </v-col>
        </v-row>
    </div>
    <v-row justify="center">
        <v-col md="6" xl="4">
            <PredictButton :file="file" />
        </v-col>
    </v-row>
</template>
