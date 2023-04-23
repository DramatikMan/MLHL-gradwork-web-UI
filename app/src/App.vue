<script setup lang="ts">
import Layout from "😺/layout/Layout.vue";
import * as container from "😺/container";
import {useStore} from "😺/core/store";

const store = useStore();
</script>

<template>
    <v-app id="gwui">
        <Layout>
            <div v-if="store.view === 'Browse'">
                <container.Browse />
            </div>
            <div v-else-if="store.view === 'Upload'">
                <container.Upload />
            </div>
        </Layout>
    </v-app>
</template>
