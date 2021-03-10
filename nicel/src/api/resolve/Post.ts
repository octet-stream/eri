import {
  Ctx,
  Arg,
  Args,
  Root,
  Query,
  Mutation,
  Resolver,
  Authorized,
  FieldResolver
} from "type-graphql"
import {InjectRepository} from "typeorm-typedi-extensions";

import Context from "type/Context"

import notFound from "error/common/notFound"

import User from "entity/User"
import Post from "entity/Post"

import UserRepo from "repo/User"
import PostRepo from "repo/Post"

import PageArgs from "api/args/PageArgs"
import AddInput from "api/input/post/AddInput"
import UpdateInput from "api/input/post/UpdateInput"

import {PostPage, PostPageParams} from "api/type/post/PostPage"

// TODO: Add further optimizations w/ DataLoader
@Resolver(() => Post)
class PostResolver {
  @InjectRepository()
  private readonly userRepo: UserRepo

  @InjectRepository()
  private readonly postRepo: PostRepo

  @FieldResolver(() => User)
  author(@Root() {author, authorId}: Post) {
    if (author) {
      return author
    }

    return this.userRepo.findOne(authorId)
  }

  @Query(() => Post)
  async post(@Arg("slug") slug: string): Promise<Post> {
    const post = await this.postRepo.findOne({where: {slug, isDraft: false}})

    if (!post) {
      throw notFound("post")
    }

    return post
  }

  @Query(() => PostPage)
  async posts(
    @Args(() => PageArgs) {limit, page, offset}: PageArgs
  ): Promise<PostPageParams> {
    const [rows, count] = await this.postRepo.findAndCount({
      skip: offset, take: limit, where: {isDraft: false}
    })

    return {rows, count, page, limit, offset}
  }

  @Authorized()
  @Mutation(() => Post)
  postAdd(
    @Ctx() ctx: Context,
    @Arg("post", () => AddInput) post: AddInput
  ): Promise<Post> {
    const {userId} = ctx.session

    return this.postRepo.createAndSave(userId, post)
  }

  @Authorized()
  @Mutation(() => Post)
  async postUpdate(
    @Arg("post", () => UpdateInput) post: UpdateInput
  ): Promise<Post> {
    const {id, ...fields} = post

    return this.postRepo.update(id, fields)
      .then(() => this.postRepo.findOne(id))
  }
}

export default PostResolver
