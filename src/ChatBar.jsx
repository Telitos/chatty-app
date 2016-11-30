import React, {Component} from 'react';

class ChatBar extends Component {
  constructor (props) {

    super(props)

    this.state = {
      username : this.props.currentUser.name,
      message: ""
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

      <input id="username" defaultValue={this.state.username}
        onChange = { (ev) => {
          // console.log(this.state.username)
          this.setState({ username: ev.target.value })

        }
      }
      />

      <input id="new-message" placeholder = "Type message" defaultValue={this.state.message}

        onChange = { (ev) => {
          this.setState({ message: ev.target.value})
        }
      }

        onKeyPress = { (ev) => {
          if (ev.key === 'Enter') {
          // this.props.inputMessage(ev.target.value)
          this.props.sendNewMessage(ev.target.value);
          console.log(this.state.username)
          // (ev.target.value)
        }
      }
    }/>
    </footer>
    )
  }
}

export default ChatBar;