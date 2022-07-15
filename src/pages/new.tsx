import {unstable_getServerSession as getServerSession} from "next-auth/next"
import type {GetServerSideProps} from "next"
import type {Session} from "next-auth"
import type {FC} from "react"

import {options} from "pages/api/auth/[...nextauth]"

interface Props { }

interface ServerSideProps extends Props {
  session: Session | null
}

type GetServerSidePropsHandler = GetServerSideProps<ServerSideProps>

export const getServerSideProps: GetServerSidePropsHandler = async ctx => {
  const session = await getServerSession(ctx.req, ctx.res, options)

  return {
    props: {
      session
    }
  }
}

const NewPostPage: FC<Props> = () => (
  <div>Post editor will be here</div>
)

export default NewPostPage
