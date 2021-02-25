import {DeleteDateColumn} from "typeorm"
import {ObjectType} from "type-graphql"

import AbstractEntity from "server/model/abstract/AbstractEntity"

@ObjectType({isAbstract: true})
abstract class AbstractSoftRemovableEntity extends AbstractEntity {
  @DeleteDateColumn()
  deletedAt?: Date
}

export default AbstractSoftRemovableEntity
