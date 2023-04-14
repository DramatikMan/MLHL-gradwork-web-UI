<script setup lang="ts">
import {ref} from "vue";

import config from "😺/core/config";

let file = ref<File | null>(null);
const imageUrl = `${config.get("BACKEND_API_URL")}/image`;

async function onUpdate(files: File[]) {
    if (files.length === 0) return;
    const first = files[0];
    if (first !== undefined) file = first;
    console.log(file);
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
                @update:model-value="onUpdate"
            ></v-file-input>
        </v-col>
        <v-responsive width="100%"></v-responsive>
        <v-col cols="9">
            <v-alert density="compact" type="error"></v-alert>
        </v-col>
        <v-responsive width="100%"></v-responsive>
        <v-col cols="9">
            <v-btn block>Submit</v-btn>
        </v-col>
    </v-row>
</template>
