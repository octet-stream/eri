import {unstable_getServerSession as getServerSession} from "next-auth/next"
import type {GetServerSideProps} from "next"
import type {Session} from "next-auth"

import {options} from "pages/api/auth/[...nextauth]"

interface Props {
  session: Session | null
}

const getServerSideSession: GetServerSideProps<Props> = async ({req, res}) => {
  const session = await getServerSession(req, res, options)

  return {
    props: {
      session
    }
  }
}

export default getServerSideSession
