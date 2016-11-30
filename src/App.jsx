"use strict"

import React, {Component} from 'react';
import ChatBar from './ChatBar.jsx';
import MessageList from './MessageList.jsx';


class App extends Component {

  constructor(props) {


    const data =

  // const data = {
  //   currentUser: {name: "Bob"}, // optional. if currentUser is not defined, it means the user is Anonymous
  //   messages: [
  //     { id: "1",
  //       username: "Bob",
  //       content: "Has anyone seen my marbles?",
  //     },
  //     { id: "2",
  //       username: "Anonymous",
  //       content: "No, I think you lost them. You lost your marbles Bob. You lost them for good."
  //     }
  //   ],
  //   currentId: 3
  // };

    super(props)

    this.state = data;
  }

  inputMessage = (incomingMessage) => {

    const id = this.state.currentId
    const newId = id + 1

    this.setState({currentId: newId})
    const messages = this.state.messages;
    const message = {id: newId, username: "Bob", content: incomingMessage}
    messages.push(message);

    this.setState({messages})

  }

  sendNewMessage = (message) => {

    const stringMessage = `${message}`
    this.socket.send(stringMessage)
  }

  receivedBroadcast = (message) => {
    this.inputMessage(message)
  }



  componentDidMount() {
    //  setTimeout(() => {
    //   console.log("Simulating incoming message");
    //   // Add a new message to the list of messages in the data store
    //   const newMessage = {id: 3, username: "Michelle", content: "Hello there!"};
    //   const messages = this.state.messages.concat(newMessage)
    //   // Update the state of the app component.
    //   // Calling setState will trigger a call to render() in App and all child components.
    //   this.setState({messages: messages})
    // }, 3000);

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
        <ChatBar currentUser={this.state.currentUser} inputMessage={this.inputMessage} sendNewMessage={this.sendNewMessage}/>
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