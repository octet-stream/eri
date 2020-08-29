import {DataTypes as t} from "sequelize"

import parseISO from "date-fns/parseISO"
import isString from "lodash/isString"
import toDate from "date-fns/toDate"

/**
 * @const schema
 *
 * @type {import("sequelize").ModelAttributes}
 */
const schema = {
  id: {
    type: t.STRING,
    primaryKey: true
  },
  userId: {
    type: t.INTEGER.UNSIGNED,
    allowNull: true,
    comment: "An ID of a user associated with the session"
  },
  cookie: {
    type: t.JSON,
    allowNull: false,

    /**
     * @param {Object} cookie
     * @param {string} [cookie.path]
     * @param {string} [cookie.domain]
     * @param {string} [cookie.sameSite]
     * @param {boolean} [cookie.secure]
     * @param {boolean} [cookie.httpOnly]
     * @param {Date} [cookie.expires = null]
     */
    set(cookie) {
      this.setDataValue("cookie", cookie)

      // eslint-disable-next-line no-underscore-dangle
      const expires = cookie.expires || cookie._expires

      if (!expires) {
        return undefined
      }

      this.setDataValue(
        "expiresAt",

        toDate(isString(expires) ? parseISO(expires) : expires)
      )
    }
  },
  clientBrowserName: {
    type: t.STRING,
    allowNull: false,
  },
  clientBrowserVersion: {
    type: t.STRING,
    allowNull: false,
  },
  clientOsName: {
    type: t.STRING,
    allowNull: false,
  },
  clientOsVersion: {
    type: t.STRING,
    allowNull: false,
  },
  clientIp: {
    type: t.STRING,
    allowNull: false,
  },
  expiresAt: {
    type: t.DATE,
    allowNull: true,
    defaultValue: null,
  }
}

export default schema
