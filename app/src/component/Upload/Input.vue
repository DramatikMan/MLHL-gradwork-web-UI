<script setup lang="ts">
import * as store from "😺/core/store/Upload";

defineProps<{modelValue: File | null}>();
const emit = defineEmits<{(event: "update:modelValue", value: File): void}>();
const state = store.use();

async function onUpdate(files: File[]) {
    state.setIsError(false);
    state.setShowAlert(false);
    const file = files[0];
    if (file === undefined) return;
    emit("update:modelValue", file);
}
</script>

<template>
    <v-file-input
        accept="image/jpeg"
        density="compact"
        persistent-clear
        persistent-hint
        prepend-icon="mdi-camera"
        variant="solo"
        :hint="$vuetify.locale.t('$vuetify.gwui.upload.hint')"
        @update:model-value="onUpdate"
    />
</template>
