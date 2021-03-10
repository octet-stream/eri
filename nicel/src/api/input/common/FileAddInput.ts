import File from "entity/File"
import {Field, InputType, ID} from "type-graphql"

import FileInput from "./FileInput"

@InputType()
class FileAddInput {
  @Field(() => ID)
  id!: number

  @Field(() => FileInput)
  file!: FileInput
}

export default FileAddInput
