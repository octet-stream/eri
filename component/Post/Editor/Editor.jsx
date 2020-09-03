import {Fragment, useState} from "react"

import Title from "component/Title"
import Button from "component/Button"

import Name from "./Name"
import Text from "./Text"
import Actions from "./Actions"

import {container, content} from "./editor.module.css"

function Editor() {
  const [title, setTitle] = useState("")
  const [text, setText] = useState([{
    type: "paragraph",
    children: [{
      text: ""
    }]
  }])

  /**
   * @param {import("react").SyntheticEvent} event
   */
  const onChangeTitle = ({target}) => setTitle(target.value)

  const onPublish = () => console.log({title, text})

  return (
    <Fragment>
      <Title title={title || "Untitled"} />

      <div className={container}>
        <div className={content}>
          <Name value={title} onChange={onChangeTitle} />

          <Text value={text} onChange={setText} />
        </div>

        <Actions>
          <Button variant="secondary">
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
