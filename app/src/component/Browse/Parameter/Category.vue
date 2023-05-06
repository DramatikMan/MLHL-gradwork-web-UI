<script setup lang="ts">
import * as store from "😺/core/store/Browse";
const state = store.use();
</script>

<template>
    <v-select
        hint="Vegetable category"
        persistent-hint
        :items="[undefined, ...Object.keys(state.categories)]"
        :model-value="state.selectedCategory"
        @update:model-value="(v) => state.setSelectedCategory(v ?? null)"
    />
</template>
