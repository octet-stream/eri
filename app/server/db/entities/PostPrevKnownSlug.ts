import {Entity, ManyToOne, type Opt, Property, Unique} from "@mikro-orm/mariadb"

import {Post} from "./Post.ts"
import {RecordSoft} from "./RecordSoft.ts"

@Entity()
export class PostPrevKnownSlug extends RecordSoft {
  @Property({type: "varchar", length: 512})
  @Unique()
  slug!: Opt<string>

  /**
   * The post associated with the pks
   */
  @ManyToOne(() => Post)
  post: Post

  constructor(post: Post) {
    super()

    this.slug = post.slug
    this.post = post
  }
}
