import { ServerResponse, IncomingMessage } from "http";
import { ViteDevServer } from "vite";

export interface Request extends IncomingMessage {
  viteServer?: ViteDevServer;
  /**
   * The originally-requested URL, including parent router segments.
   */
  originalUrl: string;

  /**
   * The path portion of the requested URL.
   */
  path: string;

  /**
   * The values of named parameters within your route pattern
   */
  params: {
    [key: string]: string;
  };

  /**
   * The un-parsed querystring
   */
  search: string | null;

  /**
   * The parsed querystring
   */
  query: {
    [key: string]: string | string[];
  };

  /**
   * The parsed body of the request
   *
   * Note:
   * Will be undefined if a body parser is not included in the middleware list
   */
  body: unknown;
}

export type Response = ServerResponse;
export type NextFunction = (err?: Error) => void;

export type Handler = (req: Request, res: Response, next: NextFunction) => any;

export type Middleware = (
  req: IncomingMessage,
  res: ServerResponse,
  next: NextFunction
) => void;

type BuildOpts = {
  root: string;
  serverOutDir: string;
  clientOutDir: string;
};

export type Adapter = {
  name: string;

  rollupInput?: Record<string, string | string[]>;

  buildStart?: (opts: BuildOpts) => Promise<void> | void;

  buildEnd?: (opts: BuildOpts) => Promise<void> | void;
};
