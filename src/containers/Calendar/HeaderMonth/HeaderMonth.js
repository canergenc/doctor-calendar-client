import React, { Component } from "react";
import { connect } from "react-redux";
import { Button } from "reactstrap";
import "./HeaderMonth.scss";

class HeaderMonth extends Component {

  constructor(props) {
    super(props)
    this.clickDownload = this.clickDownload.bind(this);

  }




  clickDownload = () => {
    console.log('clickDownload start');

    this.props.downloadExcelClick();

    console.log('clickDownload end');
  }


  render() {


    return (
      <div>

        <header className="month-header">
          <div className="row">
            <button className="prevNext" onClick={this.props.prevMonthClick}>
              <i className="fas fa-chevron-circle-left" />
            </button>
          </div>
          <div className="row">
            <h1 >
              {this.props.curMonth.name}
              <Button color="primary" style={{ padding: "3px 5px" }} onClick={() => this.clickDownload()} size="sm" disabled={this.props.downloading}>
                Excel
              {this.props.downloading ? <i className="fa fa-refresh fa-spin" style={{ marginLeft: "5px" }}></i> : <i className="fa fa-download" style={{ marginLeft: "5px" }}></i>}
              </Button>
              <Button color="primary" style={{ padding: "3px 5px" }} onClick={this.props.refreshCalendar} size="sm" ><i className="fas fa-sync-alt" style={{ fontSize: "12px", color: "white" }}></i></Button>
            </h1>

          </div>
          <div className="row" >
            <button className="prevNext" onClick={this.props.nextMonthClick}>
              <i className="fas fa-chevron-circle-right" />
            </button>
          </div>
        </header>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    downloadingRedux: state.reminders.downloading
  }
}

export default connect(mapStateToProps, null)(HeaderMonth);
