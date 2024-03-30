import {ActionFunctionArgs} from "@remix-run/node"

export const loader = (): never => {
  throw new Response(null, {
    status: 404
  })
}

// TODO: Implement registration
export const action = async ({request}: ActionFunctionArgs) => {
  console.log(Object.fromEntries(await request.formData()))

  return null
}
