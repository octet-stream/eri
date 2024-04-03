import {
  Entity,
  Property,
  JsonType,
  Unique,
  ManyToOne,
  type Opt
} from "@mikro-orm/mysql"

import {formatSlug} from "../../lib/utils/slug.js"

import {OPostContent} from "../../zod/plate/editors/PostContent.js"
import {OPostCreateInput} from "../../zod/post/PostCreateInput.js"

import {RecordSoft} from "./RecordSoft.js"
import {User} from "./User.js"

export interface PostInput extends OPostCreateInput {
  author: User
}

/**
 * Represents a post stored in database
 */
@Entity()
export class Post extends RecordSoft {
  /**
   * Post title
   */
  @Property<Post>({type: "varchar"})
  title: string

  @Property<Post>({type: JsonType, lazy: true})
  content: OPostContent

  /**
   * Human-readable, unique, URL-friendly identifier of the post
   */
  @Property<Post>({
    type: "varchar",
    length: 512,

    onUpdate: ({title, createdAt}) => formatSlug(title, createdAt)
  })
  @Unique()
  readonly slug!: Opt<string>

  /**
   * The author of the post
   */
  @ManyToOne(() => User, {eager: true})
  author!: User

  constructor(input: PostInput) {
    super()

    this.title = input.title
    this.author = input.author
    this.content = input.content
    this.slug = formatSlug(this.title, this.createdAt)
  }
}
