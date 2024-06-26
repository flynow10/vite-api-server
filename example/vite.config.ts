import { defineConfig } from "vite";
import { apiServer } from "vite-api-server";
import bodyParser from "body-parser";

export default defineConfig({
  plugins: [
    apiServer({
      handler: "./handler.ts",
      middleware: [bodyParser.json()],
    }),
  ],
});
