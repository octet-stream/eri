import {unstable_getServerSession as getServerSession} from "next-auth/next"
import type {GetServerSideProps} from "next"
import type {Session} from "next-auth"

import {options} from "pages/api/auth/[...nextauth]"

interface Props {
  session: Session | null
}

/**
 * Returns `session` property using `getServerSideProps` context.
 * Unlike getServerSideSession helper, this will redirect to `/auth/login` if there's no session for current viewer.
 *
 * You **must** expose this helper as `getServerSideProps` function from page module.
 *
 * @param ctx ServerSideProps context.
 *
 * ```ts
 * import getServerSideSessionRedirect from "lib/util/getServerSideSessionRedirect"
 * ```
 */
const getServerSideSessionRedirect: GetServerSideProps<Props> = async ctx => {
  const session = await getServerSession(ctx.req, ctx.res, options)

  if (!session) {
    return {redirect: {destination: "/auth/login", permanent: false}}
  }

  return {props: {session}}
}

export default getServerSideSessionRedirect
