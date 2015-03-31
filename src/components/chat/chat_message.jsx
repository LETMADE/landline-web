'use strict';

if (typeof __TEST__ === 'undefined') {
  require('basscss/css/basscss.min.css');
  require('../../styles/chat_markdown.css');
}

const Avatar = require('../ui/avatar.jsx');
const emoji = require('emojione');
const React = require('react/addons');

const ChatMessage = React.createClass({
  propTypes: {
    message: React.PropTypes.shape({
      avatar_url: React.PropTypes.string.isRequired,
      body: React.PropTypes.string.isRequired,
      html_body: React.PropTypes.string.isRequired,
      username: React.PropTypes.string.isRequired,
      created_at: React.PropTypes.object.isRequired,
      last_online_at: React.PropTypes.object.isRequired
    }).isRequired
  },

  statics: {
    parse(body) {
      return emoji.shortnameToImage(body || '');
    }
  },

  render() {
    let message = this.props.message;
    return (
      <div className="clearfix mt1">
        <div className="left mr1">
          <Avatar url={message.avatar_url} />
        </div>
        <div className="overflow-hidden">
          <h5 className="mt0 mb0">{message.username}</h5>
          <div className="chat-message" dangerouslySetInnerHTML={{__html: ChatMessage.parse(message.html_body)}} />
        </div>
      </div>
    );
  }
});

module.exports = ChatMessage;
