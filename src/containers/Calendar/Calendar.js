import React, { Component } from "react";
import HeaderMonth from "../../components/Calendar/HeaderMonth/HeaderMonth";
import HeaderWeekDays from "../../components/Calendar/HeaderWeekDays/HeaderWeekDays";
import Day from "../../components/Calendar/Day/Day";
import Spinner from '../../components/UI/Spinner/Spinner';
import moment from "moment";
import "./Calendar.scss";
import { connect } from "react-redux";
import * as actions from '../../store/actions/index';
import withErrorHandler from "../../hoc/withErrorHandler/withErrorHandler";
import Api from '../../api';

class Calendar extends Component {

  state = {
    curMonth: {},
    nextMonth: {},
    prevMonth: {},
    year: null,
    month: null,
    calenderDay: []
  };

  componentDidMount() {
    console.log('[Calendar] componentDidMount');
    this.props.onInitReminders();
    this.createState();
  }

  createState() {
    console.log('createState');

    const now = new Date();
    const month = now.getMonth() + 1;
    const year = now.getFullYear();

    const curMonth =
      year && month
        ? `${year}-${month}`
        : moment().format("YYYY-MM");

    const nextMonth = moment(curMonth)
      .add(1, "M")
      .format("YYYY-MM");

    const prevMonth = moment(curMonth)
      .subtract(1, "M")
      .format("YYYY-MM");

    this.setState(
      {
        curMonth: {
          date: curMonth,
          name: moment(curMonth).format("MMMM YYYY"),
          days: moment(curMonth).daysInMonth(),
          editDay: null
        },
        nextMonth: nextMonth,
        prevMonth: prevMonth
      },
      () => {
        // console.warn(this.state);
      }
    );
  }

  buildDays() {
    
    console.log("buildDays");

    const days = [];
    const props = {};

    for (let i = 1; i <= this.state.curMonth.days; i++) {
      let date = `${this.state.curMonth.date}-${("0" + i).slice(-2)}`; // Add leading zeros
      props["date"] = date;
      props["day"] = i;
      const calendar = [];
      
      if (this.props.reminders) {
        this.props.reminders.forEach(dateRow => {
          if (moment.unix(dateRow.date._seconds).format("YYYY-MM-DD") === moment(date).format("YYYY-MM-DD")) {
            calendar.push(dateRow);
          }
        });
      }

      props["reminders"] = calendar;
      props["deleteReminder"] = this.deleteReminderHandler;

      if (i === 1) {
        props["firstDayIndex"] = moment(date)
          .startOf("month")
          .format("d");
      } else {
        delete props["firstDayIndex"];
      }
      days.push(<Day key={i} {...props} />);
    }
    return days;
  }

  nextMonthClickHandler = () => {
    const year = moment(this.state.nextMonth).format("YYYY");
    const month = moment(this.state.nextMonth).format("MM");
    console.log(this.state.nextMonth);
    const curMonth =
      year && month
        ? `${year}-${month}`
        : moment().format("YYYY-MM");

    const nextMonth = moment(curMonth)
      .add(1, "M")
      .format("YYYY-MM");

    const prevMonth = moment(curMonth)
      .subtract(1, "M")
      .format("YYYY-MM");

    this.setState(
      {
        curMonth: {
          date: curMonth,
          name: moment(curMonth).format("MMMM YYYY"),
          days: moment(curMonth).daysInMonth(),
          editDay: null
        },
        nextMonth: nextMonth,
        prevMonth: prevMonth
      },
      () => {
        // console.warn(this.state);
      }
    );
  }

  prevMonthClickHandler = () => {
    const year = moment(this.state.prevMonth).format("YYYY");
    const month = moment(this.state.prevMonth).format("MM");
    console.log(this.state.prevMonth);
    const curMonth =
      year && month
        ? `${year}-${month}`
        : moment().format("YYYY-MM");

    const nextMonth = moment(curMonth)
      .add(1, "M")
      .format("YYYY-MM");

    const prevMonth = moment(curMonth)
      .subtract(1, "M")
      .format("YYYY-MM");

    this.setState(
      {
        curMonth: {
          date: curMonth,
          name: moment(curMonth).format("MMMM YYYY"),
          days: moment(curMonth).daysInMonth(),
          editDay: null
        },
        nextMonth: nextMonth,
        prevMonth: prevMonth
      },
      () => {
        // console.warn(this.state);
      }
    );
  }

  deleteReminderHandler = (reminderId) => {
    this.props.deleteReminder(reminderId);
  }

  render() {
    const weekdays = moment.weekdays();

    let days = this.props.error ? <p>Takvim yüklenemedi.</p> : <Spinner />

    if (this.props.reminders) {
      days = this.buildDays();
    }

    return (
      <div className="month">
        <HeaderMonth
          curMonth={this.state.curMonth}
          nextMonth={this.state.nextMonth}
          nextMonthClick={this.nextMonthClickHandler}
          prevMonth={this.state.prevMonth}
          prevMonthClick={this.prevMonthClickHandler}
        />
        <HeaderWeekDays days={weekdays} />
        <section className="days">{days}</section>
      </div>
    );
  }
}


const mapStateToProps = state => {
  return {
    reminders: state.reminders.reminders,
    error: state.reminders.error
  };
};

const mapDispatchToProps = dispatch => {
  return {
    deleteReminder: (reminderId) => dispatch(actions.deleteReminder(reminderId)),
    onInitReminders: () => dispatch(actions.initReminders())
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(Calendar, Api));
