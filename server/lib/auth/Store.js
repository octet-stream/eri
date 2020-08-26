import {Store} from "next-session"

import db from "server/lib/db/connection"

class SequlizeStore extends Store {
  constructor(model) {
    super()

    this._session = model
  }

  get = id => db.transaction(transaction => this._session.findByPk(id, {
    transaction
  }))

  set = (id, data) => db.transaction(transaction => {
    data.id = id

    return this._session.upsert(data, {transaction})
  })

  // touch = (id, data) => {}

  destroy = id => db.transaction(async transaction => {
    await this._session.destroy({transaction, where: {id}})
  })
}

export default SequlizeStore
