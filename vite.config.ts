import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  build: {
    sourcemap: true, // Importante para debugging
  },
  server: {
    port: 5173, // Porta padrão do Vite
    open: true,
  },
});
