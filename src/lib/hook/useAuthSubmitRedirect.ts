import {useEvent} from "react-use-event-hook"
import {useRouter} from "next/router"
import {useMemo} from "react"

interface UseAuthSubmitRedirectResult {
  destination: string
  redirect(): Promise<boolean>
}

export function useAuthSubmitRedirect(): UseAuthSubmitRedirectResult {
  const router = useRouter()

  const destination = useMemo<string>(
    () => router.query.r ? String(router.query.r) : "/",

    [router.query.r]
  )

  const redirect = useEvent(() => router.replace(destination))

  return {redirect, destination}
}
