<script setup lang="ts">
import {computed, ref} from "vue";
// @ts-expect-error vue-cropperjs has no typings
import VueCropper from "vue-cropperjs";
import "cropperjs/dist/cropper.css";

import * as store from "😺/core/store/Upload";

const props = defineProps<{file: File | null; predict: (file: File) => Promise<void>}>();

const state = store.use();
const cropper = ref<null | object>(null);

const src = computed(() => {
    const file = props.file;
    if (file === null) return "";
    return URL.createObjectURL(file);
});

async function crop() {
    const value = cropper.value;
    if (value === null) return;

    value
        // @ts-expect-error vue-cropperjs has no typings
        .getCroppedCanvas()
        .toBlob((blob: Blob) => {
            const file = new File([blob], "image.png", {type: "image/png"});
            props.predict(file);
            state.setResizing(false);
        });
}

function rotate(d: number) {
    const value = cropper.value;
    if (value === null) return;
    // @ts-expect-error vue-cropperjs has no typings
    value.rotate(d);
}

function zoom(percent: number) {
    const value = cropper.value;
    if (value === null) return;
    // @ts-expect-error vue-cropperjs has no typings
    value.relativeZoom(percent);
}

function move(offsetX: number, offsetY: number) {
    const value = cropper.value;
    if (value === null) return;
    // @ts-expect-error vue-cropperjs has no typings
    value.move(offsetX, offsetY);
}
</script>

<template>
    <v-dialog v-model="state.resizing">
        <div class="gwui-crop-prompt-dialog">
            <v-card>
                <v-card-text v-if="state.prompting">
                    <v-row justify="center">
                        <v-col cols="12" style="display: grid; justify-items: center">
                            <div>
                                {{
                                    state.imageIsSquare
                                        ? $vuetify.locale.t("upload.resize.prompting.isSquare")
                                        : $vuetify.locale.t("upload.resize.prompting.isNotSquare")
                                }}
                            </div>
                        </v-col>
                    </v-row>
                    <v-row justify="center">
                        <v-col cols="6" style="display: grid; justify-items: end">
                            <v-btn
                                color="primary"
                                @click.prevent="
                                    () => {
                                        state.setPrompting(false);
                                        state.setCropping(true);
                                    }
                                "
                            >
                                {{ $vuetify.locale.t("upload.resize.prompting.yes") }}
                            </v-btn>
                        </v-col>
                        <v-col cols="6" style="display: grid; justify-items: start">
                            <v-btn
                                color="error"
                                @click.prevent="
                                    () => {
                                        state.setResizing(false);
                                        const file = props.file;

                                        if (state.imageIsSquare && file !== null)
                                            props.predict(file);
                                    }
                                "
                            >
                                {{ $vuetify.locale.t("upload.resize.prompting.no") }}
                            </v-btn>
                        </v-col>
                    </v-row>
                </v-card-text>
                <v-card-text v-if="state.cropping">
                    <v-row justify="center">
                        <v-col cols="12">
                            <v-row justify="center">
                                <v-col cols="12" style="display: grid; justify-items: center">
                                    <div class="img-cropper">
                                        <vue-cropper ref="cropper" :src="src" :aspectRatio="1" />
                                    </div>
                                </v-col>
                            </v-row>
                            <v-row justify="center">
                                <v-col cols="3" style="display: grid">
                                    <v-btn color="info" @click.prevent="() => zoom(0.2)">
                                        <v-icon icon="mdi-magnify-plus-outline" size="1.5rem" />
                                    </v-btn>
                                </v-col>
                                <v-col cols="3" style="display: grid">
                                    <v-btn color="info" @click.prevent="() => zoom(-0.2)">
                                        <v-icon icon="mdi-magnify-minus-outline" size="1.5rem" />
                                    </v-btn>
                                </v-col>
                                <v-col cols="3" style="display: grid">
                                    <v-btn color="info" @click.prevent="() => rotate(-90)">
                                        <v-icon icon="mdi-arrow-u-right-bottom-bold" />
                                    </v-btn>
                                </v-col>
                                <v-col cols="3" style="display: grid">
                                    <v-btn color="info" @click.prevent="() => rotate(90)">
                                        <v-icon icon="mdi-arrow-u-left-bottom-bold" />
                                    </v-btn>
                                </v-col>
                            </v-row>
                            <v-row justify="center">
                                <v-col cols="3" style="display: grid">
                                    <v-btn color="info" @click.prevent="() => move(0, 10)">
                                        <v-icon icon="mdi-arrow-up-bold" size="1.5rem" />
                                    </v-btn>
                                </v-col>
                                <v-col cols="3" style="display: grid">
                                    <v-btn color="info" @click.prevent="() => move(0, -10)">
                                        <v-icon icon="mdi-arrow-down-bold" size="1.5rem" />
                                    </v-btn>
                                </v-col>
                                <v-col cols="3" style="display: grid">
                                    <v-btn color="info" @click.prevent="() => move(10, 0)">
                                        <v-icon icon="mdi-arrow-left-bold" size="1.5rem" />
                                    </v-btn>
                                </v-col>
                                <v-col cols="3" style="display: grid">
                                    <v-btn color="info" @click.prevent="() => move(-10, 0)">
                                        <v-icon icon="mdi-arrow-right-bold" size="1.5rem" />
                                    </v-btn>
                                </v-col>
                            </v-row>
                        </v-col>
                        <v-col cols="6" style="display: grid">
                            <v-btn color="primary" @click.prevent="crop">
                                {{ $vuetify.locale.t("upload.resize.cropping.crop") }}
                            </v-btn>
                        </v-col>
                        <v-col cols="6" style="display: grid">
                            <v-btn color="error" @click.prevent="() => state.setResizing(false)">
                                {{ $vuetify.locale.t("upload.resize.cropping.cancel") }}
                            </v-btn>
                        </v-col>
                    </v-row>
                </v-card-text>
            </v-card>
        </div>
    </v-dialog>
</template>

<style>
div.gwui-crop-prompt-dialog {
    display: grid;
    justify-items: center;
    align-items: center;
}

div.wrap-box {
    min-width: 30rem;
    min-height: 30rem;
    max-width: 30rem;
    max-height: 30rem;
}

div.cropper-bg {
    background-image: none;
}
</style>
