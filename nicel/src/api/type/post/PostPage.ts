import {ObjectType, Root, Field} from "type-graphql"

import {Page, PageParams} from "api/type/abstract/Page"

import Post from "entity/Post"

export type PostPageParams = PageParams<Post>

@ObjectType()
export class PostPage extends Page<Post> {
  @Field(() => [Post], {nullable: "items"})
  list(@Root() {rows = []}: PostPageParams): Post[] {
    return rows
  }
}

export default PostPage
