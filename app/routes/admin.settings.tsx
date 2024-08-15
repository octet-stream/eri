import {getFormProps, getInputProps, useForm} from "@conform-to/react"
import {parseWithZod, getZodConstraint} from "@conform-to/zod"
import {useLoaderData, Form} from "@remix-run/react"
import {json} from "@remix-run/node"
import type {FC} from "react"

import {
  Breadcrumb,
  type BreadcrumbHandle
} from "../components/common/Breadcrumbs.jsx"
import {Input} from "../components/ui/Input.jsx"
import {Button} from "../components/ui/Button.jsx"
import {
  Card,
  CardTitle,
  CardHeader,
  CardContent,
  CardFooter
} from "../components/ui/Card.jsx"

import {defineAdminLoader} from "../server/lib/admin/defineAdminLoader.server.js"
import {defineAdminAction} from "../server/lib/admin/defineAdminAction.server.js"
import {AdminUpdateInput} from "../server/zod/admin/AdminUpdateInput.js"
import {parseOutput} from "../server/zod/utils/parseOutput.js"
import {SessionUser} from "../server/zod/admin/SessionUser.js"

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
      return json(submission.reply()) // ! See https://github.com/edmundhung/conform/issues/628
    }

    const {user} = auth.getAuthContext()

    orm.em.assign(user, submission.value)

    await orm.em.flush()

    return parseOutput(SessionUser, user, {async: true})
  }
)

export const handle: BreadcrumbHandle = {
  breadcrumb: () => <Breadcrumb>Settings</Breadcrumb>
}

const AdminSettingsPage: FC = () => {
  const defaultValue = useLoaderData<typeof loader>()

  const [form, fields] = useForm({
    defaultValue,
    constraint: getZodConstraint(AdminUpdateInput),
    onValidate: ({formData}) =>
      parseWithZod(formData, {schema: AdminUpdateInput})
  })

  return (
    <Form {...getFormProps(form)} method="patch" className="w-full">
      <Card>
        <CardHeader>
          <CardTitle>Account information</CardTitle>
        </CardHeader>

        <CardContent>
          <div className="grid gap-2">
            <label htmlFor={fields.email.id}>E-mail</label>

            <Input
              {...getInputProps(fields.email, {type: "email"})}
              placeholder="me@example.com"
            />
          </div>
        </CardContent>

        <CardFooter className="flex justify-end">
          <Button type="submit">Save</Button>
        </CardFooter>
      </Card>
    </Form>
  )
}

export default AdminSettingsPage
