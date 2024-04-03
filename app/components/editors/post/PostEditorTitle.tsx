import {Input} from "../../ui/Input.jsx"

import {usePostEditorContext} from "./PostEditorContext.jsx"

export const PostEditorTitle = () => {
  const {register} = usePostEditorContext()

  return <Input {...register("title")} placeholder="Title" />
}
