<script setup lang="ts">
import * as store from "😺/core/store/Browse";
const state = store.use();
</script>

<template>
    <v-alert
        icon="mdi-emoticon-cry"
        variant="text"
        :title="
            state.isError
                ? $vuetify.locale.t('$vuetify.gwui.alert.text.error')
                : $vuetify.locale.t('$vuetify.gwui.browse.empty')
        "
        :type="state.isError ? 'error' : 'info'"
    />
</template>

<style scoped>
div.v-alert {
    justify-content: center;
}
</style>
