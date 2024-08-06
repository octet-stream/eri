import {
  type ActionFunctionArgs,
  type MetaFunction,
  redirect
} from "@remix-run/node"
import type {FC} from "react"

import {
  PostCreateInput,
  type IPostCreateInput
} from "../server/zod/post/PostCreateInput.js"

import {PostFooter} from "../components/post-editor/PostFooter.jsx"
import {PostEditor} from "../components/post-editor/PostEditor.jsx"
import {PostEditorTitle} from "../components/post-editor/PostEditorTitle.jsx"
import {ContentEditor} from "../components/post-editor/PostEditorContent.jsx"
import type {BreadcrumbHandle} from "../components/common/Breadcrumbs.jsx"
import {Breadcrumb} from "../components/common/Breadcrumbs.jsx"
import {Button} from "../components/ui/Button.jsx"

import {withTrpc} from "../server/trpc/withTrpc.js"

export const action = withTrpc(async (trpc, {request}: ActionFunctionArgs) => {
  const input = Object.fromEntries(await request.formData()) as IPostCreateInput
  const post = await trpc.admin.posts.create(input)

  return redirect(`/admin/posts/${post.slug}`)
})

export const meta: MetaFunction = () => [
  {
    title: "New post"
  }
]

export const handle: BreadcrumbHandle = {
  breadcrumb: () => <Breadcrumb>New post</Breadcrumb>
}

const AdminPostNewPage: FC = () => (
  <PostEditor schema={PostCreateInput} method="post">
    <PostEditorTitle />

    <ContentEditor />

    <PostFooter>
      <Button type="submit">Save</Button>
    </PostFooter>
  </PostEditor>
)

export default AdminPostNewPage
