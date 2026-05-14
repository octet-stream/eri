import {defineEntity, OptionalProps, p} from "@mikro-orm/core"

import {Post} from "./Post.ts"
import {RecordSoft} from "./RecordSoft.ts"

export const PostPrevKnownSlugSchema = defineEntity({
  name: "PostPrevKnownSlug",
  extends: RecordSoft,
  properties: {
    slug: p.string().columnType("text collate nocase"),
    post: () => p.manyToOne(Post)
  },
  uniques: [
    {
      properties: "slug"
    }
  ]
})

export class PostPrevKnownSlug extends PostPrevKnownSlugSchema.class {
  constructor(post: Post) {
    super()

    this.slug = post.slug
    this.post = post
  }

  [OptionalProps]?: "slug"
}

PostPrevKnownSlugSchema.setClass(PostPrevKnownSlug)
