import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  //Configurar variable de entorno
  define: {
    "process.env": {
      API_URL: "http://127.0.0.1:3002/",
    },
  },
});
