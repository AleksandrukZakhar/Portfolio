import { defineConfig } from "vite";
import { viteStaticCopy } from "vite-plugin-static-copy";
import viteCompression from "vite-plugin-compression";

export default defineConfig({
    base: "/portfolio/",
    plugins: [
        viteStaticCopy({
            targets: [
                {
                    src: "./src/assets/google_pixel_6_pro/scene.gltf",
                    dest: "./assets",
                },
                {
                    src: "./src/assets/google_pixel_6_pro/scene.bin",
                    dest: "./assets",
                },
                {
                    src: "./src/assets/google_pixel_6_pro/textures/Lens_baseColor.png",
                    dest: "./assets/textures",
                },
                {
                    src: "./src/assets/google_pixel_6_pro/textures/material_baseColor.jpeg",
                    dest: "./assets/textures",
                },
                {
                    src: "./src/assets/google_pixel_6_pro/textures/Screen_baseColor.png",
                    dest: "./assets/textures",
                },
            ],
        }),
        viteCompression({
            algorithm: "brotliCompress",
        }),
    ],
    build: {
        chunkSizeWarningLimit: 1600,
    },
});
