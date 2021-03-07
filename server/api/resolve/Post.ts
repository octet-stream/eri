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

import Context from "server/type/Context"

import User from "server/entity/User"
import Post from "server/entity/Post"

import UserRepo from "server/repo/User"
import PostRepo from "server/repo/Post"

import PageArgs from "server/api/args/PageArgs"
import AddInput from "server/api/input/post/AddInput"
import UpdateInput from "server/api/input/post/UpdateInput"

import {PostPage, PostPageParams} from "server/api/type/post/PostPage"

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
    return this.postRepo.findOne({where: {slug}})
  }

  @Query(() => PostPage)
  async posts(
    @Args(() => PageArgs) {limit, page, offset}: PageArgs
  ): Promise<PostPageParams> {
    const [rows, count] = await this.postRepo.findAndCount({
      skip: offset, take: limit
    })

    return {rows, count, page, limit, offset}
  }

  @Authorized()
  @Mutation(() => Post)
  postAdd(
    @Ctx() ctx: Context,
    @Arg("post", () => AddInput) post: AddInput
  ): Promise<Post> {
    const {userId} = ctx.req.session

    return this.postRepo.createAndSave(userId, post)
  }

  @Authorized()
  @Mutation(() => Post)
  postUpdate(
    @Arg("post", () => UpdateInput) post: UpdateInput
  ): Promise<Post> {
    const {id, ...fields} = post

    return this.postRepo.update(id, fields)
      .then(() => this.postRepo.findOne(id))
  }
}

export default PostResolver
