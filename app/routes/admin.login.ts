import {ActionFunctionArgs} from "@remix-run/node"
import {redirect} from "@remix-run/react"

export const loader = (): never => {
  throw new Response(null, {
    status: 404
  })
}

// TODO: Implement authentication
export const action = async ({request}: ActionFunctionArgs) => {
  if (request.method.toLowerCase() !== "post") {
    throw new Response(null, {
      status: 405
    })
  }

  console.log(Object.fromEntries(await request.formData()))

  return redirect("/admin")
}
