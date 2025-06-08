import {
  getFormProps,
  getInputProps,
  getTextareaProps,
  useForm
} from "@conform-to/react"
import {parseWithZod} from "@conform-to/zod"
import type {FC} from "react"
import {data, href, replace} from "react-router"

import {
  Breadcrumb,
  type BreadcrumbHandle
} from "../components/common/Breadcrumbs.jsx"
import {Editor} from "../components/post-editor/Editor.jsx"
import {EditorFallback} from "../components/post-editor/EditorFallback.jsx"
import {Button} from "../components/ui/Button.jsx"

import {adminContext} from "../server/contexts/admin.js"
import {ormContext} from "../server/contexts/orm.js"
import {Post} from "../server/db/entities.js"
import {noopAdminLoader} from "../server/lib/admin/noopAdminLoader.server.js"
import {withAdmin} from "../server/lib/admin/withAdmin.js"
import {slugToParams} from "../server/lib/utils/slug.js"
import {
  AdminPostInput,
  type IAdminPostInput
} from "../server/zod/admin/AdminPostInput.js"

import {EditorForm} from "../components/post-editor/EditorForm.jsx"
import type {Route} from "./+types/admin.posts.new.js"

export const loader = noopAdminLoader

export const action = withAdmin(
  async ({request, context}: Route.ActionArgs) => {
    const admin = context.get(adminContext)
    const orm = context.get(ormContext)
    const submission = parseWithZod(await request.formData(), {
      schema: AdminPostInput
    })

    if (submission.status !== "success") {
      return data(submission.reply(), 422)
    }

    const {title, content} = submission.value

    const post = orm.em.create(Post, {
      author: admin.user,
      title: title.textContent,
      content: content.toJSON()
    })

    await orm.em.persistAndFlush(post)

    throw replace(href("/admin/posts/:date/:name", slugToParams(post.slug)))
  }
)

export const meta: Route.MetaFunction = () => [
  {
    title: "New post"
  }
]

export const handle: BreadcrumbHandle = {
  breadcrumb: () => <Breadcrumb>New post</Breadcrumb>
}

const Tiptap: FC<Route.ComponentProps> = ({actionData}) => {
  const [form, fields] = useForm<IAdminPostInput>({lastResult: actionData})

  return (
    <EditorForm method="post" {...getFormProps(form)}>
      <div className="row-span-full">
        <Editor {...getInputProps(fields.content, {type: "text"})} />

        <EditorFallback {...getTextareaProps(fields.markdown)} />
      </div>

      <div>
        <Button>Create</Button>
      </div>
    </EditorForm>
  )
}

export default Tiptap
