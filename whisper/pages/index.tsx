import {GetStaticPropsContext} from "next"
import {Fragment, FC} from "react"

import PostsPayload from "type/api/PostsPayload"

import withError from "lib/error/withError"
import layout from "lib/hoc/layout"

import {exec, ExecOperationResult} from "lib/graphql/exec"

import BlogLayout from "layout/Blog"
import Preview from "component/Post/Preview"

import getPosts from "api/query/posts.gql"

type PageProps = ExecOperationResult<PostsPayload>

// export const getStaticProps = withError(
//   async (ctx: GetStaticPropsContext) => {
//     const props = await exec<PageProps>({ctx, query: getPosts})

//     return {
//       props,
//       revalidate: 60
//     }
//   }
// )

// const Home: FC<PageProps> = ({data}) => {
//   const {posts} = data

//   return (
//     <main>
//       {
//         posts.list.length
//           ? (
//             <Fragment>
//               {posts.list.map(post => <Preview key={post.id} post={post} />)}
//             </Fragment>
//           )
//           : <div>There's no posts</div>
//       }
//     </main>
//   )
// }

const Home: FC = () => <div>Home</div>

export default layout(BlogLayout)(Home)
