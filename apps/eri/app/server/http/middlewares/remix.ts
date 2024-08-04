import {remix as remixHono} from "remix-hono/handler"
import type {ServerBuild} from "@remix-run/node"
import {createMiddleware} from "hono/factory"

// This server is only used to load the dev server build
const viteDevServer =
  process.env.NODE_ENV === "production"
    ? undefined
    : await import("vite").then(vite =>
        vite.createServer({
          appType: "custom",
          server: {
            middlewareMode: true
          }
        })
      )

/**
 * Load the dev server build
 *
 * @returns The server build
 */
const importDevBuild = () =>
  viteDevServer?.ssrLoadModule("virtual:remix/server-build")

const importBuild = async () =>
  (process.env.NODE_ENV === "production"
    ? // @ts-ignore
      // eslint-disable-next-line import/no-unresolved, import/no-self-import
      import("./remix.js") // Ignored by eslint and ts because this file will be presented in production
    : importDevBuild()) as unknown as Promise<ServerBuild>

export const remix = () =>
  createMiddleware(async (ctx, next): Promise<void | Response> => {
    const build = await importBuild()

    const middleware = remixHono({
      // @ts-ignore
      build,
      mode: process.env.NODE_ENV as Exclude<
        NodeJS.ProcessEnv["NODE_ENV"],
        "test"
      >
    })

    return middleware(ctx, next)
  })
