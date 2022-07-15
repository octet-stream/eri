import {Entity, Property, ManyToOne} from "@mikro-orm/core"
import {OptionalProps} from "@mikro-orm/core"

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

  @Property({type: "mediumtext"})
  text: string

  @Property({unique: true})
  slug!: string

  @ManyToOne()
  author!: User

  constructor({title, text, author}: PostInput) {
    super()

    this.title = title
    this.text = text
    this.author = author
  }

  [OptionalProps]?: "slug"
}
