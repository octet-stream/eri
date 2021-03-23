import {
  ID,
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
import forbidden from "error/common/forbidden"

import User from "entity/User"

import {Post, PostTextFormats} from "entity/Post"

import UserRepo from "repo/User"
import PostRepo from "repo/Post"

import toHtml from "lib/md/toHtml"
import toText from "lib/md/toText"

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

  @FieldResolver(() => String)
  async text(
    @Root()
    {text}: Post,

    @Arg("format", () => PostTextFormats, {
      defaultValue: PostTextFormats.MARKDOWN
    })
    format: PostTextFormats
  ): Promise<string> {
    // ! Markdown compeilation takes too long (about 600ms), figure out the reason and fix the problem
    switch (format) {
      case "html":
      case "htm":
        return toHtml(text)
      case "text":
      case "txt":
        return toText(text)
      default:
        return text
    }
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

  @Authorized()
  @Mutation(() => ID)
  async postRemove(
    @Ctx() ctx: Context, @Arg("postId", () => ID) postId: number
  ): Promise<number> {
    const post = await this.postRepo.findOne(postId)

    if (!post || post.hasAuthor(ctx.session.userId)) {
      throw forbidden({subject: "Post", operation: "remove"})
    }

    return this.postRepo.softRemove(post).then(() => post.id)
  }
}

export default PostResolver
