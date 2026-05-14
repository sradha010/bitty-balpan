import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { TanStackRouterVite } from "@tanstack/router-plugin/vite";
import path from "path";

export default defineConfig({
  plugins: [
    TanStackRouterVite(),
    react(),
  ],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  // Ensures Vite preview server (vite preview) also acts as SPA
  // This matches what vercel.json does on the CDN side
  preview: {
    // fallback to index.html for all 404s in preview mode
    port: 4173,
  },
});