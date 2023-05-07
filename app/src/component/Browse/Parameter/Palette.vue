<script setup lang="ts">
import {color} from "😺/core/config";
import * as store from "😺/core/store/Browse";
import * as types from "😺/core/store/Browse/types";

const state = store.use();

function onUpdate(v: types.Palette) {
    state.setRequestPalette(v);
    state.setRequestColor(null);
}
</script>

<template>
    <v-row no-gutters justify="center">
        <v-col cols="12">
            <v-btn-toggle
                v-model="state.request.palette"
                style="width: 100%"
                @update:model-value="onUpdate"
            >
                <v-btn :value="color.RGB" style="width: 50%">{{ color.RGB }}</v-btn>
                <v-btn :value="color.RYB" style="width: 50%">{{ color.RYB }}</v-btn>
            </v-btn-toggle>
        </v-col>
        <v-col cols="10">
            <div class="v-input__details v-messages v-messages__message">
                {{ $vuetify.locale.t("browse.params.palette.hint") }}
            </div>
        </v-col>
    </v-row>
</template>
