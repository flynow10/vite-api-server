import type { Handler } from "vite-api-server";
import { nanoid } from "nanoid";

export const handler: Handler = async (req, res, next) => {
  if (req.path === "/id") {
    res.end(nanoid());
    return;
  }
  next();
};
