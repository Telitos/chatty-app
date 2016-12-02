import React, {Component} from 'react'


class Message extends Component {

  render() {
    return(
    <div className={this.props.data.class}>
      <span className="username" style = {this.props.color}>{this.props.data.username}</span>
      <span className="content">{this.props.data.content}</span>
    </div>
    )
  }
}


export default Message;

