import {
  Entity,
  Property,
  ManyToOne,
  OptionalProps,
  JsonType
} from "@mikro-orm/core"
import type {OutputData} from "@editorjs/editorjs"

import type {IPostCreateInput} from "server/trpc/type/input/PostCreateInput"

import {BaseDates} from "./BaseDates"
import {User} from "./User"

export interface PostInput extends IPostCreateInput {
  author: User
}

@Entity()
export class Post extends BaseDates implements PostInput {
  @Property()
  title: string

  @Property({type: JsonType})
  content!: OutputData

  @Property({unique: true})
  slug!: string

  @ManyToOne()
  author!: User

  constructor({title, content, author}: PostInput) {
    super()

    this.title = title
    this.content = content
    this.author = author
  }

  [OptionalProps]?: "slug"
}
