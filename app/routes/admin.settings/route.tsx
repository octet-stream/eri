import {parseWithZod} from "@conform-to/zod/v4"
import type {FC} from "react"
import {data} from "react-router"

import {match} from "ts-pattern"

import {
  Breadcrumb,
  type BreadcrumbHandle
} from "../../components/common/Breadcrumbs.jsx"
import {adminContext} from "../../server/contexts/admin.ts"
import {authContext} from "../../server/contexts/auth.ts"
import {ormContext} from "../../server/contexts/orm.ts"
import {withAdmin} from "../../server/lib/admin/withAdmin.ts"
import {AdminUpdateInput} from "../../server/zod/admin/AdminUpdateInput.ts"
import {SessionUserOutput} from "../../server/zod/admin/SessionUserOutput.ts"
import {parseOutput} from "../../server/zod/utils/parseOutput.ts"
import type {Route} from "./+types/route.ts"
import {MainInfoSection} from "./sections/MainInfoSection.tsx"
import {PasskeySection} from "./sections/PasskeySection.tsx"
import {PasswordSection} from "./sections/PasswordSection.tsx"

export const loader = withAdmin(async ({context}: Route.LoaderArgs) => {
  const {user} = context.get(adminContext)

  await user.passkeys.load()

  return parseOutput(SessionUserOutput, user, {
    async: true
  })
})

export const action = withAdmin(
  async ({request, context}: Route.ActionArgs) => {
    const admin = context.get(adminContext)
    const orm = context.get(ormContext)
    const auth = context.get(authContext)

    const submission = await parseWithZod(await request.formData(), {
      schema: AdminUpdateInput,
      async: true
    })

    if (submission.status !== "success") {
      return data(submission.reply(), 422)
    }

    const headers = await match(submission.value)
      .when(
        input => input.intent === "password" && input.updated !== input.confirm,

        () => {
          throw data(
            submission.reply({
              formErrors: [
                "Updated and confirmation passwords should be the same"
              ]
            }),

            {
              status: 422
            }
          )
        }
      )
      .with({intent: "password"}, async ({current, updated}) => {
        const {headers} = await auth.api.changePassword({
          headers: request.headers,
          returnHeaders: true,
          body: {
            currentPassword: current,
            newPassword: updated
          }
        })

        return headers
      })
      .with({intent: "info"}, async ({intent: _, ...fields}) => {
        orm.em.assign(admin.user, fields)
        await orm.em.flush()

        return undefined
      })
      .exhaustive()

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
