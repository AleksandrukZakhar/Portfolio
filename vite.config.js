import { defineConfig } from "vite";
import viteCompression from "vite-plugin-compression";

export default defineConfig({
    plugins: [
        viteCompression({
            algorithm: "brotliCompress",
        }),
    ],
    build: {
        chunkSizeWarningLimit: 1600,
        sourcemap: true,
    },
});
