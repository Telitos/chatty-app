"use strict"

import React, {Component} from 'react';
import ChatBar from './ChatBar.jsx';
import MessageList from './MessageList.jsx';
import uuid from 'node-uuid';


class App extends Component {

  constructor(props) {


    const data = {
      currentUser: {},
      messages: [] // messages coming from the server will be stored here as they arrive
    };

    super(props)

    this.state = data;
  }

  // inputMessage = (incomingMessage) => {

  //   // this.setState({currenId: newId})


  // }

  updateUsername = (username) => {
    const currentUser = {name: username}
    this.setState({currentUser})
  }

  sendNewMessage = (message) => {
    const messageToJason = JSON.stringify({username: this.state.currentUser.name, content: message});
    this.socket.send(messageToJason)
  }

  receivedBroadcast = (messageObject) => {

    const messages = this.state.messages;
    messages.push(JSON.parse(messageObject));

    this.setState({messages})
  }


  componentDidMount() {

    this.socket = new WebSocket("ws://localhost:4000")

    this.socket.onopen = (ev) => {
      console.log("Connected to the server")
      // this.socket.send("Hello")
    }

    this.socket.onmessage = (ev) => {
      this.receivedBroadcast(ev.data)
    }
  }

  render() {
    console.log("Rendering <App/>");
    return (
    <div className="wrapper">
      <nav>
        <h1>Chatty</h1>
      </nav>
        <MessageList messages={this.state.messages} />
        <ChatBar currentUser={this.state.currentUser} inputMessage={this.inputMessage} sendNewMessage={this.sendNewMessage}
          updateUsername={this.updateUsername}/>
    </div>
    );
  }
}

export default App;


// let CoolButton = props =>
//   <button style={{ color: red }}>
//     {props.children} !!!
//   </button>


// <CoolButton>asldkjasldk</CoolButton>