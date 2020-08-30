import {useForm} from "react-hook-form"
import {Fragment} from "react"

import getCsrfToken from "lib/auth/getCsrfToken"
import callAPI from "lib/rest/api"

import Title from "component/Title"
import Input from "component/Input"
import Button from "component/Button"

import {container, box, fields, title} from "./login.module.css"

function Login() {
  const {register, handleSubmit} = useForm()

  const submit = async credentials => callAPI
    .post("auth/login", {
      json: {
        ...credentials, _csrf: await getCsrfToken()
      }
    })
    .json()
    .catch(console.error)

  return (
    <Fragment>
      <Title title="Login" />

      <div className={container}>
        <div className={box}>
          <h1 className={title}>Login</h1>
          <form className={fields} onSubmit={handleSubmit(submit)}>
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
