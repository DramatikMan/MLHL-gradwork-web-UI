<script setup lang="ts">
import * as store from "😺/core/store/Browse";
const state = store.use();
</script>

<template>
    <v-select
        v-model:model-value="state.selectedCategory"
        hint="Vegetable category"
        persistent-hint
        :items="Object.keys(state.categories)"
    />
</template>
