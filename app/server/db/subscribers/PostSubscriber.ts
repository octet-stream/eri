import type {EntityName, EventArgs, EventSubscriber} from "@mikro-orm/mariadb"
import {assign} from "@mikro-orm/mariadb"

import {Post, PostPrevKnownSlug} from "../entities.js"
import {formatSlug} from "../../lib/utils/slug.js"

export class PostSubscriber implements EventSubscriber<Post> {
  getSubscribedEntities(): EntityName<Post>[] {
    return [Post]
  }

  async beforeUpdate(args: EventArgs<Post>): Promise<void> {
    const {entity: post, changeSet, em} = args

    if (!changeSet) {
      return
    }

    const {payload} = changeSet
    if (payload.title) {
      const pks = em.create(PostPrevKnownSlug, {post})

      assign(post, {slug: formatSlug(post.title, post.updatedAt), pks})
    }
  }
}
