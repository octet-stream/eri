import {EntityRepository, Repository, SaveOptions, DeepPartial} from "typeorm"
import {Service} from "typedi"
import {hash} from "bcrypt"
import {omit} from "lodash"

import createError from "http-errors"

import User from "server/entity/User"

const hashPassword = (password: string): Promise<string> => hash(password, 15)

@Service()
@EntityRepository(User)
class UserRepo extends Repository<User> {
  /**
   * Creates a new user and persists in database
   *
   * @param user
   * @param options
   */
  async createAndSave(user: DeepPartial<User>, options?: SaveOptions) {
    user.password = await hashPassword(user.password)

    return User.create(user).save(options)
  }

  /**
   * Updates a user
   *
   * @param id An ID of user
   * @param fields Fields to update
   */
  async update(id: number, fields: DeepPartial<User>) {
    return super.update(id, omit(fields, "password"))
  }

  async updatePassword(
    id: number,
    oldPassword: string,
    newPassword: string
  ): Promise<User> {
    const user = await this.findOne(id)

    if (!(user || await user.comparePassword(oldPassword))) {
      throw createError(400, "Invalid password.")
    }

    user.password = await hashPassword(newPassword)

    return this.save(user)
  }

  /**
   * Finds a user by their login or email
   *
   * @param username login or email
   */
  findByUsername(username: string): Promise<User> {
    return this.findOne({where: [{login: username}, {email: username}]})
  }
}

export default UserRepo
