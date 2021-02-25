import {ObjectType, Field, ID} from "type-graphql"
import {
  BaseEntity,
  CreateDateColumn,
  UpdateDateColumn,
  PrimaryGeneratedColumn
} from "typeorm"

import Dates from "server/api/type/common/Dates"

@ObjectType({isAbstract: true})
abstract class AbstractEntity extends BaseEntity {
  @Field(() => ID)
  @PrimaryGeneratedColumn({unsigned: true})
  readonly id!: number

  @CreateDateColumn()
  createdAt!: Date

  @UpdateDateColumn()
  updatedAt: Date

  @Field(() => Dates)
  get dates(): Dates {
    return {
      createdAt: this.createdAt,
      updatedAt: this.updatedAt,

      // @ts-ignore
      deletedAt: this.deletedAt
    }
  }
}

export default AbstractEntity
