<script setup lang="ts">
import {ref} from "vue";

import {color} from "😺/core/config";
import * as store from "😺/core/store/Browse";

const state = store.use();
const dialog = ref(false);
const clear = () => state.setRequestColor(null);
</script>

<template>
    <v-row no-gutters justify="center">
        <v-col cols="12">
            <v-btn-group style="width: 100%" divided>
                <v-btn
                    :key="state.request.color ?? 'default'"
                    disabled
                    :style="{'background-color': state.request.color ?? 'default', width: '20%'}"
                />
                <v-btn style="width: 40%" @click.prevent="clear">
                    {{ $vuetify.locale.t("$vuetify.input.clear") }}
                </v-btn>
                <v-btn style="width: 40%">
                    {{ $vuetify.locale.t("$vuetify.update") }}
                    <v-dialog
                        v-model="dialog"
                        activator="parent"
                        transition="dialog-top-transition"
                    >
                        <div class="gwui-color-dialog">
                            <v-card>
                                <v-card-text>
                                    <v-row justify="center">
                                        <v-col cols="12" class="gwui-grid-h-centered">
                                            <v-color-picker
                                                v-model="state.request.color"
                                                border
                                                rounded
                                                hide-canvas
                                                hide-inputs
                                                hide-sliders
                                                show-swatches
                                                swatches-max-height="300"
                                                :swatches="[color.options[state.request.palette]]"
                                            />
                                        </v-col>
                                        <v-col cols="12" class="gwui-grid-h-centered">
                                            <v-btn-group border style="width: 50%">
                                                <v-btn
                                                    color="error"
                                                    width="50%"
                                                    @click.prevent="clear"
                                                >
                                                    {{ $vuetify.locale.t("$vuetify.input.clear") }}
                                                </v-btn>
                                                <v-btn
                                                    color="primary"
                                                    width="50%"
                                                    @click.prevent="() => (dialog = false)"
                                                >
                                                    OK
                                                </v-btn>
                                            </v-btn-group>
                                        </v-col>
                                    </v-row>
                                </v-card-text>
                            </v-card>
                        </div>
                    </v-dialog>
                </v-btn>
            </v-btn-group>
        </v-col>
        <v-col cols="11">
            <div class="v-input__details v-messages v-messages__message">
                {{ $vuetify.locale.t("browse.params.color.hint") }}
            </div>
        </v-col>
    </v-row>
</template>

<style scoped>
div.gwui-color-dialog {
    display: grid;
    justify-items: center;
    align-items: center;
}
</style>
