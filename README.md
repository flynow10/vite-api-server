# vite-api-server

[![npm version](https://badgen.net/npm/v/vite-api-server)](https://npm.im/vite-api-server)

## Motivation

Writing front-end and back-end API in a single project allows faster development (imo), this plugin essentially brings Next.js' API routes to your Vite app.

## Install

```bash
npm i vite-api-server -D
```

```bash
yarn add --dev vite-api-server
```

## Usage

`vite.config.ts`:

```ts
import { defineConfig } from "vite";
import { apiServer } from "vite-api-server";

export default defineConfig({
  plugins: [
    apiServer({
      handler: "./handler.ts",
    }),
  ],
});
```

`handler.ts`:

```ts
import type { Handler } from "vite-api-server";

export const handler: Handler = (req, res, next) => {
  if (req.path === "/hello") {
    return res.end("hello");
  }
  next();
};
```

The `handler` runs before serving static files, so you should make sure to call `next()` as a fallback. You can also use express-compatible middlewares in the handler.

To start developing, run the command `vite` as usual.

To create a production build, run the command `vite build` as usual.

Now `vite build` will create a server build to `./build` folder alongside your regular client build which is the `./dist` folder by default. To run the production build as a Node.js server, run `node build/server.mjs` or if you have `"type": "module"` in your `package.json`, run `node build/server.js` instead.

### Middleware

`vite.config.ts`:

```ts
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
```

The optional `middleware` argument can be used to include extra request transformation layers, like a body parser.

### Request flow

<img src="https://user-images.githubusercontent.com/8784712/116026214-d424af80-a684-11eb-9126-b188d7976be2.png" width="300" alt="request flow">

## Adapters

### Node.js

By default the server is built for Node.js target, you can run `node build/server.mjs` or `node build/server.js` after `vite build` to start the production server.

By default the server runs at port `3000`, you can switch to a custom port by using the `PORT` environment variable.

### Vercel

> **Warning**
>
> This may not work with some packages in a monorepo when using pnpm.

To build for [Vercel](https://vercel.com), use the `vercelAdapter` in `vite.config.ts`:

```ts
import { defineConfig } from "vite";
import { apiServer, vercelAdapter } from "vite-api-server";

export default defineConfig({
  plugins: [
    apiServer({
      handler: "./handler.ts",
      adapter: vercelAdapter(),
    }),
  ],
});
```

Then you can run `vite build` to build for Vercel.

## Guide

### Using Express

```ts
import express from "express";

const app = express();

export const handler = app;
```

### Using Polka

```ts
import polka from "polka";

export const handler = (req, res, next) => {
  const app = polka({
    onNoMatch: () => next(),
  });

  return app.handler(req, res);
};
```

### Using Apollo GraphQL

```ts
import { ApolloServer } from "apollo-server-micro";
import { typeDefs } from "./schemas";
import { resolvers } from "./resolvers";

const apolloServer = new ApolloServer({ typeDefs, resolvers });

const GRAPHQL_ENDPOINT = "/api/graphql";

const apolloHandler = apolloServer.createHandler({ path: GRAPHQL_ENDPOINT });

export const handler = (req, res, next) => {
  if (req.path === "/api/graphql") {
    return apolloHandler;
  }
  next();
};
```

You can also use `express` + `apollo-server-express` if you want.

## License

MIT &copy; [EGOIST](https://github.com/sponsors/egoist)
