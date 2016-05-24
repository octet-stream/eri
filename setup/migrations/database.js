'use strict';

// Modules
var model, question, logger, requireDir, requireHelper, _;
model = require('../../core/database/index');
requireDir = require('require-dir');
question = require('readline-sync').question;
logger = require('../../core/logger');
_ = require('lodash');

// Functions
var createSuperUser, loadSchemas;

/**
 *
 **/
loadSchemas = (bIsForce) => {
  var oSchemas, bCreateSuperUser, __ref;

  __ref = [];
  oSchemas = requireDir('../../core/database/schemas');

  for (let __sName in oSchemas) {
    let __schema = oSchemas[__sName];
    __ref.push(
      model(
        __sName, __schema
      ).sync({
        force: !!bIsForce
      })
    );
  }

  return __ref;
};

/**
 * Create ponyFiction.js SU
 */
createSuperUser = () => {
  return new Promise((_res, _rej) => {
    var oUser, sUsername, sEmail, sPass;

    oUser = model(
      'user',
      require('../../core/database/schemas/user')
    );

    sUsername = question('Your login: ');
    sEmail = question('Your email: ');
    sPass = question('Your password: ', {
      hideEchoBack: true
    });

    oUser.findOrCreate({
      where: {
        role: 3
      },
      defaults: {
        username: sUsername,
        email: sEmail,
        password: require('bcryptjs').hashSync(sPass),
        registeredAt: require('moment')().format(),
        role: 3,
        status: 1
      }
    })
    .then(() => _res())
    .catch(err => _rej(err));
  });
};

module.exports = oDatabaseConfig => {
  return new Promise((_res, _rej) => {
    var bIsForce, bCreateSuperUser;

    bIsForce = question(
        'Drop and database structure? (Y/n): '
      ) || 'y';

    bIsForce = (
      bIsForce === 'y' || bIsForce === 'yes' ||
      bIsForce === 'д' || bIsForce === 'да'
    ) ? true : false;

    if (bIsForce === false) {
      bCreateSuperUser = question(
        'Создать аккаунт администратора? (Y/n): '
      ) || 'y';
    }

    bCreateSuperUser = (
      bCreateSuperUser === 'y' || bCreateSuperUser === 'yes' ||
      bCreateSuperUser === 'д' || bCreateSuperUser === 'да'
    ) ? true : false;

    Promise.all(loadSchemas(bIsForce))
      .then(() => {
        if (bIsForce === false && bCreateSuperUser === false) {
          return _res();
        }
        return createSuperUser();
      })
      .then(() => _res())
      .catch(err => _rej(err));
  });
};
