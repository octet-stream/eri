import {useForm} from "react-hook-form"

import Input from "component/Input"
import Button from "component/Button"

import {container, box, fields, title} from "./login.module.css"

function Login() {
  const {register, handleSubmit} = useForm()

  function submit(data) {
    console.log(data)
  }

  return (
    <div className={container}>
      <div className={box}>
        <h1 className={title}>Login</h1>
        <form className={fields} onSubmit={handleSubmit(submit)}>
          <Input
            ref={register}
            type="email"
            name="email"
            placeholder="Your email…"
            autoComplete="off"
            autoFocus
          />

          <Input
            ref={register}
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
  )
}

export default Login
