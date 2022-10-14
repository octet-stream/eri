import {useRouter} from "next/router"
import {useMemo} from "react"
import type {FC} from "react"

import {urlDirname} from "lib/util/urlDirname"

import {EditPostMenu} from "component/Menu/EditPostMenu"

import {PostHeader} from "./PostHeader"

export const PostEditHeader: FC = () => {
  const {asPath} = useRouter()

  const url = useMemo(() => urlDirname(asPath), [asPath])

  return (
    <PostHeader
      menu={<EditPostMenu />}
      backButtonUrl={url}
      backButtonText="← Back to post"
    />
  )
}
