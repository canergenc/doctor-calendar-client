import React from "react";
import "./Reminder.scss";

const reminder = props => (
  <article className="reminder" style={{ background: "black" }}>
    <div className="tools">
      <button >
        <i className="fas fa-trash-alt" />
      </button>
    </div>
    <strong>{props.date}</strong>
  </article>
);

export default reminder;
