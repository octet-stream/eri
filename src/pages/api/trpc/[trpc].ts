import {createNextApiHandler} from "@trpc/server/adapters/next"
import type {NextApiRequest, NextApiResponse} from "next"
import {createRouter} from "next-connect"

import withORMContext from "server/middleware/withORMContext"

import {createContext} from "server/trpc/context"
import {router} from "server/trpc/route"

const chain = createRouter<NextApiRequest, NextApiResponse>()

chain
  .use(withORMContext)
  .all(createNextApiHandler({router, createContext}))

export default chain.handler()
