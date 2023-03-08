import {SlateView} from "slate-to-react"
import type {FC} from "react"

import type {TPostOutput} from "server/trpc/type/output/PostOutput"

import {usePageData} from "lib/hook/usePageData"

import {Link} from "./element/Link"

export const PostContent: FC = () => {
  const {content} = usePageData<TPostOutput>()

  return (
    <div className="flex-1">
      <SlateView nodes={content} transforms={{elements: [Link]}} />
    </div>
  )
}
