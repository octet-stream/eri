import {EntityName, EventArgs, EventSubscriber} from "@mikro-orm/mysql"

import {hasher} from "../../lib/utils/password.js"

import {User} from "../entities.js"

export class UserSubscriber implements EventSubscriber<User> {
  getSubscribedEntities(): EntityName<User>[] {
    return [User]
  }

  async beforeCreate(args: EventArgs<User>): Promise<void> {
    const {entity: user} = args

    user.password = await hasher.hash(user.password)
  }
}
