import type {Simplify} from "./Simplify.ts"

export type Replace<T, U> = Simplify<Omit<T, keyof U> & U>
