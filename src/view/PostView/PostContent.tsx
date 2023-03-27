import {SlateView} from "slate-to-react"
import type {FC} from "react"

import {usePostData} from "context/PostDataContext"

import {Link} from "./element/Link"
import {Heading} from "./element/Heading"
import {Paragraph} from "./element/Paragraph"

export const PostContent: FC = () => {
  const {content} = usePostData()

  return (
    <div className="flex-1">
      <SlateView
        nodes={content}
        transforms={{elements: [Link, Paragraph, Heading]}}
      />
    </div>
  )
}
