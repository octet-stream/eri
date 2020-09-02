import {callbackify as cb} from "util"

import {Store} from "express-session"

import omit from "lodash/omit"

import db from "server/lib/db/connection"

class SequlizeStore extends Store {
  /**
   * @param {import("server/model/Session").default} model
   */
  constructor(model, include = []) {
    super()

    this._session = model
    this._include = include
  }

  get = cb(id => db.transaction(async transaction => {
    const session = await this._session.findByPk(id, {
      transaction, include: this._include
    })

    return session.toJSON()
  }))

  set = cb((id, data) => db.transaction(async transaction => {
    await this._session.upsert(
      {
        ...data, id
      },
      {
        transaction
      }
    )
  }))

  touch = cb((id, data) => db.transaction(async transaction => {
    const session = await this._session.findByPk(id, {transaction})

    if (!session) {
      return undefined
    }

    await session.update(omit(data, "id"), {transaction})
  }))

  destroy = cb(id => db.transaction(async transaction => {
    await this._session.destroy({transaction, where: {id}})
  }))
}

export default SequlizeStore
