import React, {Component} from 'react';

class ChatBar extends Component {

  render () {
    return (
    <footer className= "ChatBar">
      <input id="username" defaultValue="Your name"></input>
      <input id="new-message" defaultValue="Enter you message and hit enter"></input>
    </footer>
    )
  }
}

export default ChatBar;