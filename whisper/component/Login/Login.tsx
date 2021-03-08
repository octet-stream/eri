import {useForm, SubmitHandler} from "react-hook-form"
import {Fragment, FC} from "react"

import api from "lib/rest/api"

import Title from "component/Title"
import Input from "component/Input"
import Button from "component/Button"

import s from "./login.module.css"

interface Credentials {
  username: string
  password: string
}

const Login: FC = () => {
  const {register, handleSubmit} = useForm<Credentials>()

  const submit: SubmitHandler<Credentials> = credentials => (
    api.post("/api/auth/login", credentials).catch(console.error)
  )

  return (
    <Fragment>
      <Title title="Login" />

      <div className={s.container}>
        <div className={s.box}>
          <h1 className={s.title}>Login</h1>
          <form className={s.fields} onSubmit={handleSubmit(submit)}>
            <Input
              ref={register({required: true})}
              type="email"
              name="username"
              placeholder="Your email…"
              autoComplete="off"
              autoFocus
            />

            <Input
              ref={register({required: true})}
              type="password"
              name="password"
              placeholder="Your password…"
              autoComplete="off"
            />

            <Button type="submit">
              Log in
            </Button>
          </form>
        </div>
      </div>
    </Fragment>
  )
}

export default Login
