import {Entity, Column, OneToOne, JoinColumn} from "typeorm"
import {Field, ObjectType} from "type-graphql"
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
  @Column()
  firstName: string

  @Field()
  @Column()
  lastName: string

  @Field(() => String)
  get name(): string {
    return [this.firstName, this.lastName].filter(Boolean).join(" ")
  }

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
