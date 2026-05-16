import {
  getFormProps,
  getInputProps,
  getTextareaProps,
  useForm
} from "@conform-to/react"
import {parseWithZod} from "@conform-to/zod/v4"
import type {FC} from "react"
import {data, href, redirect, useNavigation} from "react-router"
import {z} from "zod"
import {formatConformError} from "#app/server/lib/utils/formatConformError.ts"
import type {BreadcrumbHandle} from "../components/common/Breadcrumbs.tsx"
import {Breadcrumb} from "../components/common/Breadcrumbs.tsx"
import {Editor} from "../components/post-editor/Editor.tsx"
import {EditorFallback} from "../components/post-editor/EditorFallback.tsx"
import {EditorForm} from "../components/post-editor/EditorForm.tsx"
import {Button} from "../components/ui/Button.tsx"
import {ormContext} from "../server/contexts/orm.ts"
import {Post} from "../server/db/entities.ts"
import {
  withAdminAction,
  withAdminLoader
} from "../server/lib/admin/withAdmin.ts"
import {getPostTitle} from "../server/lib/editor/utils.ts"
import {slugToParams} from "../server/lib/utils/slug.ts"
import {
  AdminPostInput,
  type IAdminPostInput
} from "../server/zod/admin/AdminPostInput.js"
import {AdminPostUpdateOutput} from "../server/zod/admin/AdminPostUpdateOutput.ts"
import {PostSlug} from "../server/zod/post/PostSlug.ts"
import {parseInput} from "../server/zod/utils/parseInput.ts"
import {parseOutput} from "../server/zod/utils/parseOutput.ts"
import type {Route} from "./+types/admin.posts.$date.$name.edit.ts"

export const loader = withAdminLoader(async (event: Route.LoaderArgs) => {
  const {params, context} = event

  const orm = context.get(ormContext)

  const slug = await parseInput(PostSlug, params, {async: true})
  const post = await orm.em.findOneOrFail(
    Post,

    {
      slug
    },

    {
      filters: false, // Admin can see and edit all posts
      populate: ["content"],
      failHandler(): never {
        throw data(null, {
          status: 404,
          statusText: "Unble to find post"
        })
      }
    }
  )

  return parseOutput(AdminPostUpdateOutput, post, {async: true})
})

export const action = withAdminAction(
  async ({request, params, context}: Route.ActionArgs) => {
    const orm = context.get(ormContext)

    const slug = await parseInput(PostSlug, params, {
      async: true,
      onError(reason) {
        // The slug is malformed, so return 404
        throw data(
          formatConformError<unknown, string>(z.flattenError(reason.error)),

          404
        )
      }
    })

    const post = await orm.em.findOneOrFail(
      Post,

      {
        slug
      },

      {
        filters: false, // Admin can see all posts
        populate: ["content"],
        failHandler() {
          throw data(
            formatConformError({
              formErrors: ["Unable to find post"]
            }),

            {
              status: 404,
              statusText: "Unable to find post"
            }
          )
        }
      }
    )

    const submission = await parseWithZod(await request.formData(), {
      schema: AdminPostInput,
      async: true,
      disableAutoCoercion: true
    })

    if (submission.status !== "success") {
      return data(submission.reply(), 422)
    }

    const title = getPostTitle(submission.value)
    orm.em.assign(post, {
      title: title.textContent,
      content: submission.value.toJSON()
    })

    await orm.em.flush()

    throw redirect(href("/admin/posts/:date/:name", slugToParams(post.slug)))
  }
)

export const meta: Route.MetaFunction = ({loaderData}) => [
  {
    title: loaderData ? `${loaderData.title} - Edit post` : undefined
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

  const [form, fields] = useForm<IAdminPostInput>({
    defaultValue: loaderData,
    lastResult: navigation.state === "idle" ? actionData : null
  })

  return (
    <EditorForm {...getFormProps(form)} method="post">
      <div className="row-span-full">
        <Editor {...getInputProps(fields.content, {type: "text"})} />

        <EditorFallback {...getTextareaProps(fields.markdown)} />
      </div>

      <div>
        <Button>Save</Button>
      </div>
    </EditorForm>
  )
}

export default AdminPostEditPage
