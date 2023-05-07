<script setup lang="ts">
import * as store from "😺/core/store/Browse";
const state = store.use();
</script>

<template>
    <v-select
        persistent-hint
        :items="[
            {title: null, value: null},
            ...Object.keys(state.categories).map((v) => ({
                title: $vuetify.locale.t(`category.${v}`),
                value: v,
            })),
        ]"
        :hint="$vuetify.locale.t('browse.params.category.hint')"
        :model-value="state.request.category"
        @update:model-value="(v) => state.setRequestCategory(v)"
    />
</template>
