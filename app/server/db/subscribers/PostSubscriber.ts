import type {
  EntityName,
  FlushEventArgs,
  EventSubscriber
} from "@mikro-orm/mariadb"
import {ChangeSetType} from "@mikro-orm/mariadb"
import {assign} from "@mikro-orm/mariadb"

import {Post, PostPrevKnownSlug} from "../entities.js"
import {formatSlug} from "../../lib/utils/slug.js"

export class PostSubscriber implements EventSubscriber<Post> {
  getSubscribedEntities(): EntityName<Post>[] {
    return [Post]
  }

  async onFlush(args: FlushEventArgs): Promise<void> {
    const {uow, em} = args
    const changeSets = uow.getChangeSets()

    const cs = changeSets.find(
      cs => cs.type === ChangeSetType.UPDATE && cs.name === Post.name
    )

    // When `Post.title` changes:
    // 1. Update `Post.slug`;
    // 2. Add new `Post.pks` entry;
    if (cs && (cs.payload as Partial<Post>)?.title) {
      const post = cs.entity as Post

      const pks = em.create(PostPrevKnownSlug, {post}, {persist: true})

      assign(post, {slug: formatSlug(post.title, post.updatedAt)})
      post.pks.add(pks)

      uow.computeChangeSet(pks)
      uow.recomputeSingleChangeSet(cs.entity)
    }
  }
}
