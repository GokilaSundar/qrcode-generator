import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

import { app } from "./functions/app.js";

const proxy = {
  "/api": {},
};

function expressPlugin() {
  return {
    name: "express-plugin",
    config() {
      return {
        server: { proxy },
        preview: { proxy },
      };
    },
    configureServer(server) {
      server.middlewares.use(app);
    },
  };
}

// https://vite.dev/config/
export default defineConfig({
  plugins: [expressPlugin(), react()],
});
