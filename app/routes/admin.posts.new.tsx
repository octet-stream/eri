import {getFormProps, getTextareaProps, useForm} from "@conform-to/react"
import {getZodConstraint, parseWithZod} from "@conform-to/zod"
import type {FC} from "react"
import {data, generatePath, replace} from "react-router"
import type {MetaFunction} from "react-router"

import {Breadcrumb} from "../components/common/Breadcrumbs.jsx"
import type {BreadcrumbHandle} from "../components/common/Breadcrumbs.jsx"
import {Button} from "../components/ui/Button.jsx"
import {ClientPostCreateInput} from "../server/zod/post/ClientPostCreateInput.js"
import {PostCreateInput} from "../server/zod/post/PostCreateInput.js"

import {PostEditor} from "../components/post-editor/PostEditor.jsx"
import {PostEditorContent} from "../components/post-editor/PostEditorContent.jsx"
import {PostEditorTitle} from "../components/post-editor/PostEditorTitle.jsx"

import {Post} from "../server/db/entities.js"
import {
  type AdminActionArgs,
  defineAdminAction
} from "../server/lib/admin/defineAdminAction.js"
import {noopAdminLoader} from "../server/lib/admin/noopAdminLoader.server.js"

import type {Route} from "./+types/admin.posts.new.js"

export const loader = noopAdminLoader

export const action = defineAdminAction(
  async ({
    request,
    context: {viewer, orm}
  }: AdminActionArgs<Route.ActionArgs>) => {
    const submission = await parseWithZod(await request.formData(), {
      schema: PostCreateInput,
      async: true
    })

    if (submission.status !== "success") {
      return data(submission.reply(), {
        status: 422
      })
    }

    const post = orm.em.create(Post, {...submission.value, author: viewer.user})

    await orm.em.persistAndFlush(post)

    throw replace(generatePath("/admin/posts/:slug", {slug: post.slug}))
  }
)

export const meta: MetaFunction = () => [
  {
    title: "New post"
  }
]

export const handle: BreadcrumbHandle = {
  breadcrumb: () => <Breadcrumb>New post</Breadcrumb>
}

const AdminPostNewPage: FC<Route.ComponentProps> = ({actionData}) => {
  const [form, fields] = useForm({
    lastResult: actionData,
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
