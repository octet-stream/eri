export type Replace<
  T extends Record<PropertyKey, any>,
  U extends Record<PropertyKey, any>
> = Omit<T, keyof U> & U
