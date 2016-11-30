import React, {Component} from 'react';

class ChatBar extends Component {
  constructor (props) {

    super(props)

    this.state = {
      username : "Enter your username (Optional)",
      message: "Enter your message and hit enter"
    }

  //   this.handleChange = this.handleChange.bind(this);

  //   handleChange(event) {
  //   this.setState({value: event.target.value});
  // }

  }

  // ComponentDidMount() {
  //     this.setState({
  //     username: this.props.currentUser.name,
  //   })
  // }

  render () {
    console.log("Rendering <ChatBar/>");
    return (
    <footer className= "ChatBar">
      <input id="username" defaultValue={this.props.currentUser.name}/>
      <input id="new-message" defaultValue={this.state.message}
        onChange = { (ev) => {this.setState({message: ev.target.value})}}
        onKeyPress = { (ev) => { if (ev.key === 'Enter') {
          // this.props.inputMessage(ev.target.value)
          this.props.sendNewMessage(ev.target.value)
        // (ev.target.value)
        }
      }}/>
    </footer>
    )
  }
}

export default ChatBar;