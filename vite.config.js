import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";

// https://vitejs.dev/config/
export default defineConfig({
  server: { proxy: { "/api": "http://localhost:8080/" } },
  // base: "/slack-note-v2",
  plugins: [react()],
});
