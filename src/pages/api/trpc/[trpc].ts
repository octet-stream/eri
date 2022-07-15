import {createNextApiHandler} from "@trpc/server/adapters/next"

import {createContext} from "server/trpc/context"
import {router} from "server/trpc/route"

export default createNextApiHandler({router, createContext})
