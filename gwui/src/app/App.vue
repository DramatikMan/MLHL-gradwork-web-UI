<script setup lang="ts">
import {useRoute, useRouter} from "vue-router";

import {Browse, Upload} from "😺/component";
import * as store from "😺/core/store";
import Layout from "./Layout.vue";

const props = defineProps<{tab?: store.types.Tab}>();
const state = store.use();
const currentRoute = useRoute();
const router = useRouter();

if (props.tab !== undefined) {
    if (currentRoute.fullPath === "/") router.push("/browse");
    state.setTab(props.tab);
}

const tabs = {Browse, Upload};
</script>

<template>
    <v-app id="gwui">
        <Layout>
            <div v-if="state.tab === null">
                <v-row justify="center">
                    <v-col cols="12" class="gwui-grid-h-centered">
                        <v-alert
                            :title="$vuetify.locale.t('$vuetify.pageNotFound')"
                            type="warning"
                            variant="text"
                        />
                    </v-col>
                    <v-col cols="12" class="gwui-grid-h-centered">
                        <v-img src="/placeholder.png" style="width: clamp(75px, 15svw, 200px)" />
                    </v-col>
                </v-row>
            </div>
            <div v-else>
                <component :is="tabs[state.tab]" />
            </div>
        </Layout>
    </v-app>
</template>
