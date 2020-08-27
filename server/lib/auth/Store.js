import {Store} from "next-session"

import omit from "lodash/omit"

import db from "server/lib/db/connection"

class SequlizeStore extends Store {
  /**
   * @param {import("server/model/Session").default} model
   */
  constructor(model) {
    super()

    this._session = model
  }

  get = id => db.transaction(transaction => this._session.findByPk(id, {
    transaction, raw: true
  }))

  set = (id, {cookie, ...data}) => db.transaction(async transaction => {
    await this._session.upsert(
      {
        ...data, id, cookie: cookie.cookieOptions
      },
      {
        transaction
      }
    )
  })

  touch = (id, data) => db.transaction(async transaction => {
    const session = await this._session.findByPk(id, {transaction})

    if (!session) {
      return undefined
    }

    await session.update(omit(data, "id"), {transaction})
  })

  destroy = id => db.transaction(async transaction => {
    await this._session.destroy({transaction, where: {id}})
  })
}

export default SequlizeStore
