/* eslint-disable no-undef */
import test from "ava"

import {isInternalUrl} from "./isInternalUrl"

test.before(() => {
  process.env.NEXTAUTH_URL = "https://example.com"
})

test("Returns true for relative paths", t => {
  t.true(isInternalUrl("/foo/bar"))
  t.true(isInternalUrl("foo/bar"))
})

test("Returns true for internal absolute url", t => {
  t.false(isInternalUrl(`${process.env.NEXTAUTH_URL}/foo/bar`))
})

test("Returns false for internal url, but with different protocol", t => {
  t.false(isInternalUrl(
    `${process.env!.NEXTAUTH_URL.replace("https", "http")}/foo/bar`
  ))
})

test("Returns false for external absolute url", t => {
  t.false(isInternalUrl("https://external-site.com/foo/bar"))
  t.false(isInternalUrl("http://external-site.com/foo/bar"))
})
