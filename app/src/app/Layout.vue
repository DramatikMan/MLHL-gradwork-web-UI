<script setup lang="ts">
import * as store from "😺/core/store";

const state = store.use();
</script>

<template>
    <v-container fluid class="fill-height">
        <v-spacer />
        <v-main>
            <slot></slot>
        </v-main>
        <v-spacer />
    </v-container>
    <v-bottom-navigation v-model="state.tab" grow color="primary">
        <v-btn value="Browse">
            <v-icon>mdi-folder-open</v-icon>
            Browse
        </v-btn>
        <v-btn value="Upload">
            <v-icon>mdi-upload</v-icon>
            Upload
        </v-btn>
    </v-bottom-navigation>
</template>
