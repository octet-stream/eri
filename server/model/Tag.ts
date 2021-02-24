import {Field, ObjectType} from "type-graphql"
import {Entity, Column} from "typeorm"

import SoftRemovableEntity from "server/lib/db/AbstractSoftRemovableEntity"

@ObjectType({simpleResolvers: true})
@Entity()
class Tag extends SoftRemovableEntity {
  @Field()
  @Column({unique: true})
  name!: string

  @Field()
  @Column({unique: true})
  slug!: string
}

export default Tag
