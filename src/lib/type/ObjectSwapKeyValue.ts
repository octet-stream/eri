export type ObjectSwapKeyValue<T extends object> = {
  // @ts-expect-error
  [K in keyof T as T[K]]: K
}
