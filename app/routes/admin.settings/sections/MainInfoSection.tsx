import {getFormProps, getInputProps, useForm} from "@conform-to/react"
import {getZodConstraint, parseWithZod} from "@conform-to/zod"
import type {FC} from "react"
import {Form, useActionData, useLoaderData, useNavigation} from "react-router"
import type {z} from "zod"

import {Button} from "../../../components/ui/Button.tsx"
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle
} from "../../../components/ui/Card.jsx"
import {Input} from "../../../components/ui/Input.tsx"
import {Label} from "../../../components/ui/Label.tsx"

import {AdminUpdateMainInfoInput} from "../../../server/zod/admin/AdminUpdateMainInfoInput.ts"

import type {action, loader} from "../route.tsx"

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
