import React, {Component} from 'react';

class ChatBar extends Component {
  constructor (props) {

    super(props)

    this.state = {
      username : "",
      // username : this.props.currentUser.name,
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
      let object = {};
      object[key] = ev.target.value;
      this.setState(object);
    }
  }

  // handleChangeMike = (ev) => {
  //   this.setState({username: ev.target.value})

  //   this.props.updateUsername(ev.target.value)

  // }

  messageOnKeyChange = (ev) => {
    if (ev.key === 'Enter') {
      this.props.sendUserMessage(ev.target.value);
      this.setState({message: ""});
    }
  }

  usernameOnKeyEnter = (ev) => {
    if (ev.key === 'Enter') {

      console.log(this.state.username)
      console.log(this.props.currentUser.name)
      if (ev.target.value !== this.props.currentUser.name) {
        console.log("different username!")
        this.props.usernameChangeNotification(ev.target.value)
      }
      // this.props.updateUsername(ev.target.value);
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
        placeholder = "Type your username and press Enter"
        value = {this.state.username}
        onChange = {this.getHandleChangeFn("username")}
        onKeyPress = {this.usernameOnKeyEnter}
          // this.props.updateUsername(this.state.username)
      />

      <input
        id = "new-message"
        placeholder = "Type message"
        value = {this.state.message}
        onChange = {this.getHandleChangeFn("message")}
        onKeyPress = {this.messageOnKeyChange}
        />

    </footer>
    )
  }
}

export default ChatBar;