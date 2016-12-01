"use strict"

import React, {Component} from 'react';
import ChatBar from './ChatBar.jsx';
import MessageList from './MessageList.jsx';
import uuid from 'node-uuid';


class App extends Component {

  constructor(props) {


    const data = {
      currentUser: {name: "Anonymous"},
      messages: [], // messages coming from the server will be stored here as they arrive
      userCount: 0// notifications: []
    };

    super(props)

    this.state = data;
  }

  // inputMessage = (incomingMessage) => {

  //   // this.setState({currenId: newId})


  // }

  updateUsername = (username) => {
    let currentUser
    if (username === "") {
      currentUser = {name: "Anonymous"}
    } else {
      currentUser = {name: username}
    }
      this.setState({currentUser})
    }


  usernameChangeNotification = (newUsername) => {

    const usernameNotification = `${this.state.currentUser.name} has changed their name to ${newUsername}`
    console.log(usernameNotification)
    const notification = {type: "notification", content: usernameNotification}

    this.socket.send(JSON.stringify(notification))

    this.updateUsername(newUsername)
  }

  sendUserMessage = (message) => {

    const userMessage = {type: "userMessage", username: this.state.currentUser.name, content: message}
    this.socket.send(JSON.stringify(userMessage))
  }

  updateUserCounter = (message) => {
    JSON.parse(message)
    const userCount = message.content
    this.setState({userCount})
  }

  receivedBroadcast = (data) => {

    const message = JSON.parse(data);

    const appendMessage = (message) => {
      let messages = this.state.messages
      messages.push(message)
      this.setState({messages})
    }

    switch(message.type) {
      case "userMessage":
        message["class"] = "message"
        appendMessage(message)
        break;
      case "notification":
        message["class"] = "message system"
        appendMessage(message)
        break;
      case "userData":
        updateUserCounter(message)
      default:
        // show an error in the console if the message type is unknown
        throw new Error("Unknown event type " + message.type);
    }
  // };


    // const messages = this.state.messages;
    // messages.push(JSON.parse(messageObject));

    // this.setState({messages})
  }


  componentDidMount() {

    this.socket = new WebSocket("ws://localhost:4000")

    this.socket.onopen = (ev) => {
      console.log("Connected to the server")
      const connectionMessage = {type: "notification", content: `A new user has joined the chat as ${this.state.currentUser.name}`}
      this.socket.send(JSON.stringify(connectionMessage))
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
        <span className="user-counter">{this.state.userCount} other user(s) connected</span>
      </nav>
        <MessageList messages={this.state.messages} />
        <ChatBar
        currentUser={this.state.currentUser}
        sendUserMessage={this.sendUserMessage}
        usernameChangeNotification={this.usernameChangeNotification}
        />
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