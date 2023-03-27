import {useMemo} from "react"

import format from "date-fns/format"

import type {RawDate} from "lib/type/RawDate"
import {normalizeDate} from "lib/util/normalizeDate"
import {formatRelative, DATE_FORMAT} from "lib/util/formatRelative"

export const useIsomorphicFormatRelative = (date: RawDate): string => useMemo(
  () => typeof window === "undefined"
    ? format(normalizeDate(date), DATE_FORMAT)
    : formatRelative(date),

  [date]
)
