import {serveStatic} from "@hono/node-server/serve-static"
import {logger} from "hono/logger"
import {Hono} from "hono"

import "../lib/env.js"

import {remix} from "./middlewares/remix.js"

const prod = process.env.NODE_ENV === "production"

// TODO: Add cache middleware, like this: https://github.com/rphlmr/remix-hono-vite/blob/8c5938deca9adfe22de87cb87fc6983d3ffe6e4f/server/middlewares.ts
export const hono = new Hono()
  .use("/assets/*", serveStatic({root: "./build/client"}))
  .use("*", serveStatic({root: prod ? "./build/client" : "./public"}))
  .use("*", logger())
  .use("*", remix())
