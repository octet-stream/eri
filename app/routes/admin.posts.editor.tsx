import {getFormProps, getInputProps, useForm} from "@conform-to/react"
import {parseWithZod} from "@conform-to/zod"
import {type JSONContent, getSchema} from "@tiptap/core"
import {Node} from "@tiptap/pm/model"
import type {FC} from "react"
import {Form, data} from "react-router"

import {z} from "zod"

import {
  Breadcrumb,
  type BreadcrumbHandle
} from "../components/common/Breadcrumbs.jsx"
import {Button} from "../components/ui/Button.jsx"

import {Editor} from "../components/tiptap/Editor.jsx"
import {EditorContent} from "../components/tiptap/EditorContent.jsx"
import {extensions} from "../components/tiptap/extensions.js"

import type {Route} from "./+types/admin.posts.editor.js"

export const meta: Route.MetaFunction = () => [
  {
    title: "New post"
  }
]

export const handle: BreadcrumbHandle = {
  breadcrumb: () => <Breadcrumb>New post</Breadcrumb>
}

const PostCreateInput = z.object({
  content: z.string()
})

export const action = async ({request}: Route.ActionArgs) => {
  const submission = parseWithZod(await request.formData(), {
    schema: PostCreateInput
  })

  if (submission.status !== "success") {
    throw data(submission.reply(), 422)
  }

  // TODO: Implement validator for content
  const content = Node.fromJSON(
    getSchema(extensions),
    JSON.parse(submission.value.content)
  )

  console.log(content)
}

const Tiptap: FC = () => {
  const [form, fields] = useForm<z.input<typeof PostCreateInput>>({})

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
