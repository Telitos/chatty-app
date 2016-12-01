import React, {Component} from 'react'
import Message from './Message.jsx'

class MessageList extends Component {

  render() {
    console.log("Rendering <MessageList/>")
    return(
      <div id="message-list" className="MessageList">
        { this.props.messages.map((message) => {
          return (
            <Message data={message} key={message.id}/>
          )
        })
      }
      </div>
      )
  }
}

export default MessageList;
