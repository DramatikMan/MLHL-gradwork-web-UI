import {defineConfig} from "vite";
import vue from "@vitejs/plugin-vue";
import eslintPlugin from "vite-plugin-eslint";
import path from "path";

// https://vitejs.dev/config/
export default defineConfig({
    root: "app",
    assetsInclude: ["public"],
    server: {host: "0.0.0.0", port: 3005},
    build: {
        outDir: "../build",
        emptyOutDir: true,
    },
    esbuild: {
        drop: ["console"],
    },
    resolve: {
        alias: {"~": path.resolve(__dirname, "app/src")},
    },
    plugins: [
        vue(),
        eslintPlugin({
            failOnWarning: true,
        }),
    ],
});
