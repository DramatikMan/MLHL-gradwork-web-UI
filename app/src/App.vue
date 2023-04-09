<script setup lang="ts">
import Centered from "./layout/Centered.vue";
import Upload from "./components/Upload.vue";
</script>

<template>
    <v-app id="gwui">
        <v-main>
            <Centered>
                <Upload />
            </Centered>
        </v-main>
    </v-app>
</template>
