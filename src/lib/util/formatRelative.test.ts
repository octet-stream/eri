import test from "ava"

import {
  format,
  subDays,
  subMinutes,
  subMonths,
  subYears,
  addDays,
  setDay,
  set,
  sub
} from "date-fns"

import {formatRelative, LAST_WEEK_FORMAT, DATETIME_FORMAT} from "./formatRelative"
import {formatTime} from "./formatTime"

const relative = new Intl.RelativeTimeFormat("en", {
  style: "long"
})

test("Formats todays date", t => {
  const date = new Date()
  const expected = "Less than a minute ago"

  const actual = formatRelative(date)

  t.is(actual, expected)
})

test("Formats date distance more than a minnute ago", t => {
  const date = set(new Date(), {hours: 14})
  const input = sub(date, {minutes: 2})

  const expected = relative.format(-2, "minute")
  const actual = formatRelative(input, date)

  t.is(actual, expected)
})

test("Formats date distance more than an hour ago", t => {
  const date = set(new Date(), {hours: 14})
  const input = sub(date, {hours: 2})

  const expected = relative.format(-2, "hour")
  const actual = formatRelative(input, date)

  t.is(actual, expected)
})

test("Formats yesterday date", t => {
  const date = set(setDay(new Date(), 3), {hours: 14})
  const input = sub(date, {days: 1})

  const expected = `Yesterday at ${formatTime(input)}`
  const actual = formatRelative(input, date)

  t.is(actual, expected)
})

test("Formats yesterday date when time is 00:00 and input is 23:59", t => {
  const date = set(setDay(new Date(), 3), {
    hours: 0,
    minutes: 0,
    seconds: 0,
    milliseconds: 0
  })

  const input = subMinutes(date, 1)

  const expected = `Yesterday at ${formatTime(input)}`
  const actual = formatRelative(input, date)

  t.is(actual, expected)
})

test("Formats yesterday date relative to last week day", t => {
  const date = setDay(new Date(), 0)
  const input = sub(date, {days: 1})

  const expected = `Yesterday at ${formatTime(input)}`
  const actual = formatRelative(input, date)

  t.is(actual, expected)
})

test("Formats last week date", t => {
  const date = setDay(new Date(), 1)
  const input = subDays(date, 3)

  const expected = format(input, LAST_WEEK_FORMAT)
  const actual = formatRelative(input, date)

  t.is(actual, expected)
})

test(
  "Formats last week date if relative date is -2 days before "
    + "and input date is at the start of the week",

  t => {
    const date = setDay(new Date(), 0)
    const input = subDays(date, 2)

    const expected = format(input, LAST_WEEK_FORMAT)
    const actual = formatRelative(input, date)

    t.is(actual, expected)
  }
)

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
  const date = set(new Date(), {hours: 14})
  const input = addDays(date, 1)

  const trap = () => formatRelative(input, date)

  t.throws(trap, {
    instanceOf: RangeError,
    message: "Cannot use with the future date."
  })
})
