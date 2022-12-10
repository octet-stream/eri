import type {EventSubscriber, EventArgs, EntityName} from "@mikro-orm/core"

import {hashPassword} from "server/lib/util/hashPassword"

import {User} from "server/db/entity/User"

export class UserSubscriber implements EventSubscriber<User> {
  getSubscribedEntities(): Array<EntityName<User>> {
    return [User]
  }

  async beforeCreate(event: EventArgs<User>): Promise<void> {
    const {entity: user} = event

    user.password = await hashPassword(user.password)
  }

  async beforeUpdate(event: EventArgs<User>): Promise<void> {
    const {entity: user, changeSet} = event

    // If nothing is changed, then stop.
    if (!changeSet) {
      return
    }

    const {payload} = changeSet

    // If password is changed, hash it before update.
    if (payload.password) {
      user.password = await hashPassword(payload.password)
    }
  }
}
