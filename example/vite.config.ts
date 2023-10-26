import { defineConfig } from "vite";
import { apiServer, vercelAdapter } from "vite-api-server";

export default defineConfig({
  plugins: [apiServer({ handler: "./handler.ts", adapter: vercelAdapter() })],
});
