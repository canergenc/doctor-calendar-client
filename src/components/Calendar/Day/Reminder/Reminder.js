import React, { Component } from "react";
import "./Reminder.scss";

class Reminder extends Component {

  render() {
    return (
      <article className={"reminder" +" "+ this.props.color} >
        <div className="tools">
          <button onClick={this.props.onClickDeleteReminder}>
            <i className="fas fa-trash-alt" />
          </button>
        </div>
        <strong>{this.props.description}</strong>
      </article>
    );
  }
};

export default Reminder;
