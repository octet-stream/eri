import type {ObjectValues} from "./ObjectValues"
import type {ObjectKeys} from "./ObjectKeys"

export type ObjectEntries<T extends object> = [ObjectKeys<T>, ObjectValues<T>]
