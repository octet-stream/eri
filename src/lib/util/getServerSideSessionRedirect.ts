import {unstable_getServerSession as getServerSession} from "next-auth/next"
import type {GetServerSideProps} from "next"
import type {Session} from "next-auth"

import {options} from "pages/api/auth/[...nextauth]"

interface Props {
  session: Session
}

/**
 * Returns `session` property using `getServerSideProps` context.
 *
 * Unlike `getServerSideSession` helper, this will redirect to `/auth/login` if there's no session for current viewer.
 *
 * Viewer will be redirected using server-side redirection. The server will respond with 307 HTTP status code.
 *
 * You **must** expose this helper as `getServerSideProps` function from page module.
 *
 * @param ctx ServerSideProps context.
 *
 * @example
 *
 * ```tsx
 * // page.tsx
 * import {FC} from "react"
 *
 * import getServerSideSessionRedirect from "lib/util/getServerSideSessionRedirect"
 *
 * export const getServerSideProps = getServerSideSessionRedirect
 *
 * const PrivatePage: FC = () => <div>Very private information</div>
 * ```
 */
export const getServerSideSessionRedirect: GetServerSideProps<Props> = async ({
  req,
  res
}) => {
  const session = await getServerSession(req, res, options)

  if (!session) {
    return {redirect: {destination: "/auth/login", permanent: false}}
  }

  return {props: {session}}
}
