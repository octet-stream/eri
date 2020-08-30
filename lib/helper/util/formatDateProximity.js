import differenceInDays from "date-fns/differenceInCalendarDays"
import formatDistance from "date-fns/formatDistance"
import parseISO from "date-fns/parseISO"
import toDate from "date-fns/toDate"

import isString from "lodash/isString"

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
      return "Today"
    case 1:
      return "Yesterday"
    default:
      return formatDistance(date, now, {addSuffix: true})
  }
}

export default formatDateProximity
