import {useApolloClient} from "@apollo/client"
import {Fragment, useState} from "react"
import {serialize} from "remark-slate"
import {useRouter} from "next/router"

import Title from "component/Title"
import Button from "component/Button"

import addPost from "api/mutation/post/add.gql"

import Name from "./Name"
import Text from "./Text"
import Actions from "./Actions"

import {container, content} from "./editor.module.css"

const toMarkdown = nodes => nodes.map(node => serialize(node)).join("")

// ! Set this as defaut state because slate falls for some reason when state is empty
const defaultNode = {
  type: "paragraph",
  children: [{
    text: ""
  }]
}

/**
 * @typedef {Object} PostData
 *
 * @prop {string} title
 * @prop {string} text
 * @prop {boolean} isDraft
 */

/**
 * @callback editorSubmitCallback
 *
 * @param {PostData} data
 *
 * @return {Promise<PostData & {id: number, slug: string}>}
 */

/**
 * @typedef {Object} PostEditorProps
 *
 * @prop {editorSubmitCallback} onSave
 * @prop {editorSubmitCallback} onPublish
 */

/**
 * @type {React.FC<PostEditorProps>}
 */
const Editor = () => {
  const router = useRouter()
  const client = useApolloClient()

  const [title, setTitle] = useState("")
  const [nodes, updateNodes] = useState([defaultNode])

  // TODO: Move this action to a specific page
  const submit = post => client
    .mutate({mutation: addPost, variables: {post}})
    .then(({data}) => router.push(data.postAdd.slug))
    .catch(console.error)

  /**
   * @param {React.SyntheticEvent} event
   */
  const onChangeTitle = ({target}) => setTitle(target.value)

  const onSave = () => submit({
    title, isDraft: true, text: toMarkdown(nodes)
  })

  const onPublish = () => submit({
    title, isDraft: false, text: toMarkdown(nodes)
  })

  return (
    <Fragment>
      <Title title={title || "Untitled"} />

      <div className={container}>
        <div className={content}>
          <Name value={title} onChange={onChangeTitle} />

          <Text value={nodes} onChange={updateNodes} />
        </div>

        <Actions>
          <Button variant="secondary" onClick={onSave}>
            Save
          </Button>

          <Button onClick={onPublish}>
            Publish
          </Button>
        </Actions>
      </div>
    </Fragment>
  )
}

export default Editor
