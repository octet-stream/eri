import {ObjectType, Root, Field} from "type-graphql"

import {Page, PageParams} from "server/api/type/abstract/Page"

import Post from "server/model/Post"

export type PostParams = PageParams<Post>

@ObjectType()
export class PostPage extends Page<Post> {
  @Field(() => [Post], {nullable: "items"})
  list(@Root() {rows}: PostParams): Post[] {
    return rows
  }
}

export default PostPage
