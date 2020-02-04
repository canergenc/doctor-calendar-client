import React from "react";
import "./HeaderMonth.scss";

const headerMonth = props => (
  <header className="month-header">
    <div className="row">
        <i className="fas fa-chevron-circle-left" onClick={props.prevMonthClick} />
    </div>
    <div className="row">
      <h1>{props.curMonth.name}</h1>
    </div>
    <div className="row" >
      <button onClick={props.nextMonthClick}>
        <i className="fas fa-chevron-circle-right"  />
      </button>
    </div>
  </header>
);

export default headerMonth;
