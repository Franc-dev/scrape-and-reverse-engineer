import tailwindcss from "@tailwindcss/vite";
import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";

export default defineConfig({
  plugins: [react(), tailwindcss()],
  server: {
    host: "0.0.0.0",
    port: 3000,
    strictPort: true,
    allowedHosts: true,
    // Bind mounts from Windows/macOS hosts don't deliver file events reliably.
    watch: { usePolling: true, interval: 300 },
    proxy: { "/api": "http://localhost:8001" },
  },
});
