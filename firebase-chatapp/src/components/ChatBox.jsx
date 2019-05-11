import React, { Component } from "react";

export default class ChatBox extends Component {
  render() {
    return (
      <div className="chatBox">
        <div>
          <input name="user_name" onChange={this.props.onTextChange} placeholder="名前" type="text" />
          <input name="prifile_image" onChange={this.props.onTextChange} placeholder="プロフィール画像URL" type="text"/>
        </div>

        <textarea name="text" id="" cols="30" rows="10" onChange={this.props.onTextChange}></textarea>
        <button onClick={this.props.onButtonClick}>送信</button>
      </div>
    )
  }
}