import { defineConfig } from "vite";
import { apiServer, vercelAdapter } from "vite-api-server";
import bodyParser from "body-parser";

export default defineConfig({
  plugins: [
    apiServer({
      handler: "./handler.ts",
      adapter: vercelAdapter(),
      middleware: [bodyParser.json()],
    }),
  ],
});
