import {zodResolver} from "@hookform/resolvers/zod"
import type {SubmitHandler} from "react-hook-form"
import {useForm} from "react-hook-form"
import {signIn} from "next-auth/react"
import {toast} from "react-hot-toast"
import type {FC} from "react"

import {getServerSideSession} from "lib/util/getServerSideSession"

import {AuthLayout} from "layout/AuthLayout"

import {UserLoginInput} from "server/trpc/type/input/UserLoginInput"
import type {IUserLoginInput} from "server/trpc/type/input/UserLoginInput"
import {Button} from "component/Button"
import {Input} from "component/Input"

interface Props { }

export const getServerSideProps = getServerSideSession

const LoginPage: FC<Props> = () => {
  const {handleSubmit, register, formState} = useForm<IUserLoginInput>({
    resolver: zodResolver(UserLoginInput)
  })

  const submit: SubmitHandler<IUserLoginInput> = ({email, password}) => (
    signIn("credentials", {email, password, redirect: false})
      .catch(() => toast.error("Authentication failed"))
  )

  return (
    <AuthLayout title="Login">
      <form onSubmit={handleSubmit(submit)}>
        <Input
          {...register("email")}

          autoFocus
          className="w-full mb-2"
          type="email"
          placeholder="Email"
          error={formState.errors.email}
        />

        <Input
          {...register("password")}

          className="w-full mb-2"
          type="password"
          placeholder="Password"
          error={formState.errors.password}
        />

        <Button wide type="submit">
          Log in
        </Button>
      </form>
    </AuthLayout>
  )
}

export default LoginPage
