import {Adapter, DatabaseSession, DatabaseUser} from "lucia"

import {getOrm} from "../db/orm.js"
import {User, Session} from "../../db/entities.js"

export class MikroORMAdapter implements Adapter {
  async deleteExpiredSessions(): Promise<void> {
    const orm = await getOrm()

    await orm.em.nativeDelete(Session, {
      expiresAt: {
        $gte: new Date()
      }
    })
  }

  async deleteSession(sessionId: string): Promise<void> {
    const orm = await getOrm()

    await orm.em.nativeDelete(Session, sessionId)
  }

  async deleteUserSessions(userId: string): Promise<void> {
    const orm = await getOrm()

    await orm.em.nativeDelete(Session, {
      user: {
        id: userId
      }
    })
  }

  async getSessionAndUser(sessionId: string): Promise<[
    session: DatabaseSession | null,
    user: DatabaseUser | null
  ]> {
    const orm = await getOrm()

    // TODO: Add proper error handling
    const session = await orm.em.findOneOrFail(Session, sessionId)

    return [session, session.user as any] // fixme: Add attributes type to a user
  }

  async getUserSessions(userId: string): Promise<DatabaseSession[]> {
    const orm = await getOrm()

    return orm.em.find(Session, {
      user: {
        id: userId
      }
    })
  }

  async setSession(session: DatabaseSession): Promise<void> {
    const orm = await getOrm()

    const {userId, ...fields} = session

    const user = orm.em.getReference(User, userId)

    orm.em.create(Session, {...fields, user}, {persist: true})

    await orm.em.flush()
  }

  async updateSessionExpiration(
    sessionId: string,
    expiresAt: Date
  ): Promise<void> {
    const orm = await getOrm()

    await orm.em.nativeUpdate(Session, sessionId, {
      expiresAt
    })
  }
}
