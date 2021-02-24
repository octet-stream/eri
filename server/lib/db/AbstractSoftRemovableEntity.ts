import {DeleteDateColumn} from "typeorm"

import AbstractEntity from "./AbstractEntity"

abstract class AbstractSoftRemovableEntity extends AbstractEntity {
  @DeleteDateColumn()
  deletedAt?: Date
}

export default AbstractSoftRemovableEntity
