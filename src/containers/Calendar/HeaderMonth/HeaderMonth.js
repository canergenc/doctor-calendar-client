import React,{Component} from "react";
import { connect } from "react-redux";
import { Button } from "reactstrap";
import "./HeaderMonth.scss";

class HeaderMonth extends Component {
  

  render() {
    
    return (


      <header className="month-header">
        <div className="row">
          <button className="prevNext" onClick={this.props.prevMonthClick}>
            <i className="fas fa-chevron-circle-left" />
          </button>
        </div>
        <div className="row">
          <h1>
            {this.props.curMonth.name}
            <Button color="primary" style={{ padding: "3px 5px" }} onClick={this.props.downloadExcelClick} size="sm" disabled={this.props.downloading}>


              Excel{this.props.downloading ? <i className="fa fa-refresh fa-spin" style={{ marginLeft: "5px" }}></i> : <i className="fa fa-download" style={{ marginLeft: "5px" }}></i>}

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
    );
  }
}

const mapStateToProps = state => {
  return {
    downloading: state.reminders.downloading
  }
}

export default connect(mapStateToProps, null)(HeaderMonth);
