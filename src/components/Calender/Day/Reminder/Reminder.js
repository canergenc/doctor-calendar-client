import React from "react";
import "./Reminder.scss";

const reminder = props => (
  <article className="reminder" style={{ background: props.reminder.color }}>
    <div className="tools">
      <button onClick={() => props.handleDeleteReminder(props.reminder.id)}>
        <i className="fas fa-trash-alt" />
      </button>
    </div>
  </article>
);

export default reminder;
