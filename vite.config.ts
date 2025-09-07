import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import tailwindcss from "tailwindcss";
import sitemap from "vite-plugin-sitemap";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    sitemap({
      hostname: "https://www.vbedigital.com",
      dynamicRoutes: ["/", "/privacy-policy", "/terms-of-service"],
      robots: [{ userAgent: "*", allow: "/" }],
    }),
  ],
  css: {
    postcss: {
      plugins: [tailwindcss()],
    },
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
});
