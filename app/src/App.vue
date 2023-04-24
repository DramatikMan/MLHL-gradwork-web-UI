<script setup lang="ts">
import Layout from "😺/layout/Layout.vue";
import {useStore} from "😺/core/store";

import {Browse} from "./component";
import {Upload} from "./component";

const store = useStore();
const tabs = {Browse, Upload};
</script>

<template>
    <v-app id="gwui">
        <Layout>
            <component :is="tabs[store.view]" />
        </Layout>
    </v-app>
</template>
