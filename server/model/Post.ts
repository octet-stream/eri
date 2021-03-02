import {Column, Entity, OneToOne, ManyToMany, JoinColumn, JoinTable} from "typeorm"
import {Field, ObjectType} from "type-graphql"

import SoftRemovableEntity from "server/model/abstract/AbstractSoftRemovableEntity"

import User from "server/model/User"
import Tag from "server/model/Tag"

@ObjectType()
@Entity()
class Post extends SoftRemovableEntity {
  @Field(() => User)
  @OneToOne(() => User, {eager: true})
  @JoinColumn()
  readonly author!: User

  @Field(() => [Tag], {nullable: "items"})
  @ManyToMany(() => Tag, {eager: true})
  @JoinTable()
  tags: Tag[]

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
