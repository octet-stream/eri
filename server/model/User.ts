import {Entity, Column, OneToOne, JoinColumn} from "typeorm"
import {Field, ObjectType, registerEnumType} from "type-graphql"
import {compare} from "bcrypt"

import SoftRemovableEntity from "server/model/abstract/AbstractSoftRemovableEntity"

import File from "server/model/File"

export enum UserRoles {
  ROOT = "root",
  ADMIN = "admin",
  REGULAR = "regular"
}

export enum UserStatuses {
  INACTIVE = "inactive",
  ACTIVE = "active",
  BANNED = "banned",
  SUSPENDED = "suspended"
}

registerEnumType(UserRoles, {name: "UserRoles"})
registerEnumType(UserStatuses, {name: "UserStatuses"})

@ObjectType()
@Entity()
export class User extends SoftRemovableEntity {
  @Field()
  @Column({unique: true})
  login!: string

  @Column({unique: true})
  email!: string

  @Column()
  password!: string

  @Field()
  @Column({default: null})
  firstName?: string

  @Field()
  @Column({default: null})
  lastName?: string

  @Field(() => String, {nullable: true})
  get name(): string {
    return [this.firstName, this.lastName].filter(Boolean).join(" ") || null
  }

  @Field(() => String)
  @Column({type: "enum", enum: UserRoles, default: UserRoles.REGULAR})
  role!: UserRoles

  @Field(() => String)
  @Column({type: "enum", enum: UserStatuses, default: UserStatuses.INACTIVE})
  status!: UserStatuses

  @Field(() => File, {nullable: true})
  @OneToOne(() => File, {eager: true})
  @JoinColumn()
  avatar: File

  /**
   * Checks if given password is valid for the user
   *
   * @param password A password to compare with
   */
  comparePassword(password: string): Promise<boolean> {
    return compare(password, this.password)
  }
}

export default User
