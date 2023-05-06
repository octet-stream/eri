import {generateEmptyStaticParams} from "./generateEmptyStaticParams"

interface Options {
  params?: object
}

interface GenerateStaticParams<
  TParams extends object,
  TOptions extends Options = {}
> {
  (options: TOptions): Promise<TParams[]>
}

/**
 * Takes `generateStaticParams` implementation, returns `generateEmptyStaticParams` for non-production envs because `generateStaticParams` causes MikroORM initialization on every page load.
 */
export function patchStaticParams<
  TParams extends object,
  TOptions extends Options = {}
>(
  generateStaticParams: GenerateStaticParams<TParams, TOptions>
) {
  if (process.env.NODE_ENV === "production") {
    return generateStaticParams
  }

  return generateEmptyStaticParams
}
