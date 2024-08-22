import {z} from "zod"

export const DatabaseUserName = z.string().min(1, "User name required")
