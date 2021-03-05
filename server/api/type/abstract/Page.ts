import {ObjectType, Field, Root, Int} from "type-graphql"

export interface PageParams<T extends object> {
  limit: number

  offset: number

  page: number

  count: number

  rows: T[]
}

@ObjectType({isAbstract: true})
export abstract class Page<T extends object> {
  @Field(() => Int)
  count: number

  @Field(() => Int)
  limit: number

  @Field(() => Int)
  offset: number

  @Field(() => Int)
  current(@Root() {page = 1}: PageParams<T>): number {
    return page
  }

  @Field(() => Boolean)
  hasNext(@Root() {limit, page, count}: PageParams<T>): boolean {
    if (limit != null && page != null && count != null) {
      return count - limit * page > 0
    }

    return false
  }

  @Field(() => Int)
  last(@Root() {limit, page, count}: PageParams<T>): number {
    if (limit != null && page != null && count != null) {
      return Math.ceil(count / (limit * page))
    }

    return 1
  }

  abstract list(root: PageParams<T>): T[]
}

export default Page
