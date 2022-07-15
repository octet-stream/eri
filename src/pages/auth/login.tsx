import {zodResolver} from "@hookform/resolvers/zod"
import type {SubmitHandler} from "react-hook-form"
import {useForm} from "react-hook-form"
import {signIn} from "next-auth/react"
import {toast} from "react-hot-toast"
import {useRouter} from "next/router"
import type {FC} from "react"

import {AuthLayout} from "layout/Auth"

import {
  IUserLoginInput,
  UserLoginInput
} from "server/trpc/type/input/UserLoginInput"
import {Input} from "component/Input"

const LoginPage: FC = () => {
  const router = useRouter()
  const {handleSubmit, register, formState} = useForm<IUserLoginInput>({
    resolver: zodResolver(UserLoginInput)
  })

  const submit: SubmitHandler<IUserLoginInput> = ({email, password}) => (
    signIn("credentials", {email, password, redirect: false})
      .then(() => router.replace("/"))
      .catch(() => toast.error("Authentication failed"))
  )

  return (
    <AuthLayout title="Login">
      <form onSubmit={handleSubmit(submit)}>
        <Input
          {...register("email")}

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

        <button
          type="submit"
          className="w-full rounded-md bg-black text-white p-2 disabled:bg-gray-100 disabled:text-black disabled:cursor-not-allowed"
        >
          Log in
        </button>
      </form>
    </AuthLayout>
  )
}

export default LoginPage
