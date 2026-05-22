import type {
  ChangeSet,
  EntityName,
  EventArgs,
  EventSubscriber,
  FlushEventArgs
} from "@mikro-orm/core"
import {assign, ChangeSetType} from "@mikro-orm/core"

import {formatSlug} from "../../lib/utils/slug.ts"
import {Post, PostPrevKnownSlug} from "../entities.ts"

export class PostSubscriber implements EventSubscriber<Post> {
  getSubscribedEntities(): EntityName<Post>[] {
    return [Post]
  }

  beforeCreate(args: EventArgs<Post>): void {
    const {entity: post} = args

    // We are generating slug in this hook to make sure all required fields are in place
    const slug = formatSlug(post.title, post.createdAt)

    assign(post, {slug})
  }

  async onFlush(args: FlushEventArgs): Promise<void> {
    const {uow, em} = args
    const changeSets = uow.getChangeSets()

    // Find "update" changeset for Post
    const cs = changeSets.find(
      (cs): cs is ChangeSet<Partial<Post>> =>
        cs.type === ChangeSetType.UPDATE && cs.meta.class === Post
    )

    // When `Post.title` changes:
    // 1. Update `Post.slug`;
    // 2. Add new `Post.pks` entry;
    if (cs?.payload.title) {
      const post = cs.entity as Post

      const pks = em.create(PostPrevKnownSlug, {post}, {persist: true})

      assign(post, {slug: formatSlug(post.title, post.updatedAt)})

      post.pks.add(pks)

      uow.computeChangeSet(pks)
      uow.recomputeSingleChangeSet(cs.entity)
    }
  }
}
