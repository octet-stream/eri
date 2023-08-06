"use client"

import {zodResolver} from "@hookform/resolvers/zod"
import {useRouter} from "next/navigation"
import {useForm} from "react-hook-form"
import {signIn} from "next-auth/react"
import {toast} from "react-hot-toast"
import type {FC} from "react"

import {UserLoginInput} from "server/trpc/type/input/UserLoginInput"
import type {IUserLoginInput} from "server/trpc/type/input/UserLoginInput"

import {Form} from "app/admin/_/component/Auth/Form"

import {Input} from "component/Input"

const AdminLoginPage: FC = () => {
  const router = useRouter()

  const {handleSubmit, register, formState} = useForm<IUserLoginInput>({
    resolver: zodResolver(UserLoginInput)
  })

  const submit = handleSubmit(({email, password}) => (
    signIn("credentials", {email, password, redirect: false})
      .then(() => router.refresh())
      .catch(() => toast.error("Authentication failed"))
  ))

  return (
    <Form title="Login" submitLabel="Log in" onSubmit={submit}>
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
    </Form>
  )
}

export default AdminLoginPage
