import {serveStatic} from "@hono/node-server/serve-static"
import {logger} from "hono/logger"
import {Hono} from "hono"

import {remix} from "./middlewares/remix.js"

const prod = process.env.NODE_ENV === "production"

export const hono = new Hono()
  .use("/assets/*", serveStatic({root: "./build/client"}))
  .use("*", serveStatic({root: prod ? "./build/client" : "./public"}))
  .use("*", logger())
  .use("*", remix())
