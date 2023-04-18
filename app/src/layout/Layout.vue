<script setup lang="ts">
import {useStore} from "😺/core/store";
const store = useStore();
</script>

<template>
    <v-container fluid class="fill-height">
        <v-row no-gutters></v-row>
        <v-main>
            <slot></slot>
        </v-main>
        <v-row no-gutters> </v-row>
    </v-container>
    <v-bottom-navigation v-model="store.view" grow color="primary">
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
