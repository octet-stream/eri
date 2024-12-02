import {
  getFormProps,
  getInputProps,
  getTextareaProps,
  useForm
} from "@conform-to/react"
import {getZodConstraint, parseWithZod} from "@conform-to/zod"
import {assign} from "@mikro-orm/mariadb"
import type {FC} from "react"
import type {MetaArgs, MetaDescriptor} from "react-router"
import {
  generatePath,
  redirect,
  useActionData,
  useLoaderData,
  useNavigation
} from "react-router"
import type {z} from "zod"

import {Breadcrumb} from "../components/common/Breadcrumbs.jsx"
import type {BreadcrumbHandle} from "../components/common/Breadcrumbs.jsx"

import {PostEditor} from "../components/post-editor/PostEditor.jsx"
import {PostEditorContent} from "../components/post-editor/PostEditorContent.jsx"
import {PostEditorTitle} from "../components/post-editor/PostEditorTitle.jsx"
import {Button} from "../components/ui/Button.jsx"

import {Post} from "../server/db/entities.js"
import {defineAdminAction} from "../server/lib/admin/defineAdminAction.js"
import {defineAdminLoader} from "../server/lib/admin/defineAdminLoader.js"
import {matchesHttpMethods} from "../server/lib/utils/matchesHttpMethods.js"
import {checkPksLoader} from "../server/loaders/checkPksLoader.js"
import {AdminPostOutputEdit} from "../server/zod/admin/AdminPostOutputEdit.js"
import {ClientPostUpdateInput} from "../server/zod/post/ClientPostUpdateInput.js"
import {type IPostSlug, PostSlug} from "../server/zod/post/PostSlug.js"
import {PostUpdateInput} from "../server/zod/post/PostUpdateInput.js"
import {parseInput} from "../server/zod/utils/parseInput.js"
import {parseOutput} from "../server/zod/utils/parseOutput.js"

import type {Route} from "./+types/admin.posts.$date.$name.edit.js"

export const loader = defineAdminLoader(async event => {
  await checkPksLoader({
    ...event,

    context: {
      ...event.context,

      pksRedirect: (slug: string) =>
        generatePath("/admin/posts/:slug/edit", {slug})
    }
  })

  const {
    params,
    context: {orm}
  } = event

  const slug = await parseInput(PostSlug, params as IPostSlug, {async: true})
  const post = await orm.em.findOneOrFail(
    Post,

    {
      slug
    },

    {
      filters: false, // Admin can see all posts
      populate: ["content"],
      failHandler(): never {
        throw new Response(null, {
          status: 404,
          statusText: "Unable to find post"
        })
      }
    }
  )

  return parseOutput(AdminPostOutputEdit, post, {async: true})
})

export const action = defineAdminAction(async ({request, context: {orm}}) => {
  if (!matchesHttpMethods(request, "PATCH")) {
    throw new Response(null, {
      status: 405
    })
  }

  const submission = await parseWithZod(await request.formData(), {
    schema: PostUpdateInput,
    async: true
  })

  if (submission.status !== "success") {
    return submission.reply() // ! See https://github.com/edmundhung/conform/issues/628
  }

  const {id, ...fields} = submission.value

  const post = await orm.em.findOneOrFail(
    Post,

    submission.value.id,

    {
      filters: false, // Admin can see all posts
      populate: ["content", "pks"],
      failHandler(): never {
        throw new Response(null, {
          status: 404,
          statusText: "Unable to find post"
        })
      }
    }
  )

  assign(post, fields)

  await orm.em.flush()

  throw redirect(generatePath("/admin/posts/:slug", {slug: post.slug}))
})

export const meta = ({data}: MetaArgs<typeof loader>): MetaDescriptor[] => [
  {
    title: `${data?.title} - Edit post`
  }
]

export const handle: BreadcrumbHandle = {
  breadcrumb: () => <Breadcrumb>Edit</Breadcrumb>
}

const AdminPostEditPage: FC<Route.ComponentProps> = ({
  loaderData,
  actionData
}) => {
  const navigation = useNavigation()

  const [form, fields] = useForm<z.input<typeof ClientPostUpdateInput>>({
    defaultValue: loaderData,
    lastResult: navigation.state === "idle" ? actionData : null,
    constraint: getZodConstraint(ClientPostUpdateInput),
    shouldValidate: "onBlur",
    shouldRevalidate: "onBlur",

    onValidate: ({formData}) =>
      parseWithZod(formData, {schema: ClientPostUpdateInput})
  })

  return (
    <PostEditor
      {...getFormProps(form)}
      context={form.context}
      method="patch"
      className="contents"
    >
      <input
        {...getInputProps(fields.id, {type: "hidden"})}
        key={fields.id.key}
      />

      <PostEditorTitle
        {...getTextareaProps(fields.title)}
        key={fields.title.key}
      />

      <PostEditorContent meta={fields.content} key={fields.content.key} />

      <div className="flex justify-end">
        <Button type="submit">Save</Button>
      </div>
    </PostEditor>
  )
}

export default AdminPostEditPage
