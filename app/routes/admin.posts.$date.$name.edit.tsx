import {getFormProps, getTextareaProps, useForm} from "@conform-to/react"
import {getZodConstraint, parseWithZod} from "@conform-to/zod"
import type {FC} from "react"
import {data, generatePath, redirect, useNavigation} from "react-router"
import type {z} from "zod"

import {Breadcrumb} from "../components/common/Breadcrumbs.jsx"
import type {BreadcrumbHandle} from "../components/common/Breadcrumbs.jsx"

import {PostEditor} from "../components/post-editor/PostEditor.jsx"
import {PostEditorContent} from "../components/post-editor/PostEditorContent.jsx"
import {PostEditorTitle} from "../components/post-editor/PostEditorTitle.jsx"
import {Button} from "../components/ui/Button.jsx"

import {Post} from "../server/db/entities.js"
import {
  type AdminActionArgs,
  defineAdminAction
} from "../server/lib/admin/defineAdminAction.js"
import {
  type AdminLoaderArgs,
  defineAdminLoader
} from "../server/lib/admin/defineAdminLoader.js"
import {checkPostPks} from "../server/lib/utils/checkPostPks.js"
import {matchHttpMethods} from "../server/lib/utils/matchHttpMethods.js"
import {AdminPostOutputEdit} from "../server/zod/admin/AdminPostOutputEdit.js"
import {ClientPostUpdateInput} from "../server/zod/post/ClientPostUpdateInput.js"
import {PostSlug} from "../server/zod/post/PostSlug.js"
import {PostUpdateInput} from "../server/zod/post/PostUpdateInput.js"
import {parseInput} from "../server/zod/utils/parseInput.js"
import {parseOutput} from "../server/zod/utils/parseOutput.js"

import type {Route} from "./+types/admin.posts.$date.$name.edit.js"

export const loader = defineAdminLoader(
  async (event: AdminLoaderArgs<Route.LoaderArgs>) => {
    const {
      params,
      context: {orm}
    } = event

    const slug = await parseInput(PostSlug, params, {async: true})

    await checkPostPks({
      event,
      slug,
      onRedirect: ({post}) =>
        generatePath("/admin/posts/:slug/edit", {slug: post.slug})
    })

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
  }
)

export const action = defineAdminAction(
  async ({
    request,
    params,
    context: {orm}
  }: AdminActionArgs<Route.ActionArgs>) => {
    if (!matchHttpMethods(request, "PATCH")) {
      throw data(
        {
          formErrors: ["Incorrect HTTP method. Use PATCH method instead."]
        },

        {
          status: 405
        }
      )
    }

    const slug = await parseInput(PostSlug, params, {
      async: true,
      onError(error) {
        throw data(error.error.flatten(), {
          status: 404
        })
      }
    })

    const post = await orm.em.findOneOrFail(
      Post,

      {
        slug
      },

      {
        filters: false, // Admin can see all posts
        populate: ["content", "pks"],
        failHandler() {
          throw data(
            {
              formErrors: ["Unable to find post"]
            },

            {
              status: 404,
              statusText: "Unable to find post"
            }
          )
        }
      }
    )

    const submission = await parseWithZod(await request.formData(), {
      schema: PostUpdateInput,
      async: true
    })

    if (submission.status !== "success") {
      return data(submission.reply(), {
        status: 422
      })
    }

    orm.em.assign(post, submission.value)

    await orm.em.flush()

    throw redirect(generatePath("/admin/posts/:slug", {slug: post.slug}))
  }
)

export const meta: Route.MetaFunction = ({data}) => [
  {
    title: `${data.title} - Edit post`
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
