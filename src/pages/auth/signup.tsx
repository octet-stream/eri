import {zodResolver} from "@hookform/resolvers/zod"
import type {SubmitHandler} from "react-hook-form"
import {useForm} from "react-hook-form"
import {toast} from "react-hot-toast"
import {useRouter} from "next/router"
import {useMemo} from "react"
import type {FC} from "react"

import {AuthLayout} from "layout/Auth"

import {
  IUserCreateInput,
  UserCreateInput
} from "server/trpc/type/input/UserCreateInput"

import {Input} from "component/Input"
import {client} from "lib/trpc"

const getCode = (path: string): string => (
  new URL(
    path,
    process.env.NEXT_PUBLIC_SERVER_URL
  ).searchParams.get("code") ?? ""
)

const SignupPage: FC = () => {
  const router = useRouter()

  // Retrieve code from `?code=` search param, if any
  const initialCode = useMemo(() => getCode(router.asPath), [router.asPath])

  const {handleSubmit, register, reset, formState} = useForm<IUserCreateInput>({
    resolver: zodResolver(UserCreateInput)
  })

  const submit: SubmitHandler<IUserCreateInput> = data => client
    .mutation("user.create", data)
    .then(() => reset())
    .catch(() => toast.error("Error while creating an account", {
      duration: 5000
    }))

  return (
    <AuthLayout title="Signup">
      <form onSubmit={handleSubmit(submit)}>
        <Input
          {...register("email")}

          className="w-full mb-2"
          type="email"
          placeholder="Email"
          error={formState.errors.email}
        />

        <Input
          {...register("login")}

          className="w-full mb-2"
          type="text"
          placeholder="Login"
          error={formState.errors.login}
        />

        <Input
          {...register("password")}

          className="w-full mb-2"
          type="password"
          placeholder="Password"
          error={formState.errors.password}
        />

        <Input
          {...register("code")}

          type="text"
          className="w-full mb-2"
          placeholder="Invitation code"
          defaultValue={initialCode}
          error={formState.errors.code}
        />

        <button
          type="submit"
          className="w-full rounded-md bg-black text-white p-2 disabled:bg-gray-100 disabled:text-black disabled:cursor-not-allowed"
        >
          Sign up
        </button>
      </form>
    </AuthLayout>
  )
}

export default SignupPage