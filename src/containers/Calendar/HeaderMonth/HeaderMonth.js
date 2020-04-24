import React from "react";
import { Button } from "reactstrap";
import "./HeaderMonth.scss";

const headerMonth = props => {
  return (
    <header className="month-header">
      <div className="row">
        <button className="prevNext" onClick={props.prevMonthClick}>
          <i className="fas fa-chevron-circle-left" />
        </button>
      </div>
      <div className="row">
        <h1>
          {props.curMonth.name}
          <Button color="primary" style={{padding:"3px 5px"}} onClick={props.downloadExcelClick} size="sm">Excel<i className="fa fa-download" style={{ marginLeft: "5px" }}></i></Button>
          <Button color="primary" style={{padding:"3px 5px"}} onClick={props.refreshCalendar} size="sm" ><i className="fas fa-sync-alt" style={{fontSize:"12px",color:"white"}}></i></Button>
        </h1>
      </div>
      

      <div className="row" >
        <button className="prevNext" onClick={props.nextMonthClick}>
          <i className="fas fa-chevron-circle-right" />
        </button>
      </div>
    </header>
  );
}

export default headerMonth;
