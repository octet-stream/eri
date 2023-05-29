"use client"

import {zodResolver} from "@hookform/resolvers/zod"
import {useRouter} from "next/navigation"
import {useForm} from "react-hook-form"
import {signIn} from "next-auth/react"
import {toast} from "react-hot-toast"
import type {FC} from "react"

import {client} from "lib/trpc/client"

import type {
  OUserCreateSuperInput
} from "server/trpc/type/input/UserCreateSuperInput"
import {
  UserCreateSuperInput
} from "server/trpc/type/input/UserCreateSuperInput"

import {Form} from "app/admin/_/component/Auth/Form"

import {Input} from "component/Input"

const AdminSignupPage: FC = () => {
  const router = useRouter()

  const {register, handleSubmit, formState} = useForm<OUserCreateSuperInput>({
    resolver: zodResolver(UserCreateSuperInput)
  })

  const submit = handleSubmit(({email, login, password}) => (
    client.user.createSuper.mutate({email, login, password})
      .then(() => signIn("credentials", {email, password, redirect: false}))
      .then(() => router.replace("/"))
      .catch(error => {
        console.error(error)
        toast.error("Authentication failed")
      })
  ))

  return (
    <Form title="Admin signup" onSubmit={submit}>
      <Input
        {...register("email")}

        autoFocus
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
    </Form>
  )
}

export default AdminSignupPage
