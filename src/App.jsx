import React, {Component} from 'react';
import ChatBar from './ChatBar.jsx';
import MessageList from './MessageList.jsx';


class App extends Component {

  state = {
    // title: 'Chatty'
  }

  render() {
    return (
    <div className="wrapper">
      <nav>
        <h1>Chatty</h1>
      </nav>
        <MessageList />
        <ChatBar />
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