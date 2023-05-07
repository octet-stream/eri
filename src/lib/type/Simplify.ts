export type Simplify<T extends object> = {[K in keyof T]: T[K]} & {}
