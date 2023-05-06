"use client"

import type {FC} from "react"
import {useMemo} from "react"

import {useIsomorphicFormatRelative} from "lib/hook/useIsomorphicFormatRelative"
import {usePostData} from "context/PostDataContext"

import {PostInfo} from "component/PostInfo"

export const PostDetails: FC = () => {
  const {createdAt, author} = usePostData()

  const date = useIsomorphicFormatRelative(createdAt)

  const postInfo = useMemo<string>(
    () => [date, `by @${author.login}`].join(" "),

    [author.login, date]
  )

  return (
    <div>
      <PostInfo>
        {postInfo}
      </PostInfo>
    </div>
  )
}
