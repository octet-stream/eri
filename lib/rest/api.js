import ky from "ky-universal"

const callAPI = ky.create({
  prefixUrl: `${process.env.NEXT_PUBLIC_SERVER}/api`
})

export default callAPI
