import {zodResolver} from "@hookform/resolvers/zod"
import type {SubmitHandler} from "react-hook-form"
import type {GetStaticProps} from "next"
import {useForm} from "react-hook-form"
import {toast} from "react-hot-toast"
import {useRouter} from "next/router"
import type {FC} from "react"

import {
  UserCreateSuperInput,
  IUserCreateSuperInput
} from "server/trpc/type/input/UserCreateSuperInput"
import {User, UserRoles} from "server/db/entity/User"
import {runIsolatied} from "server/lib/db"
import {AuthLayout} from "layout/Auth"
import {Input} from "component/Input"

import {client} from "lib/trpc"

export const getStaticProps: GetStaticProps = async () => {
  // Check of super user already exists
  const user = await runIsolatied(em => em.findOne(User, {
    role: UserRoles.SUPER
  }))

  // If there's super user, then block access to the page.
  return user ? {notFound: true} : {props: {}}
}

const AuthSuperPage: FC = () => {
  const router = useRouter()
  const {handleSubmit, register, formState} = useForm<IUserCreateSuperInput>({
    resolver: zodResolver(UserCreateSuperInput)
  })

  const submit: SubmitHandler<IUserCreateSuperInput> = data => client
    .mutation("user.createSuper", data)
    .then(() => router.replace("/"))
    .catch(() => toast.error("Can't create admin account"))

  return (
    <AuthLayout title="Set up admin account">
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

export default AuthSuperPage
