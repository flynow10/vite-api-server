import type { Handler } from "vite-api-server";
import { nanoid } from "nanoid";

export const handler: Handler = async (req, res, next) => {
  const body = req.body as object;
  if (body && "id" in body) {
    res.end(body.id);
    return;
  }
  if (req.path === "/id") {
    res.end(nanoid());
    return;
  }
  next();
};
