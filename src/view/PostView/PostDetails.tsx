import type {FC} from "react"
import {useMemo} from "react"

import {formatRelative} from "lib/util/formatRelative"
import {usePostData} from "context/PostDataContext"

import {PostInfo} from "component/PostInfo"

export const PostDetails: FC = () => {
  const {createdAt, author} = usePostData()

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
