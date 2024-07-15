import type {Simplify} from "./Simplify.js"

export type Replace<T, U> = Simplify<Omit<T, keyof U> & U>
