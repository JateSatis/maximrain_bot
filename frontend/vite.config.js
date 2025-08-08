import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vite.dev/config/
export default defineConfig({
  base: "/mini-app/", // ← This is critical
  build: {
    outDir: "dist",
  },
  plugins: [react()],
});
