<script setup lang="ts">
import {useLocale} from "vuetify";
import * as store from "😺/core/store";

const state = store.use();
const {current} = useLocale();
</script>

<template>
    <v-app-bar>
        <div class="gwui-locale-toggle">
            <v-btn-toggle v-model="current">
                <v-btn value="en">EN</v-btn>
                <v-btn value="ru">RU</v-btn>
            </v-btn-toggle>
        </div>
    </v-app-bar>
    <v-container fluid class="fill-height">
        <v-spacer />
        <v-main>
            <slot></slot>
        </v-main>
        <v-spacer />
    </v-container>
    <v-bottom-navigation v-model="state.tab" grow color="primary">
        <v-btn value="Browse" to="/browse">
            <v-icon>mdi-folder-open</v-icon>
            {{ $vuetify.locale.t(`browse.title`) }}
        </v-btn>
        <v-btn value="Upload" to="/upload">
            <v-icon>mdi-upload</v-icon>
            {{ $vuetify.locale.t(`upload.title`) }}
        </v-btn>
    </v-bottom-navigation>
</template>

<style scoped>
div.gwui-locale-toggle {
    width: 100%;
    display: grid;
    justify-items: center;
}
</style>
