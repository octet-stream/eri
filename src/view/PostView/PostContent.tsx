import {SlateView} from "slate-to-react"
import type {FC} from "react"

import type {OPostOutput} from "server/trpc/type/output/PostOutput"

import {usePageData} from "lib/hook/usePageData"

import {Link} from "./element/Link"
import {Heading} from "./element/Heading"
import {Paragraph} from "./element/Paragraph"

export const PostContent: FC = () => {
  const {content} = usePageData<OPostOutput>()

  return (
    <div className="flex-1">
      <SlateView
        nodes={content}
        transforms={{elements: [Link, Paragraph, Heading]}}
      />
    </div>
  )
}
