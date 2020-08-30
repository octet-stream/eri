import callAPI from "lib/rest/api"

const getCsrfToken = () => callAPI
  .get("auth/csrf")
  .json()
  .then(({csrfToken}) => csrfToken)

export default getCsrfToken
