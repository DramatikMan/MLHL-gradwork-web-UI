<script setup lang="ts">
import config from "😺/core/config";

const imageUrl = `${config.get("BACKEND_API_URL")}/image`;

async function onUpdate(files: File[]) {
    if (files.length === 0) return;
    const data = new FormData();

    for (const file of files) {
        data.append("data", file);
    }

    const response = await fetch(imageUrl, {method: "POST", body: data});
    const respData = await response.json();
    const uid: number = respData["uid"];
    console.log(uid);
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
            <v-btn type="submit" block>Submit</v-btn>
        </v-col>
    </v-row>
</template>
