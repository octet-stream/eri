import {useForm} from "react-hook-form"
import {Fragment} from "react"

import api from "lib/rest/api"

import Title from "component/Title"
import Input from "component/Input"
import Button from "component/Button"

import {container, box, fields, title} from "./login.module.css"

/**
 * @type {React.FC<{}>}
 */
const Login = () => {
  const {register, handleSubmit} = useForm()

  const submit = async credentials => api
    .post("auth/login", {json: JSON.stringify(credentials)})
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
