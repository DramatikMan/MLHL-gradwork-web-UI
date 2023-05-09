<script setup lang="ts">
import {Browse, Upload} from "😺/component";
import * as store from "😺/core/store";
import Layout from "./Layout.vue";

const state = store.use();
const tabs = {Browse, Upload};
</script>

<template>
    <v-app id="gwui">
        <Layout>
            <component :is="tabs[state.tab]" />
        </Layout>
    </v-app>
</template>
