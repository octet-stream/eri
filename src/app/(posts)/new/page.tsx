import type {Metadata} from "next"

import type {AFC} from "lib/type/AsyncFunctionComponent"
import {OUserOutput} from "server/trpc/type/output/UserOutput"
import {getSession} from "lib/util/getSession"

import {Editor} from "./_/component/Editor"

export const dynamic = "force-dynamic"

export const metadata: Metadata = {
  title: {
    absolute: "Untitled"
  }
}

const PostNewPage: AFC = async () => {
  const session = await getSession("/auth/login")

  return (
    <Editor
      author={session!.user as Pick<OUserOutput, "login">}
    />
  )
}

export default PostNewPage
