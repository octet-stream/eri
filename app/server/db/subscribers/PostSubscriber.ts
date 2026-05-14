import type {EntityName, EventSubscriber, FlushEventArgs} from "@mikro-orm/core"
import {assign, ChangeSetType} from "@mikro-orm/core"
import {match, P} from "ts-pattern"

import {formatSlug} from "../../lib/utils/slug.ts"
import {Post, PostPrevKnownSlug} from "../entities.ts"

const operations = [ChangeSetType.CREATE, ChangeSetType.UPDATE]

export class PostSubscriber implements EventSubscriber<Post> {
  getSubscribedEntities(): EntityName<Post>[] {
    return [Post]
  }

  async onFlush(args: FlushEventArgs): Promise<void> {
    const {uow, em} = args
    const changeSets = uow.getChangeSets()

    const cs = changeSets.find(
      cs => operations.includes(cs.type) && cs.meta.class === Post
    )

    if (!cs) {
      return
    }

    match(cs)
      .returnType<void>()
      // When post is created – generate `slug` field from `createdAt` + `title`
      .with({type: ChangeSetType.CREATE}, () => {
        const post = cs.entity as Post

        post.slug = formatSlug(post.title, post.createdAt)

        uow.recomputeSingleChangeSet(cs.entity)
      })

      // When `Post.title` changes:
      // 1. Update `Post.slug`;
      // 2. Add new `Post.pks` entry;
      .with({type: ChangeSetType.UPDATE, payload: {title: P.string}}, () => {
        const post = cs.entity as Post

        const pks = em.create(PostPrevKnownSlug, {post}, {persist: true})

        assign(post, {slug: formatSlug(post.title, post.updatedAt)})

        post.pks.add(pks)

        uow.computeChangeSet(pks)
        uow.recomputeSingleChangeSet(cs.entity)
      })
  }
}
