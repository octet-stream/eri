"use client"

import type {FC} from "react"

import Link from "next/link"

import {usePostsData} from "context/PostsDataContext"

export const PostsList: FC = () => {
  const posts = usePostsData()

  return (
    <ul className="list-none p-0 m-0">
      {posts.items.map(post => (
        <li key={post.id} className="p-0">
          <Link href={`/post/${post.slug}`} className="dark:text-white">
            {post.title}
          </Link>
        </li>
      ))}
    </ul>
  )
}
