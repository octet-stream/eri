import type {z} from "zod"

import type {DefaultPageOutput} from "./createPageOutput.js"
import type {DefaultPageInput} from "./createPageInput.js"

import {parsePageInput} from "./parsePageInput.js"
import {parsePageOutput} from "./parsePageOutput.js"

export const createPage = <
  TInputSchema extends typeof DefaultPageInput,
  TOutputSchema extends typeof DefaultPageOutput
>(schemas: {
  input: TInputSchema
  output: TOutputSchema
}): {
  parse(input: z.input<TInputSchema>): {
    params: z.output<TInputSchema>
    reply(input: Omit<z.input<TOutputSchema>, "args">): z.output<TOutputSchema>
  }
  parseAsync(input: z.input<TInputSchema>): Promise<{
    params: z.output<TInputSchema>
    reply(
      input: Omit<z.input<TOutputSchema>, "args">
    ): Promise<z.output<TOutputSchema>>
  }>
} => ({
  parse: input => {
    const params = parsePageInput(schemas.input, input)

    return {
      params,
      reply: input =>
        parsePageOutput(schemas.output, {...input, args: params.args})
    }
  },
  parseAsync: async input => {
    const params = await parsePageInput(schemas.input, input, {async: true})
    return {
      params,
      reply: input =>
        parsePageOutput(
          schemas.output,

          {
            ...input,

            args: params.args
          },

          {
            async: true
          }
        )
    }
  }
})
