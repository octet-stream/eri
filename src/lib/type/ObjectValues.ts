import type {ObjectKeys} from "./ObjectKeys"

export type ObjectValues<T extends object> = T[ObjectKeys<T>]
