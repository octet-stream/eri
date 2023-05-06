import Link from "next/link"

import type {AFC} from "lib/type/AsyncFunctionComponent"

import {getPosts} from "./_/loader/getPosts"

export const dynamic = "force-dynamic"

export interface SearchParams {
  page?: string
}

interface Props {
  searchParams: SearchParams
}

const Page: AFC<Props> = async ({searchParams}) => {
  const posts = await getPosts(searchParams)

  return (
    <ul>
      {posts.items.map(post => (
        <li key={post.id}>
          <Link href={post.slug} className="underline">
            {post.title}
          </Link>
        </li>
      ))}
    </ul>
  )
}

export default Page
