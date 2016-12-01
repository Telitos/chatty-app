import React, {Component} from 'react';

class ChatBar extends Component {
  constructor (props) {

    super(props)

    this.state = {
      username : this.props.currentUser.name,
      message: ""
    }
  }

  // ComponentDidMount() {
  //     this.setState({
  //     username: this.props.currentUser.name,
  //   })
  // }
  // usernameHandleChange = (ev) => {
  //   this.setState({ username: ev.target.value })
  // }

  // messageHandleChange = (ev) => {
  //   this.setState({ message: ev.target.value })
  // }

  // handleChange = (ev, key) => {
  //   object = {}
  //   object[key] = ev.target.value
  //   this.setState(object)
  // }

  getHandleChangeFn = (key) => {
    return (ev) => {
      let object = {}
      object[key] = ev.target.value
      this.setState(object)

      // if (key === 'username') {
      //   this.props.updateUsername(this.state.username)
      // }
      // console.log('object', object, 'state', this.state)
    }
  }

  // handleChangeMike = (ev) => {
  //   this.setState({username: ev.target.value})

  //   this.props.updateUsername(ev.target.value)

  // }

  messageOnKeyChange = (ev) => {
    if (ev.key === 'Enter') {
      this.props.sendNewMessage(ev.target.value);
      console.log(this.state.username);
    }
  }

  usernameOnKeyEnter = (ev) => {
   if (ev.key === 'Enter') {
      this.props.updateUsername(ev.target.value);
      console.log(this.state.username);
    }
  }


  // getHandleKeyChange = () => {
  //   this.props.updateUsername(this.state.username)
  //   return this.messageOnKeyChange
  // }


  render () {
    console.log("Rendering <ChatBar/>");

    return (

    <footer className= "ChatBar">

      <input
        id = "username"
        placeholder = "Type your username"
        defaultValue = {this.state.username}
        onChange = {this.getHandleChangeFn("username")}
        onKeyPress = {this.usernameOnKeyEnter}
          // this.props.updateUsername(this.state.username)
      />

      <input
        id = "new-message"
        placeholder = "Type message"
        defaultValue = {this.state.message}
        onChange = {this.getHandleChangeFn("message")}
        onKeyPress = {this.messageOnKeyChange}
        />

    </footer>
    )
  }
}

export default ChatBar;