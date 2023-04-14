<script setup lang="ts">
import Layout from "./layout/Layout.vue";
import Upload from "./components/Upload.vue";
</script>

<template>
    <v-app id="gwui">
        <v-main>
            <Layout>
                <Upload />
            </Layout>
        </v-main>
    </v-app>
</template>
