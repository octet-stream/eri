import type {FC} from "react"
import {useMemo} from "react"

import type {TPostOutput} from "server/trpc/type/output/PostOutput"

import {usePageData} from "lib/hook/usePageData"
import {transformNodes} from "lib/slate-to-react"

export const PostContent: FC = () => {
  const {content} = usePageData<TPostOutput>()

  const nodes = useMemo(() => transformNodes(content), [content])

  return (
    <div className="flex-1">
      {nodes}
    </div>
  )
}
