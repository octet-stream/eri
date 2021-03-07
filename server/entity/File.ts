import {Field, ObjectType, Int} from "type-graphql"
import {Entity, Column} from "typeorm"

import SoftRemovableEntity from "server/entity/abstract/AbstractSoftRemovableEntity"

@ObjectType({simpleResolvers: true})
@Entity()
class File extends SoftRemovableEntity {
  @Field()
  @Column()
  path!: string

  @Field()
  @Column()
  basename!: string

  @Field()
  @Column({type: "char", length: 128})
  hash!: string

  @Field()
  @Column()
  mime!: string

  @Field(() => Int)
  @Column({unsigned: true})
  size!: number
}

export default File
