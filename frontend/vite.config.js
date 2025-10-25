import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  test: {
    globals: true,
    environment: "jsdom", // 👈 this line makes Vitest simulate the browser DOM
    setupFiles: "./src/setupTests.jsx",
    pool: "threads", // helps on Windows
  },
});
