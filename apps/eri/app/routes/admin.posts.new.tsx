import {useForm, getTextareaProps, getFormProps} from "@conform-to/react"
import type {ActionFunctionArgs, MetaFunction} from "@remix-run/node"
import {getZodConstraint, parseWithZod} from "@conform-to/zod"
import {redirect, useActionData} from "@remix-run/react"
import type {FC} from "react"

import {Button} from "../components/ui/Button.jsx"
import {Breadcrumb} from "../components/common/Breadcrumbs.jsx"
import {PostCreateInput} from "../server/zod/post/PostCreateInput.js"
import type {BreadcrumbHandle} from "../components/common/Breadcrumbs.jsx"
import {ClientPostCreateInput} from "../server/zod/post/ClientPostCreateInput.js"

import {PostEditorContent} from "../components/post-editor/PostEditorContent.jsx"
import {PostEditorTitle} from "../components/post-editor/PostEditorTitle.jsx"
import {PostEditor} from "../components/post-editor/PostEditor.jsx"

import {Post} from "../server/db/entities.js"

export const action = async ({
  request,
  context: {auth, orm}
}: ActionFunctionArgs) => {
  const {user} = auth.getAuthContext()

  const submission = await parseWithZod(await request.formData(), {
    schema: PostCreateInput,
    async: true
  })

  if (submission.status !== "success") {
    return submission.reply()
  }

  const post = new Post({...submission.value, author: user})

  await orm.em.persistAndFlush(post)

  return redirect(`/admin/posts/${post.slug}`)
}

export const meta: MetaFunction = () => [
  {
    title: "New post"
  }
]

export const handle: BreadcrumbHandle = {
  breadcrumb: () => <Breadcrumb>New post</Breadcrumb>
}

const AdminPostNewPage: FC = () => {
  const lastResult = useActionData<typeof action>()
  const [form, fields] = useForm({
    lastResult,
    constraint: getZodConstraint(ClientPostCreateInput),
    shouldValidate: "onBlur",
    shouldRevalidate: "onInput",

    onValidate: ({formData}) =>
      parseWithZod(formData, {schema: ClientPostCreateInput})
  })

  return (
    <PostEditor
      {...getFormProps(form)}
      context={form.context}
      method="post"
      className="contents"
    >
      <PostEditorTitle
        {...getTextareaProps(fields.title)}
        key={fields.title.key}
      />

      <PostEditorContent meta={fields.content} key={fields.content.key} />

      <div className="flex justify-end">
        <Button type="submit">Create post</Button>
      </div>
    </PostEditor>
  )
}

export default AdminPostNewPage
