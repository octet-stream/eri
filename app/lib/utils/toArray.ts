/**
 * Converts a `value` to array. If the `value` *is* array, then the copy of that array is returned
 */
export const toArray = <TValue>(value: TValue | TValue[]): TValue[] =>
  Array.isArray(value) ? value.slice() : [value]
