"use strict"

import React, {Component} from 'react'
import ChatBar from './ChatBar.jsx'
import MessageList from './MessageList.jsx'
import uuid from 'node-uuid'


class App extends Component {

  constructor(props) {


    const data = {
      currentUser: {name: "Anonymous"},
      messages: [], // messages coming from the server will be stored here as they arrive
      userCount: 0,
      currentColor: {color: "#000000"}
    };

    super(props)

    this.state = data;
  }


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
    const notification = {type: "notification", content: usernameNotification}
    this.socket.send(JSON.stringify(notification))
    this.updateUsername(newUsername)
  }

  sendUserMessage = (message) => {
    const userMessage = {type: "userMessage", username: this.state.currentUser.name, content: message}
    this.socket.send(JSON.stringify(userMessage))
  }

  updateUserCounter = (message) => {
    const userCount = message.content - 1
    this.setState({userCount})
  }

  updateUserColor = (color) => {
    const newColor = {color}
    this.setState({currentColor: newColor})
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
        console.log("userData case entered", message)
        if (message.color) {
          console.log("enter userData color side and the color is:", message.color)
          this.upadateUserColor(message.color)
        } else {
            this.updateUserCounter(message)
          }
      break;
      default:
        // show an error in the console if the message type is unknown
        throw new Error("Unknown event type " + message.type)
    }
  }


  componentDidMount() {

    this.socket = new WebSocket("ws://localhost:4000")

    this.socket.onopen = (ev) => {
      const connectionMessage = {type: "notification",
      content: `A new user has joined the chat as ${this.state.currentUser.name}`}
      this.socket.send(JSON.stringify(connectionMessage))
    }

    this.socket.onmessage = (ev) => {
      this.receivedBroadcast(ev.data)
    }
  }

  render() {
    return (
    <div className="wrapper">
      <nav>
        <h1>Chatty</h1>
        <span className="user-counter">{this.state.userCount} other user(s) connected</span>
      </nav>
        <MessageList messages={this.state.messages} color={this.state.color}/>
        <ChatBar
        currentUser={this.state.currentUser}
        sendUserMessage={this.sendUserMessage}
        usernameChangeNotification={this.usernameChangeNotification}
        />
    </div>
    );
  }
}

export default App


// let CoolButton = props =>
//   <button style={{ color: red }}>
//     {props.children}
//   </button>


// <CoolButton>asldkjasldk</CoolButton>