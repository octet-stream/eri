import type {NextApiHandler} from "next"
import {z} from "zod"

import isString from "lodash/isString"

import {RevalidateParams} from "server/lib/util/legacyRevalidate"

const Response = z.object({ok: z.literal(true)})

const handler: NextApiHandler<z.output<typeof Response>> = async (req, res) => {
  const {path} = await RevalidateParams.parseAsync({
    path: isString(req.query.path)
      ? decodeURIComponent(req.query.path)
      : undefined
  })

  await res.revalidate(path, {unstable_onlyGenerated: true})

  res.json(await Response.parseAsync({ok: true}))
}

export default handler
