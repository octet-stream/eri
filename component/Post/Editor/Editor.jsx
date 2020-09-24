import {Fragment, useState} from "react"
import {serialize} from "remark-slate"

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

function Editor() {
  const [title, setTitle] = useState("")
  const [nodes, updateNodes] = useState([defaultNode])

  /**
   * @param {import("react").SyntheticEvent} event
   */
  const onChangeTitle = ({target}) => setTitle(target.value)

  const onSave = () => console.log({
    title, isDraft: true, text: toMarkdown(nodes)
  })

  const onPublish = () => console.log({
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
