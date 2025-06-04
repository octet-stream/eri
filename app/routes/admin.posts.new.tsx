import {getFormProps, getInputProps, useForm} from "@conform-to/react"
import {parseWithZod} from "@conform-to/zod"
import {getSchema} from "@tiptap/core"
import {Node} from "@tiptap/pm/model"
import type {FC} from "react"
import {Form, data, href, replace} from "react-router"

import {z} from "zod"

import {
  Breadcrumb,
  type BreadcrumbHandle
} from "../components/common/Breadcrumbs.jsx"
import {Editor} from "../components/tiptap/Editor.jsx"
import {EditorContent} from "../components/tiptap/EditorContent.jsx"
import {extensions} from "../components/tiptap/extensions.js"
import {Button} from "../components/ui/Button.jsx"

import {adminContext} from "../server/contexts/admin.js"
import {ormContext} from "../server/contexts/orm.js"
import {noopAdminLoader} from "../server/lib/admin/noopAdminLoader.server.js"
import {withAdmin} from "../server/lib/admin/withAdmin.js"
import {slugToParams} from "../server/lib/utils/slug.js"

import {Post} from "../server/db/entities.js"
import type {Route} from "./+types/admin.posts.new.js"

// TODO: Move to server/zod/post
const PostCreateInput = z
  .object({
    content: z.string()
  })
  .transform((value, ctx) => {
    const schema = getSchema(extensions)
    const nodes = Node.fromJSON(schema, JSON.parse(value.content)) // TODO: Improve and unify validation for post content
    const title = nodes.content.firstChild

    if (!title?.textContent || nodes.childCount < 2) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "Post must have title and content"
      })

      return z.NEVER
    }

    return {title, content: nodes}
  })

type IPostCreateInput = z.input<typeof PostCreateInput>

export const loader = noopAdminLoader

export const action = withAdmin(
  async ({request, context}: Route.ActionArgs) => {
    const admin = context.get(adminContext)
    const orm = context.get(ormContext)
    const submission = parseWithZod(await request.formData(), {
      schema: PostCreateInput
    })

    if (submission.status !== "success") {
      throw data(submission.reply(), 422)
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
  const [form, fields] = useForm<IPostCreateInput>({lastResult: actionData})

  return (
    <Form method="post" {...getFormProps(form)}>
      <Editor>
        <EditorContent {...getInputProps(fields.content, {type: "text"})} />
      </Editor>

      <Button>Create post</Button>
    </Form>
  )
}

export default Tiptap
