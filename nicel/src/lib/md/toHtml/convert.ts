import {expose} from "threads"

import html from "remark-html"
import remark from "remark"

const md = remark().use(html, {sanitize: true})

const convert = (content: string) => md.process(content)

expose(convert)
