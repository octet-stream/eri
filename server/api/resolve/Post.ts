import {Resolver, Query, Mutation, Arg, Authorized} from "type-graphql"

import Post from "server/model/Post"

import AddInput from "server/api/input/post/AddInput"
import UpdateInput from "server/api/input/post/UpdateInput"

@Resolver(() => Post)
class PostResolver {
  @Query(() => Post)
  async post(@Arg("slug") slug: string): Promise<Post> {
    return Post.findOne({where: {slug}})
  }

  @Authorized()
  @Mutation(() => Post)
  postAdd(
    @Arg("post", () => AddInput) post: AddInput
  ): Promise<Post> {
    return Post.create(post).save()
  }

  @Authorized()
  @Mutation(() => Post)
  postUpdate(
    @Arg("post", () => UpdateInput) post: UpdateInput
  ): Promise<Post> {
    const {id, ...fields} = post

    return Post.update(id, fields).then(() => Post.findOne(id))
  }
}

export default PostResolver
