import {DeleteDateColumn} from "typeorm"
import {ObjectType, Field} from "type-graphql"

import AbstractEntity from "server/entity/abstract/AbstractEntity"

import Dates from "server/api/type/common/Dates"

@ObjectType({isAbstract: true})
abstract class AbstractSoftRemovableEntity extends AbstractEntity {
  @DeleteDateColumn()
  deletedAt?: Date

  @Field(() => Dates)
  get dates(): Dates {
    return {
      createdAt: this.createdAt,
      updatedAt: this.updatedAt,
      deletedAt: this.deletedAt
    }
  }
}

export default AbstractSoftRemovableEntity
