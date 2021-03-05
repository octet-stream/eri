import {format} from "date-fns"
import {
  Ctx,
  Arg,
  Args,
  Root,
  Query,
  Mutation,
  Resolver,
  Authorized,
  FieldResolver,
  Int
} from "type-graphql"

import createSlug from "server/lib/helper/util/createSlug"

import Context from "server/type/Context"

import User from "server/model/User"
import Post from "server/model/Post"

import PageArgs from "server/api/args/PageArgs"
import AddInput from "server/api/input/post/AddInput"
import UpdateInput from "server/api/input/post/UpdateInput"

import {PostPage, PostParams} from "server/api/type/post/PostPage"

// TODO: Add further optimizations w/ DataLoader
@Resolver(() => Post)
class PostResolver {
  @FieldResolver(() => User)
  author(@Root() {author, authorId}: Post) {
    if (author) {
      return author
    }

    return User.findOne(authorId)
  }

  @Query(() => Post)
  async post(@Arg("slug") slug: string): Promise<Post> {
    return Post.findOne({where: {slug}})
  }

  @Query(() => PostPage)
  async posts(
    @Args(() => PageArgs) {limit, page, offset}: PageArgs
  ): Promise<PostParams> {
    const [rows, count] = await Post.findAndCount({skip: offset, take: limit})

    return {rows, count, page, limit, offset}
  }

  @Authorized()
  @Mutation(() => Post)
  postAdd(
    @Ctx() ctx: Context,
    @Arg("post", () => AddInput) post: AddInput
  ): Promise<Post> {
    const created = Post.create(post)
    const now = new Date()

    created.slug = `${format(now, "yyyy/MM/dd")}/${createSlug(post.title)}`
    created.authorId =  ctx.req.session.userId
    created.createdAt = now
    created.updatedAt = now

    return created.save()
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
