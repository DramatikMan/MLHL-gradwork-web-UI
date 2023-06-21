<script setup lang="ts">
import {computed} from "vue";
import {useI18n} from "vue-i18n";

import * as store from "😺/core/store/Upload";

const state = store.use();
const {t} = useI18n();
const show = computed(() => state.alert.status !== null);
const success = computed(() => state.alert.status === "success");

const text = computed<string | null>(() => {
    let out: string | null = null;

    switch (state.alert.status) {
        case "error":
            switch (state.alert.errorReason) {
                case null:
                    out = t("alert.text.error");
                    break;
                case "other":
                    out = t("alert.text.error");
                    break;
                case "type":
                    if (state.alert.text === null) {
                        out = t("upload.result.error.type.expected");
                        break;
                    }

                    out = [
                        t("upload.result.error.type.expected"),
                        t("upload.result.error.type.got"),
                        state.alert.text,
                    ].join("");

                    break;
                case "size":
                    out = `${t("upload.result.error.size")} ${state.alert.text}`;
                    break;
            }

            break;
        case "timeout":
            out = t("upload.result.timeout");
            break;
        case "success": {
            const category = t(`category.${state.response?.category?.title}`);
            out = `${t("upload.result.categoryPrefix")}: ${category.toLocaleLowerCase()}`;
            break;
        }
    }

    return out;
});
</script>

<template>
    <v-alert
        v-model="show"
        closable
        density="compact"
        :icon="success ? 'mdi-check-circle' : 'mdi-emoticon-cry'"
        :text="text ?? ''"
        :title="$vuetify.locale.t(`alert.title.${success ? 'success' : 'error'}`) + '!'"
        :type="success ? 'success' : 'error'"
        :variant="success ? 'text' : 'tonal'"
        @update:model-value="() => state.reset()"
    >
        <div v-if="success">
            <v-row>
                <v-col>
                    <div>{{ $vuetify.locale.t("upload.result.dominantColor") }}:</div>
                    <div>
                        RGB:
                        <v-btn
                            disabled
                            size="x-small"
                            :style="{
                                backgroundColor: state.response?.color_RGB ?? 'white',
                                color: state.response?.color_RGB ?? 'white',
                            }"
                        >
                            {{ state.response?.color_RGB }}
                        </v-btn>
                        {{ state.response?.color_RGB }}
                    </div>
                    <div>
                        RYB:
                        <v-btn
                            disabled
                            size="x-small"
                            :style="{
                                backgroundColor: state.response?.color_RYB ?? 'white',
                                color: state.response?.color_RYB ?? 'white',
                            }"
                        >
                            {{ state.response?.color_RYB }}
                        </v-btn>
                        {{ state.response?.color_RYB }}
                    </div>
                </v-col>
            </v-row>
            <v-row>
                <v-col>
                    <v-img
                        height="min(224px, 10rem)"
                        width="min(224px, 10rem)"
                        transition="expand-transition"
                        lazy-src="/placeholder.png"
                        :src="state.response?.link ?? '/placeholder.png'"
                    />
                </v-col>
            </v-row>
        </div>
    </v-alert>
</template>
