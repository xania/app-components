import { defineConfig } from "vite";

export default defineConfig({
  server: {
    http: true,
    proxy: {
      "/api": {
        target: "http://localhost:7071",
        changeOrigin: true,
      },
    },
  },
});
