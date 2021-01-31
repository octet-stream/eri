import axios from "redaxios"

/** @type {axios} */
const callAPI = axios.create({
  baseUrl: `${process.env.NEXT_PUBLIC_SERVER}/api`
})

export default callAPI
