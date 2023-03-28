import type {EventSubscriber, EventArgs, EntityName} from "@mikro-orm/core"

import {Post} from "server/db/entity"
import {formatSlug} from "server/lib/util/slug"

export class PostSubscriber implements EventSubscriber<Post> {
  getSubscribedEntities(): Array<EntityName<Post>> {
    return [Post]
  }

  async beforeCreate(event: EventArgs<Post>): Promise<void> {
    const {entity: post} = event

    post.slug = formatSlug(post.title, post.createdAt)
  }

  async beforeUpdate(event: EventArgs<Post>): Promise<void> {
    const {changeSet, entity: post} = event

    if (!changeSet) {
      return
    }

    const {payload} = changeSet

    if (payload.title) {
      post.slug = formatSlug(payload.title, post.createdAt)
    }
  }
}
