import {ObjectType, Root, Field} from "type-graphql"

import {Page, PageParams} from "server/api/type/abstract/Page"

import Post from "server/entity/Post"

export type PostPageParams = PageParams<Post>

@ObjectType()
export class PostPage extends Page<Post> {
  @Field(() => [Post], {nullable: "items"})
  list(@Root() {rows = []}: PostPageParams): Post[] {
    return rows
  }
}

export default PostPage
