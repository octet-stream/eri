import {z} from "zod"

export const DatabaseHost = z.string().min(1).default("localhost") // TODO: Improve host validation
