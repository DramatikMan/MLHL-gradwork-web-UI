<script setup lang="ts">
import config from "./core/config";

const imageUrl = `${config.get("BACKEND_API_URL")}/image`;

async function onUpdate(files: File[]) {
    if (files.length === 0) return;
    const data = new FormData();

    for (const file of files) {
        data.append("data", file);
    }

    const response = await fetch(imageUrl, {method: "POST", body: data});
    const respData = await response.json();
    alert(JSON.stringify(respData, null, 2));

    // const uid = respData["uid"] as number;
    // const wait = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

    // for (; ; await wait(2000)) {
    //     const result = await fetch(`${imageUrl}/${uid}`);
    //     const data = await result.json();

    //     if (data["category"] !== null) {
    //         alert(`${data["category"]}!`);
    //         return;
    //     }
    // }
}
</script>

<template>
    <v-app id="gwui">
        <v-main>
            <v-container class="fill-height">
                <v-row>
                    <v-col></v-col>
                    <v-col>
                        <v-file-input
                            accept="image/jpeg"
                            label="Image"
                            prepend-icon="mdi-camera"
                            variant="solo"
                            @update:model-value="onUpdate"
                        ></v-file-input>
                        <v-btn type="submit" block>rerender</v-btn>
                    </v-col>
                    <v-col></v-col>
                </v-row>
            </v-container>
        </v-main>
    </v-app>
</template>
