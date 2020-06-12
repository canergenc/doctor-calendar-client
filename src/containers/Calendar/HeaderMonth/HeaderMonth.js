import React, { Component } from "react";
import { connect } from "react-redux";
import { Button } from "reactstrap";
import 'pretty-checkbox';
import "./HeaderMonth.scss";

class HeaderMonth extends Component {

  constructor(props) {
    super(props)
    this.state = {
      isDraft: false,
      isDraftChange: false
    }
    this.clickDownload = this.clickDownload.bind(this);
  }

  clickDownload = () => {
    this.props.downloadExcelClick();
  }

  componentDidMount() {
    this.setState({ isDraftChange: false });
  }

  isDraftClick = (event) => {
    this.props.isDraftProcess(event);
  }

  defaultIsDraft = () => {

    if (this.props.isDraft !== undefined) {
      return this.props.isDraft;
    }
    else {
      return false;
    }
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
              <div className="pretty p-switch p-fill special">
                <input type="checkbox" ref="isDraft" defaultChecked={this.props.isDraft} checked={this.defaultIsDraft()} onChange={(event) => this.isDraftClick(event)} />
                <div className="state p-primary">
                  <label className="">Taslak</label>
                </div>
              </div>
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
    isDraft: state.reminders.isDraft
  }
}

export default connect(mapStateToProps, null)(HeaderMonth);
