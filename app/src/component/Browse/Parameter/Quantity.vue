<script setup lang="ts">
import * as store from "😺/core/store/Browse";
const state = store.use();
</script>

<template>
    <v-select
        v-model:model-value="state.selectedQuantity"
        hint="Number of images to request"
        :items="[...Array(9).keys()].map((v) => v + 1)"
    />
</template>
