import {useEffect, useState} from "react"

import {type href, useNavigate} from "react-router"

import {authClient} from "../client.ts"

type Path = Parameters<typeof href>[0]

interface UsePasskeyAutofillState {
  pending: boolean
  error: null | {
    message?: string
    status: number
    statusText: string
  }
}

export function usePasskeyAutofill<TRedirect extends Path>(
  redirect: TRedirect
) {
  const [state, setState] = useState<UsePasskeyAutofillState>({
    pending: false,
    error: null
  })

  const navigate = useNavigate()

  useEffect(() => {
    if (typeof PublicKeyCredential === "undefined") {
      return undefined
    }

    setState({error: null, pending: true})

    PublicKeyCredential.isConditionalMediationAvailable().then(
      async isAvailable => {
        if (!isAvailable) {
          return undefined
        }

        const result = await authClient.signIn.passkey({autoFill: true})
        setState({error: result.error, pending: false})
        navigate(redirect, {replace: true})
      }
    )
  }, [redirect, navigate])

  return state
}
