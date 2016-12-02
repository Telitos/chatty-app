import React, {Component} from 'react'
import Message from './Message.jsx'

class MessageList extends Component {

  render() {
    return(
      <div id="message-list" className="MessageList">
        { this.props.messages.map((message) => {
          return (

            <Message data={message} key={message.id} color={message.color}/>
          )
        })
      }
      </div>
      )
  }
}

export default MessageList;
