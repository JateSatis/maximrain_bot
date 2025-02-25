import { defineConfig } from "vite";

export default defineConfig({
  // Production-specific optimizations
  build: {
    outDir: "dist", // Output directory
    minify: "esbuild", // Use esbuild for fast and optimized minification
    sourcemap: false, // Disable sourcemaps in production
    target: "node22", // Optimize for modern browsers/Node.js environments
    ssr: true,
    manifest: true,
    rollupOptions: {
      input: "./src/index.ts", // Specify your server entry point
      output: {
        entryFileNames: "[name].js", // Output main entry as [name].js
        format: "cjs", // Use CommonJS format for Node.js compatibility
      },
    },
  },
});
