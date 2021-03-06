import React, {Component} from 'react'
import ChatBar from './ChatBar.jsx'
import MessageList from './MessageList.jsx'
import uuid from 'node-uuid'


class App extends Component {

  constructor(props) {

    const data = {
      currentUser: {name: "Anonymous"},
      messages: [],
      userCount: 0,
      currentColor: {color: "#000000"}
    };

    super(props)

    this.state = data;
  }

  updateUsername = (username) => {

    let currentUser
      currentUser = {name: username}
      this.setState({currentUser})
    }

  usernameChangeNotification = (newUsername) => {

    if(newUsername !== "") {
      const usernameNotification = `${this.state.currentUser.name} has changed their name to ${newUsername}`
      const notification = {type: "notification", content: usernameNotification}
      this.socket.send(JSON.stringify(notification))
      this.updateUsername(newUsername)
    }
  }

  sendUserMessage = (message) => {

    const userMessage = {type: "userMessage", username: this.state.currentUser.name,
    content: message, color: this.state.currentColor}
    this.socket.send(JSON.stringify(userMessage))
  }

  updateUserCounter = (message) => {

    const userCount = message.content
    this.setState({userCount})
  }

  assignUserColor = (color) => {

    const newColor = {color}
    this.setState({currentColor: newColor})
  }

  receivedBroadcast = (data) => {

    const message = JSON.parse(data);

    const appendMessage = (message) => {
      const messages = this.state.messages
      messages.push(message)
      this.setState({messages})
    }

    switch(message.type) {
      case "userMessage":
        message["class"] = "message"
        appendMessage(message)
        break
      case "notification":
        message["class"] = "message system"
        appendMessage(message)
        break
      case "userData":
        if (message.hasOwnProperty("color")) {
          this.assignUserColor(message.color)
        } else {
            this.updateUserCounter(message)
          }
      break
      default:
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
        <span className="user-counter">{this.state.userCount - 1} other user(s) connected</span>
      </nav>
        <MessageList messages={this.state.messages} />
        <ChatBar
        currentUser={this.state.currentUser}
        sendUserMessage={this.sendUserMessage}
        usernameChangeNotification={this.usernameChangeNotification}
        />
    </div>
    )
  }
}

export default App


// let CoolButton = props =>
//   <button style={{ color: red }}>
//     {props.children}
//   </button>


// <CoolButton>asldkjasldk</CoolButton>