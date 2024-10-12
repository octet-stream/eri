import {parseWithZod} from "@conform-to/zod"
import {json} from "@remix-run/node"
import type {MetaDescriptor} from "@remix-run/react"
import type {FC} from "react"

import {
  Breadcrumb,
  type BreadcrumbHandle
} from "../../components/common/Breadcrumbs.jsx"

import {defineAdminAction} from "../../server/lib/admin/defineAdminAction.js"
import {defineAdminLoader} from "../../server/lib/admin/defineAdminLoader.js"
import {AdminUpdateInput} from "../../server/zod/admin/AdminUpdateInput.js"
import {SessionUser} from "../../server/zod/admin/SessionUser.js"
import {parseOutput} from "../../server/zod/utils/parseOutput.js"

import {MainInfoSection} from "./sections/MainInfoSection.jsx"
import {PasswordSection} from "./sections/PasswordSection.jsx"

export const loader = defineAdminLoader(async ({context: {auth}}) => {
  const {user} = auth.getAuthContext()

  return parseOutput(SessionUser, user, {async: true})
})

export const action = defineAdminAction(
  async ({request, context: {orm, auth}}) => {
    const submission = await parseWithZod(await request.formData(), {
      schema: AdminUpdateInput,
      async: true
    })

    if (submission.status !== "success") {
      return submission.reply() // ! See https://github.com/edmundhung/conform/issues/628
    }

    const {user} = auth.getAuthContext()

    if (
      submission.value.intent === "password" &&
      submission.value.updated === submission.value.confirm
    ) {
      user.password = submission.value.updated
    } else if (submission.value.intent === "info") {
      const {intent: _, ...fields} = submission.value

      orm.em.assign(user, fields)
    }

    await orm.em.flush()

    return submission.reply({resetForm: true}) // ! See https://github.com/edmundhung/conform/issues/628
  }
)

export const meta = (): MetaDescriptor[] => [
  {
    title: "Settings"
  }
]

export const handle: BreadcrumbHandle = {
  breadcrumb: () => <Breadcrumb>Settings</Breadcrumb>
}

const AdminSettingsPage: FC = () => (
  <div className="w-full flex flex-col gap-5">
    <MainInfoSection />
    <PasswordSection />
  </div>
)

export default AdminSettingsPage
