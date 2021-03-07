import {Field, ObjectType} from "type-graphql"
import {
  Column,
  Entity,
  ManyToOne,
  ManyToMany,
  JoinTable,
} from "typeorm"

import SoftRemovableEntity from "server/entity/abstract/AbstractSoftRemovableEntity"

import User from "server/entity/User"
import Tag from "server/entity/Tag"

@ObjectType()
@Entity()
class Post extends SoftRemovableEntity {
  @Column({unsigned: true, update: false})
  authorId: number

  @ManyToOne(() => User, {onDelete: "CASCADE", eager: true})
  readonly author!: User

  // TODO: Add tags resolver
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
