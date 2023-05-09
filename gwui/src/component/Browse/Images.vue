<script setup lang="ts">
const props = defineProps<{links: string[]}>();
</script>

<template>
    <v-row justify="center">
        <v-col
            v-for="link in props.links.map((v, i) => ({value: v, idx: i}))"
            :key="link.idx"
            cols="4"
        >
            <div :style="{display: 'flex'}">
                <v-img
                    height="min(224px, 10rem)"
                    width="min(224px, 10rem)"
                    transition="expand-transition"
                    lazy-src="/placeholder.png"
                    :src="link.value"
                />
            </div>
        </v-col>
    </v-row>
</template>
