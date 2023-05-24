import type {NextApiHandler} from "next"
import {z, ZodIssueCode} from "zod"

import isURL from "validator/lib/isURL"

import {serverAddress} from "lib/util/serverAddress"

const Query = z.object({
  url: z.string().superRefine((value, ctx) => {
    if (isURL(new URL(value, serverAddress).href)) {
      ctx.addIssue({
        code: ZodIssueCode.invalid_string,
        validation: "url",
        message: "Invalid URL"
      })
    }
  })
})

const Response = z.object({ok: z.literal(true)})

const handler: NextApiHandler<z.output<typeof Response>> = async (req, res) => {
  const {url} = await Query.parseAsync(req.query)

  await res.revalidate(new URL(url).pathname, {unstable_onlyGenerated: true})

  res.json(await Response.parseAsync({ok: true}))
}

export default handler
