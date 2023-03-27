import type {FC} from "react"

import type {OPostOutput} from "server/trpc/type/output/PostOutput"

import {usePageData} from "lib/hook/usePageData"

import {H1} from "component/Heading"

// TODO: Make one universal component for editor and view
export const PostTitle: FC = () => {
  const {title} = usePageData<OPostOutput>()

  return (
    <H1 className="mb-0">
      {title}
    </H1>
  )
}
