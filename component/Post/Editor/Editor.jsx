import {Fragment, useState} from "react"
import {serialize} from "remark-slate"

import t from "prop-types"

import Title from "component/Title"
import Button from "component/Button"

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
 * @callback EditorSubmitCallback
 *
 * @param {PostData} data
 *
 * @return {Promise<PostData & {id: number, slug: string}>}
 */

/**
 * @typedef {Object} PostEditorProps
 *
 * @prop {EditorSubmitCallback} onSubmit
 */

/**
 * @type {React.FC<PostEditorProps>}
 */
const Editor = ({onSubmit}) => {
  const [title, setTitle] = useState("")
  const [nodes, updateNodes] = useState([defaultNode])

  /**
   * @param {React.SyntheticEvent} event
   */
  const onChangeTitle = ({target}) => setTitle(target.value)

  const onSave = () => onSubmit({
    title, isDraft: true, text: toMarkdown(nodes)
  })

  const onPublish = () => onSubmit({
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

Editor.propTypes = {
  onSubmit: t.func.isRequired
}

export default Editor
