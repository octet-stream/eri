import differenceInDays from "date-fns/differenceInCalendarDays"
import formatDistance from "date-fns/formatDistance"
import parseISO from "date-fns/parseISO"
import toDate from "date-fns/toDate"
import format from "date-fns/format"

import isString from "lodash/isString"

const pattern = "HH:mm"

/**
 * Returns human-readable distance between the Date.now() and given date
 *
 * @param {string | number | Date} date
 *
 * @return {string}
 */
function formatDateProximity(date) {
  const now = Date.now()

  if (isString(date)) {
    date = parseISO(date)
  }

  date = toDate(date)

  switch (Math.abs(differenceInDays(date, now))) {
    case 0:
      return `Today at ${format(date, pattern)}`
    case 1:
      return `Yesterday at ${format(date, pattern)}`
    default:
      return formatDistance(date, now, {addSuffix: true})
  }
}

export default formatDateProximity
