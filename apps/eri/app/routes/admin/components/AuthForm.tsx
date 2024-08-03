import type {FC, ComponentPropsWithoutRef, ReactNode} from "react"

import type {Replace} from "../../../lib/types/Replace.js"

import {Button} from "../../../components/ui/Button.jsx"
import {Form} from "../../../components/common/Form.jsx"
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter
} from "../../../components/ui/Card.jsx"

type Props = Replace<ComponentPropsWithoutRef<typeof Form>, {
  title: string | ReactNode
  submitButtonText: string | ReactNode
  description: string
}>

// TODO: Make a utility of this component to make it more flexible
export const AuthForm: FC<Props> = ({
  children,
  title,
  description,
  submitButtonText,

  ...props
}) => (
  <div className="w-full p-5 mobile:w-[390px] m-auto">
    <Form {...props}>
      {(...p) => (
        <Card>
          <CardHeader>
            <CardTitle>
              {title}
            </CardTitle>

            <CardDescription>
              {description}
            </CardDescription>
          </CardHeader>

          <CardContent>
            {children?.(...p)}
          </CardContent>

          <CardFooter>
            <Button type="submit" className="w-full">
              {submitButtonText}
            </Button>
          </CardFooter>
        </Card>
      )}
    </Form>
  </div>
)
