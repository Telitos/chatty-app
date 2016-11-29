import React, {Component} from 'react';
import Message from './Message.jsx';

class MessageList extends Component {

  render() {
    return(
    <div id="message-list" className="MessageList">
      <Message />
    </div>
    )
  }
}

export default MessageList;
