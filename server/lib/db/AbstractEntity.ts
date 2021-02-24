import {Field, ID} from "type-graphql"
import {
  BaseEntity,
  CreateDateColumn,
  UpdateDateColumn,
  PrimaryGeneratedColumn
} from "typeorm"

abstract class AbstractEntity extends BaseEntity {
  @Field(() => ID)
  @PrimaryGeneratedColumn({unsigned: true})
  readonly id!: number

  @CreateDateColumn()
  createdAt!: Date

  @UpdateDateColumn()
  updatedAt: Date
}

export default AbstractEntity
