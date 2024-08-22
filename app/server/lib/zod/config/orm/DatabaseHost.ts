import {z} from "zod"

export const DatabaseHost = z.string().default("localhost") // TODO: Improve host validation
