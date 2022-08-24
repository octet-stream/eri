import type {EventSubscriber, EventArgs, EntityName} from "@mikro-orm/core"
import {format} from "date-fns"

import {Post} from "server/db/entity"
import {createSlug} from "server/lib/util/createSlug"

const DATE_FORMAT = "yyyy-MM-dd"

export const formatSlug = (title: string, date: Date) => (
  `${format(date, DATE_FORMAT)}/${createSlug(title)}`
)

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
