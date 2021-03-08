import axios from "redaxios"

/** @type {axios} */
const callAPI = axios.create({
  baseURL: `${process.env.NEXT_PUBLIC_SERVER}/api/`
})

export default callAPI
