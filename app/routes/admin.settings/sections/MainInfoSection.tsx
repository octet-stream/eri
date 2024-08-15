import {useForm, getInputProps, getFormProps} from "@conform-to/react"
import {
  useActionData,
  useLoaderData,
  Form,
  useNavigation
} from "@remix-run/react"
import {parseWithZod, getZodConstraint} from "@conform-to/zod"
import type {FC} from "react"
import type {z} from "zod"

import {Input} from "../../../components/ui/Input.jsx"
import {Button} from "../../../components/ui/Button.jsx"
import {Label} from "../../../components/ui/Label.jsx"
import {
  Card,
  CardTitle,
  CardHeader,
  CardContent,
  CardFooter
} from "../../../components/ui/Card.jsx"

import {AdminUpdateMainInfoInput} from "../../../server/zod/admin/AdminUpdateMainInfoInput.js"

import type {loader, action} from "../route.jsx"

export const MainInfoSection: FC = () => {
  const defaultValue = useLoaderData<typeof loader>()
  const lastResult = useActionData<typeof action>()
  const navigation = useNavigation()

  // TODO: Remove type parameter when this is resolved: https://github.com/edmundhung/conform/issues/478
  const [form, fields] = useForm<z.input<typeof AdminUpdateMainInfoInput>>({
    defaultValue,
    lastResult: navigation.state === "idle" ? lastResult : null,
    constraint: getZodConstraint(AdminUpdateMainInfoInput),
    onValidate: ({formData}) =>
      parseWithZod(formData, {schema: AdminUpdateMainInfoInput})
  })

  return (
    <Form {...getFormProps(form)} method="patch" className="w-full">
      <Card>
        <CardHeader>
          <CardTitle>Account information</CardTitle>
        </CardHeader>

        <CardContent>
          <div className="grid gap-2">
            <Label htmlFor={fields.email.id}>E-mail</Label>

            <Input
              {...getInputProps(fields.email, {type: "email"})}
              key={fields.email.id}
              placeholder="me@example.com"
            />
          </div>
        </CardContent>

        <CardFooter className="flex justify-end">
          <Button type="submit" name={fields.intent.name} value="info">
            Save
          </Button>
        </CardFooter>
      </Card>
    </Form>
  )
}
