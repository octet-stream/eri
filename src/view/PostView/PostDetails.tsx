import type {FC} from "react"
import {useMemo} from "react"

import type {TPostOutput} from "server/trpc/type/output/PostOutput"

import {formatRelative} from "lib/util/formatRelative"
import {usePageData} from "lib/hook/usePageData"

import {PostInfo} from "component/PostInfo"

export const PostDetails: FC = () => {
  const {createdAt, author} = usePageData<TPostOutput>()

  const postInfo = useMemo<string>(
    () => [
      formatRelative(createdAt),

      `by @${author.login}`
    ].join(" "),

    [createdAt, author.login]
  )

  return (
    <div>
      <PostInfo>
        {postInfo}
      </PostInfo>
    </div>
  )
}
