/* eslint-disable @typescript-eslint/indent */

import {createPlugins} from "@udecode/plate-core"

import type {Value, Editor} from "lib/type/Editor"

import {blockquote} from "./plugin/blockquote"
import {autoformat} from "./plugin/autoformat"
import {alignment} from "./plugin/alignment"
import {softBreak} from "./plugin/softBreak"
import {paragraph} from "./plugin/paragraph"
import {headings} from "./plugin/headings"
import {reset} from "./plugin/reset"
import {marks} from "./plugin/marks"
import {link} from "./plugin/link"
import {code} from "./plugin/code"
import {id} from "./plugin/id"

export const plugins = createPlugins<Value, Editor>([
  ...paragraph,
  ...marks,
  ...link,
  ...headings,
  ...code,
  ...blockquote,
  ...autoformat,
  ...alignment,
  ...softBreak,
  ...reset,
  ...id
])
