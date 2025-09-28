import {format} from "date-fns"

import type {RawDate} from "../types/RawDate.ts"

export const POST_DATE_PATTERN = "MMMM do, y"

export const formatPostDate = (date: RawDate): string =>
  format(date, POST_DATE_PATTERN)
