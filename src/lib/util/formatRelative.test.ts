import test from "ava"

import {
  format,
  subDays,
  subMonths,
  subYears,
  addDays,
  setDay
} from "date-fns"

import {formatRelative, DATETIME_FORMAT} from "./formatRelative"
import {formatTime, TIME_FORMAT} from "./formatTime"

const relative = new Intl.RelativeTimeFormat("en", {
  style: "long"
})

test("Formats todays date", t => {
  const date = new Date()
  const expected = "Less than a minute ago"

  const actual = formatRelative(date)

  t.is(actual, expected)
})

test("Formats yesterday date", t => {
  const date = subDays(Date.now(), 1)
  const expected = `Yesterday at ${formatTime(date)}`

  const actual = formatRelative(date)

  t.is(actual, expected)
})

test("Formats last week's date", t => {
  const date = setDay(Date.now(), 1)
  const input = subDays(date, 3)

  const expected = format(input, `'Last' EEEE 'at' ${TIME_FORMAT}`)
  const actual = formatRelative(input, date)

  t.is(actual, expected)
})

test("Formats relative days when daysDiff > 1", t => {
  const date = setDay(Date.now(), 4)
  const input = subDays(date, 2)

  const expected = relative.format(-2, "day")
  const actual = formatRelative(input, date)

  t.is(actual, expected)
})

test("Formats relative months when monthsDiff between 1 and 12", t => {
  const date = subMonths(Date.now(), 4)
  const expected = relative.format(-4, "month")

  const actual = formatRelative(date)

  t.is(actual, expected)
})

test("Formats relative years when monthDiff >= 12", t => {
  const date = subYears(Date.now(), 1)
  const expected = relative.format(-1, "year")

  const actual = formatRelative(date)

  t.is(actual, expected)
})

test("Formats date when yearsDiff > 10", t => {
  const date = subYears(Date.now(), 11)
  const expected = format(date, DATETIME_FORMAT)

  const actual = formatRelative(date)

  t.is(actual, expected)
})

test("Throws an error when given date is a future date", t => {
  const date = addDays(Date.now(), 1)

  const trap = () => formatRelative(date)

  t.throws(trap, {
    instanceOf: RangeError,
    message: "Cannot use with the future date."
  })
})
