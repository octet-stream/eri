import {ObjectType, Field, ID} from "type-graphql"
import {
  CreateDateColumn,
  UpdateDateColumn,
  PrimaryGeneratedColumn
} from "typeorm"

import Dates from "api/type/common/Dates"

@ObjectType({isAbstract: true})
abstract class AbstractEntity {
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
      updatedAt: this.updatedAt
    }
  }
}

export default AbstractEntity
