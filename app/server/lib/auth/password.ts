import {type Options, hash as _hash, verify as _verify} from "@node-rs/argon2"

const normalize = (input: string) => input.normalize("NFKC")

const defaults: Options = {
  memoryCost: 19_456, // memory size
  timeCost: 2, // iterations
  outputLen: 32,
  parallelism: 1,
  version: 1
}

export const hash = (password: string, options?: Options) =>
  _hash(normalize(password), {...defaults, ...options})

export const verify = (hash: string, password: string, options?: Options) =>
  _verify(hash, normalize(password), {...defaults, ...options})
