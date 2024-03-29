import {Entity, Property, JsonType, Unique} from "@mikro-orm/mysql"

import {formatSlug} from "../../lib/utils/slug.js"

import {RecordSoft} from "./RecordSoft.js"

@Entity()
export class Post extends RecordSoft {
  @Property({type: "varchar"})
  title: string

  @Property({type: JsonType})
  content: Record<string, unknown>

  @Property<Post>({
    type: "varchar",

    onUpdate: ({title, createdAt}) => formatSlug(title, createdAt)
  })
  @Unique()
  readonly slug!: string

  constructor(title: string, content: Record<string, unknown>) {
    super()

    this.title = title
    this.content = content
    this.slug = formatSlug(this.title, this.createdAt)
  }
}
