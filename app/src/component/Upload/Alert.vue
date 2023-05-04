<script setup lang="ts">
import * as store from "😺/core/store/Upload";
const state = store.use();
</script>

<template>
    <v-alert
        v-model:model-value="state.showAlert"
        closable
        density="compact"
        variant="tonal"
        :icon="state.isError ? 'mdi-emoticon-cry' : 'mdi-check-circle'"
        :text="state.alertText ?? undefined"
        :title="state.isError ? 'Error' : 'Success!'"
        :type="state.isError ? 'error' : 'success'"
    />
</template>
