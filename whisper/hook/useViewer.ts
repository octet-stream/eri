import {UrlObject} from "url"

import {useContext, useEffect} from "react"
import {useRouter} from "next/router"

import Viewer from "context/Viewer"

type Url = UrlObject | string

function useViewer(url?: Url) {
  const viewer = useContext(Viewer)
  const router = useRouter()

  useEffect(() => {
    if (!viewer && url) {
      router.push(url)
    }
  }, [])

  return viewer
}

export default useViewer
