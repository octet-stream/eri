import {parseWithZod} from "@conform-to/zod"
import type {FC} from "react"
import {data} from "react-router"

import {
  Breadcrumb,
  type BreadcrumbHandle
} from "../../components/common/Breadcrumbs.jsx"

import {
  type AdminActionArgs,
  defineAdminAction
} from "../../server/lib/admin/defineAdminAction.js"
import {
  type AdminLoaderArgs,
  defineAdminLoader
} from "../../server/lib/admin/defineAdminLoader.js"
import {AdminUpdateInput} from "../../server/zod/admin/AdminUpdateInput.js"
import {SessionUserOutput} from "../../server/zod/admin/SessionUserOutput.js"
import {parseOutput} from "../../server/zod/utils/parseOutput.js"

import {MainInfoSection} from "./sections/MainInfoSection.jsx"
import {PasskeySection} from "./sections/PasskeySection.jsx"
import {PasswordSection} from "./sections/PasswordSection.jsx"

import type {MaybeUndefined} from "../../lib/types/MaybeUndefined.js"
import type {Route} from "./+types/route.js"

export const loader = defineAdminLoader(
  async ({context: {viewer}}: AdminLoaderArgs<Route.LoaderArgs>) => {
    await viewer.user.passkeys.load()

    return parseOutput(SessionUserOutput, viewer.user, {
      async: true
    })
  }
)

export const action = defineAdminAction(
  async ({
    request,
    context: {orm, viewer, auth}
  }: AdminActionArgs<Route.ActionArgs>) => {
    let headers: MaybeUndefined<Headers>

    const submission = await parseWithZod(await request.formData(), {
      schema: AdminUpdateInput,
      async: true
    })

    if (submission.status !== "success") {
      return data(submission.reply(), 422)
    }

    if (submission.value.intent === "password") {
      if (submission.value.current !== submission.value.confirm) {
        throw data(
          submission.reply({
            formErrors: [
              "Current and confirmation passwords should be the same"
            ]
          }),

          {
            status: 422
          }
        )
      }

      const response = await auth.api.changePassword({
        asResponse: true,
        body: {
          currentPassword: submission.value.current,
          newPassword: submission.value.updated
        }
      })

      headers = response.headers
    } else if (submission.value.intent === "info") {
      const {intent: _, ...fields} = submission.value

      orm.em.assign(viewer.user, fields)
      await orm.em.flush()
    }

    return data(
      submission.reply({
        resetForm: true
      }),

      {
        headers
      }
    )
  }
)

export const meta: Route.MetaFunction = () => [
  {
    title: "Settings"
  }
]

export const handle: BreadcrumbHandle = {
  breadcrumb: () => <Breadcrumb>Settings</Breadcrumb>
}

const AdminSettingsPage: FC<Route.ComponentProps> = () => (
  <div className="w-full flex flex-col gap-5">
    <MainInfoSection />
    <PasswordSection />
    <PasskeySection />
  </div>
)

export default AdminSettingsPage
