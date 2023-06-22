<script setup lang="ts">
import * as store from "😺/core/store/Upload";

const props = defineProps<{file: File | null; predict: (file: File) => Promise<void>}>();
const state = store.use();

async function onClick() {
    const file = props.file;
    if (file === null) return;
    const img = new Image();

    img.onload = function () {
        // @ts-expect-error missing concrete HTML element typings
        if (this.height > 0 && this.width > 0 && this.height === this.width) {
            state.setImageIsSquare(true);
        }

        state.setResizing(true);
        state.setPrompting(true);
    };

    img.src = URL.createObjectURL(file);
}
</script>

<template>
    <v-btn block :loading="state.processing" @click.prevent="onClick">
        {{ $vuetify.locale.t("upload.button") }}
    </v-btn>
</template>
