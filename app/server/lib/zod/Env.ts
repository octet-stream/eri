import type {z} from "zod"

import {NodeEnv} from "./common/NodeEnv.js"

export const Env = NodeEnv.default("development")

export type IEnv = z.input<typeof Env>

export type OEnv = z.output<typeof Env>
