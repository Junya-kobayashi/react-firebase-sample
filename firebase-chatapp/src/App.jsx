import React, { Component } from 'react';
import './App.css';
import { firebaseDB } from './firebase/index.js'
import Message from './components/Message'
import ChatBox from './components/ChatBox'

const messageRef = firebaseDB.ref('messages')

class App extends Component {
  constructor(props) {
    super(props);
    this.onTextChange = this.onTextChange.bind(this);
    this.onButtonClick = this.onButtonClick.bind(this);
    this.state = {
      text: "",
      user_name: "",
      profile_image: "",
      messages: []
    }
  }

  onTextChange(e) {
    if (e.target.name == 'user_name') {
      this.setState({
        "user_name": e.target.value,
      })
    } else if (e.target.name == 'profile_image') {
      this.setState({
        "profile_image": e.tarrge.value,
      })
    } else if (e.target.name == 'text') {
      this.setState({
        "text": e.target.value,
      })
    }
  }

  onButtonClick() {
    if (this.state.user_name == "") {
      alert('user_name empty');
      return;
    }else if (this.state.text == "") {
      alert('text empty');
    }
    messageRef.push({
      "user_name": this.state.user_name,
      "profile_image": this.state.profile_image,
      "text": this.state.text,
    })

  }

  componentWillMount() {
    messageRef.on('child_added', (snapshot) => {
      const m = snapshot.val();
      let msgs = this.state.messages

      msgs.push({
        'text': m.text,
        'user_name': m.user_name,
        'profile_image': m.profile_image,
      })

      this.setState({
         messages: msgs
      })
    })
  }

  render() {
    return (
      <div className="App">
        <div className="App-header">
          <h2>Chat</h2>
        </div>
        <div className="MessageList">
          {this.state.messages.map((m, i) => {
            return <Message key={i} message={i} />
          })}
        </div>
        <ChatBox onTextChange={this.onTextChange} onButtonClick={this.onButtonClick} />
      </div>
    )
  }
}

export default App;