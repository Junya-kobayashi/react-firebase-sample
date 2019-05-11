import React ,{ Component } from "react";

export default class Message extends Component {
  render() {
    return (
      <div className="Message">
        <img src={this.props.message.profile_image} alt="" />
        <div>
          <p>@{this.props.message.user_name}</p>
          <p>{this.props.message.text}</p>
        </div>
      </div>
    )
  }
}