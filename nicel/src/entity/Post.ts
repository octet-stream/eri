import {Field, ObjectType} from "type-graphql"
import {
  Column,
  Entity,
  ManyToOne,
  ManyToMany,
  JoinTable,
} from "typeorm"

import SoftRemovableEntity from "entity/abstract/AbstractSoftRemovableEntity"

import User from "entity/User"
import Tag from "entity/Tag"

@ObjectType()
@Entity()
class Post extends SoftRemovableEntity {
  @Column({unsigned: true, update: false})
  authorId: number

  @ManyToOne(() => User, {onDelete: "CASCADE", eager: true})
  readonly author!: User

  @Field(() => [Tag], {nullable: "items"})
  @ManyToMany(() => Tag, {eager: true})
  @JoinTable()
  tags?: Tag[]

  @Field()
  @Column()
  title!: string

  @Field()
  @Column({update: false})
  slug!: string

  @Field()
  @Column({type: "mediumtext"})
  text!: string

  @Field()
  @Column({default: true})
  isDraft!: boolean
}

export default Post
