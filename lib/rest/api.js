import fetch from "isomorphic-fetch"

const callApi = (endpoint, options) => fetch(
  `${process.env.NEXT_PUBLIC_SERVER}/api/${endpoint}`, options
)

export default callApi
