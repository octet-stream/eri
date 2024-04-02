import {makeDomainFunction} from "domain-functions"

import {withOrm} from "../../../lib/db/orm.js"
import {Post, User} from "../../../db/entities.js"
import {AuthEnv} from "../../../zod/envs/AuthEnv.js"
import {PostCreateInput} from "../../../zod/post/PostCreateInput.js"

/**
 * Creates new post authored by current user
 */
export const create = makeDomainFunction(PostCreateInput, AuthEnv)(
  withOrm(async (orm, {title, content}, {user}) => {
    const author = orm.em.getReference(User, user.id)

    console.log(author)

    const post = new Post({title, content, author})

    await orm.em.persistAndFlush(post)

    return post
  })
)
