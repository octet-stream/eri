import {GetServerSidePropsContext, GetStaticPropsContext} from "next"
import {graphql, print, DocumentNode} from "graphql"
import {ParsedUrlQuery} from "querystring"
import {ApolloError} from "@apollo/client"

import isString from "lodash/isString"

import AnyObject from "type/AnyObject"

import schema from "server/api/schema"

type ExecOperationContext<Q extends ParsedUrlQuery = ParsedUrlQuery> =
  GetServerSidePropsContext<Q> | GetStaticPropsContext<Q>

export interface ExecOperationParams<
V extends AnyObject = AnyObject,
Q extends ParsedUrlQuery = ParsedUrlQuery
> {
  operationName?: string
  query: string | DocumentNode
  variables?: V
  root?: any
  context?: ExecOperationContext<Q>
  ctx: ExecOperationContext<Q>
}

export interface ExecOperationResult<D extends AnyObject = AnyObject> {
  data?: D
  error?: ApolloError
}

/**
 * Executes given GraphQL query on the schema.
 * It performs all queries on the application's schema from server/api/schema
 *
 * Use this only inslide of getServerSideProps
 */
export const exec = async <
  D extends AnyObject = AnyObject,
  V extends AnyObject = AnyObject
>({
  query, operationName, variables, root, context, ctx
}: ExecOperationParams<V>): Promise<ExecOperationResult<D>> => {
  if (!isString(query)) {
    query = print(query)
  }

  const {data, errors} = await graphql(
    schema, query, root, context || ctx, variables, operationName
  )

  /** @type {ApolloError} */
  let error: ApolloError = null
  if (errors && errors.length > 0) {
    error = new ApolloError({graphQLErrors: errors})
  }

  return {data: data as D, error}
}

export default exec
