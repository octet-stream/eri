import {
  Entity,
  Property,
  JsonType,
  Unique,
  ManyToOne,
  type Opt
} from "@mikro-orm/mysql"

import {formatSlug} from "../../lib/utils/slug.js"

import {
  OPostContentEditorDescendant as PostContent
} from "../../zod/plate/editors/PostContentEditorDescendant.js"

import {RecordSoft} from "./RecordSoft.js"
import {User} from "./User.js"

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

  @Property<Post>({type: JsonType})
  content: PostContent

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

  constructor(title: string, content: PostContent) {
    super()

    this.title = title
    this.content = content
    this.slug = formatSlug(this.title, this.createdAt)
  }
}
