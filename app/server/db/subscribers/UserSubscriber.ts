import {EntityName, EventArgs, EventSubscriber} from "@mikro-orm/mysql"

import {password} from "../../lib/auth/password.js"

import {User} from "../entities.js"

export class UserSubscriber implements EventSubscriber<User> {
  getSubscribedEntities(): EntityName<User>[] {
    return [User]
  }

  async beforeCreate(args: EventArgs<User>): Promise<void> {
    const {entity: user} = args

    user.password = await password.hash(user.password)
  }
}
