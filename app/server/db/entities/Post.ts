import {defineEntity, OptionalProps, p} from "@mikro-orm/mariadb"
import type {JSONContent} from "@tiptap/core"

import {PostPrevKnownSlug} from "./PostPrevKnownSlug.ts"
import {RecordSoft} from "./RecordSoft.ts"
import {User} from "./User.ts"

export interface PostInput {
  title: string
  content: JSONContent
  author: User
}

export const PostSchema = defineEntity({
  name: "Post",
  extends: RecordSoft,
  properties: {
    /**
     * Post title
     */
    title: p.string(),

    /**
     * Human-readable, unique, URL-friendly identifier of the post
     */
    slug: p.string().length(512),

    /**
     * Post content in JSON format (tiptap)
     */
    content: p.json<JSONContent>().lazy(),

    /**
     * List of previously known post `slug`
     */
    pks: () => p.oneToMany(PostPrevKnownSlug).mappedBy("post").hidden(),

    /**
     * The author of the post
     */
    author: () => p.manyToOne(User).eager(true)
  },

  uniques: [
    {
      properties: "slug"
    }
  ]
})

/**
 * Represents a post stored in database
 */
export class Post extends PostSchema.class {
  [OptionalProps]?: "slug"
}

PostSchema.setClass(Post)
