'use strict';

const ActionTypes = require('../constants').ActionTypes;
const Dispatcher = require('../dispatcher');
const PersistenceUtils = require('../utils/persistence_utils');

const ONE_HOUR = 60 * 60 * 1000;

class UserActions {
  constructor() {
    this.persistence = new PersistenceUtils(
      'users',
      ActionTypes.USER_RECEIVED,
      'user'
    );
  }

  init() {
    this.persistence.init();
  }

  logIn(user, token) {
    Dispatcher.dispatch({
      actionType: ActionTypes.CURRENT_USER_RECEIVED,
      user: user,
      token: token
    });

    this.persistence.base.authAnonymously((err, data) => {
      if (err) {
        return Dispatcher.dispatch({
          actionType: ActionTypes.LOGIN_FAILED
        });
      }

      let firebaseToken = data.token;

      delete data.token;

      this.persistence.push({
        username: user.Username,
        lastOnline: +Date.now()
      });
    });
  }
};

module.exports = new UserActions();
