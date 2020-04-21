import React from "react";
import { Button, Badge } from "reactstrap";
import "./HeaderMonth.scss";

const headerMonth = props => {
  return (
    <header className="month-header">
      <div className="row">
        <button onClick={props.prevMonthClick}>
          <i className="fas fa-chevron-circle-left" />
        </button>
      </div>
      <div className="row">
        <h1>{props.curMonth.name}<Button onClick={props.downloadExcelClick}>Excel<i className="fa fa-download" style={{ marginLeft: "5px" }}></i></Button></h1>
      </div>

      <div className="row" >
        <button onClick={props.nextMonthClick}>
          <i className="fas fa-chevron-circle-right" />
        </button>
      </div>
    </header>
  );
}

export default headerMonth;
