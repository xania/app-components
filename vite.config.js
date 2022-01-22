import { defineConfig } from "vite";

export default defineConfig({
  server: {
    https: true,
    proxy: {
      "/api": {
        target: "http://localhost:7071",
        changeOrigin: true,
      },
    },
  },
});
