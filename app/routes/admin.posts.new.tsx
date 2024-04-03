import {json, type ActionFunctionArgs, MetaFunction, redirect} from "@remix-run/node"
import {performMutation} from "remix-forms"
import type {FC} from "react"

import {mutations} from "../server/mutations.js"
import {lucia} from "../server/lib/auth/lucia.js"
import {PostCreateInput} from "../server/zod/post/PostCreateInput.js"
import {parseCookie, serializeCookie} from "../server/lib/auth/cookie.js"
import {withOrm} from "../server/lib/db/orm.js"

import {PostEditorTitle} from "../components/editors/post/PostEditorTitle.jsx"
import {ContentEditor} from "../components/editors/post/PostEditorContent.jsx"
import {PostEditor} from "../components/editors/post/PostEditor.jsx"
import type {BreadcrumbHandle} from "../components/common/Breadcrumbs.jsx"
import {BreadcrumbPage} from "../components/ui/Breadcrumb.js"
import {Button} from "../components/ui/Button.jsx"

export const action = withOrm(async (_, {request}: ActionFunctionArgs) => {
  if (request.method.toLowerCase() !== "post") {
    throw new Response(null, {
      status: 405
    })
  }

  const sessionId = await parseCookie(request.headers.get("cookie"))

  if (!sessionId) {
    throw new Response(null, {
      status: 401
    })
  }

  // Not sure if that's the right way to implement sessions
  const {user, session} = await lucia.validateSession(sessionId)

  if (!(user || session)) {
    throw new Response(null, {
      status: 401
    })
  }

  const headers = new Headers()

  if (session.fresh) {
    headers.set("set-cookie", await serializeCookie(session.id))
  }

  const result = await performMutation({
    request,
    schema: PostCreateInput,
    mutation: mutations.admin.posts.create,
    environment: {
      user
    }
  })

  if (result.success) {
    return redirect(`/admin/posts/${result.data.slug}`)
  }

  return json(result, {
    headers
  })
})

export const meta: MetaFunction = () => [
  {
    title: "New post"
  }
]

export const handle: BreadcrumbHandle = {
  breadcrumb: () => (
    <BreadcrumbPage>
      New post
    </BreadcrumbPage>
  )
}

const AdminPostNewPage: FC = () => (
  <PostEditor schema={PostCreateInput} method="post">
    <PostEditorTitle />

    <ContentEditor />

    <div>
      <Button type="submit">Save</Button>
    </div>
  </PostEditor>
)

export default AdminPostNewPage
