const ActionTypes = require('../constants').ActionTypes;
const Dispatcher = require('../dispatcher');
const Immutable = require('immutable');
const Store = require('./store');

let messages = Immutable.List();

class ChatMessagesStore extends Store {
  constructor() {
    this.dispatchToken = Dispatcher.register((action) => {
      switch (action.actionType) {
        case ActionTypes.CHAT_MESSAGE_SUBMITTED:
          messages = messages.push(action.message);
          break;
        default:
          return;
      }

      this.emitChange();
    });
  }

  getMessages() {
    return messages;
  }
};

module.exports = new ChatMessagesStore();
