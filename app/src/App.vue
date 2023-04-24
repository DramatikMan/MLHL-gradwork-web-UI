<script setup lang="ts">
import Layout from "😺/layout/Layout.vue";
import * as store from "😺/core/store";

import {Browse} from "./component";
import {Upload} from "./component";

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
