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
        :text="
            (state.isError
                ? $vuetify.locale.t(`$vuetify.gwui.alert.text.${state.resultStatus}`)
                : `${$vuetify.locale.t('$vuetify.gwui.upload.result.categoryPrefix')}: ` +
                  $vuetify.locale.t(`$vuetify.gwui.category.${state.predicted}`).toLowerCase()) ??
            undefined
        "
        :title="
            $vuetify.locale.t(`$vuetify.gwui.alert.title.${state.isError ? 'error' : 'success'}`) +
            '!'
        "
        :type="state.isError ? 'error' : 'success'"
    />
</template>
