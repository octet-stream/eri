import {useRouter} from "next/router"
import {useEffect} from "react"
import type {FC} from "react"

interface Props {
  url: string
}

export const Redirect: FC<Props> = ({url}) => {
  const router = useRouter()

  useEffect(() => {
    router.replace(url)
  })

  return null
}
