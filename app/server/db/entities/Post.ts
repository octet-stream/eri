import {
  Collection,
  Entity,
  JsonType,
  ManyToOne,
  OneToMany,
  Property,
  Unique
} from "@mikro-orm/mariadb"
import type {Hidden, Opt} from "@mikro-orm/mariadb"
import type {JSONContent} from "@tiptap/core"

import {formatSlug} from "../../lib/utils/slug.js"

import {PostPrevKnownSlug} from "./PostPrevKnownSlug.js"
import {RecordSoft} from "./RecordSoft.js"
import {User} from "./User.js"

export interface PostInput {
  title: string
  content: JSONContent
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
  @Property<Post>({type: "string"})
  title: string

  @Property<Post>({type: JsonType, lazy: true})
  content: JSONContent

  /**
   * Human-readable, unique, URL-friendly identifier of the post
   */
  @Property<Post>({type: "string", length: 512})
  @Unique()
  readonly slug!: Opt<string>

  /**
   * List of previously known post `slug`
   */
  @OneToMany(() => PostPrevKnownSlug, "post", {hidden: true})
  readonly pks = new Collection<Hidden<PostPrevKnownSlug>, this>(this)

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
