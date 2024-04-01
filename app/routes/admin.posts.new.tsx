import {json, type ActionFunction, MetaFunction} from "@remix-run/node"
import {performMutation} from "remix-forms"
import type {FC} from "react"

import {mutations} from "../server/mutations.js"
import {lucia} from "../server/lib/auth/lucia.js"
import {PostCreateInput} from "../server/zod/post/PostCreateInput.js"
import {parseCookie, serializeCookie} from "../server/lib/auth/cookie.js"

import type {BreadcrumbHandle} from "../components/Breadcrumbs.js"
import {PlateEditor} from "../components/editors/PostEditor.js"
import {BreadcrumbPage} from "../components/ui/Breadcrumb.js"
import {Input} from "../components/ui/Input.js"

export const action: ActionFunction = async ({request}) => {
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

  return json(result, {
    headers
  })
}

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

// TODO: Add plate editor for content
const AdminPostNewPage: FC = () => (
  <div className="flex flex-col flex-1 gap-4">
    <Input name="title" placeholder="Post title" />

    <PlateEditor />
  </div>
)

export default AdminPostNewPage
