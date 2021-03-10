import {ObjectType, Root, Field} from "type-graphql"

import {Page, PageParams} from "api/type/abstract/Page"

import User from "entity/User"

export type UserPageParams = PageParams<User>

@ObjectType()
export class UserPage extends Page<User> {
  @Field(() => [User], {nullable: "items"})
  list(@Root() {rows = []}: UserPageParams): User[] {
    return rows
  }
}

export default UserPage
