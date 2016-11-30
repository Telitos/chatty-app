import React, {Component} from 'react';


class Message extends Component {

  render() {
    console.log("Rendering <Message/>");
    return(
    <li className="message">
      <span className="username">{this.props.data.username}</span>
      <span className="content">{this.props.data.content}</span>
    </li>
    )
  }
}


export default Message;

