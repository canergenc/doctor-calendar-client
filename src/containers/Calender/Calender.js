import React from "react";
import HeaderMonth from "../../components/Calender/HeaderMonth/HeaderMonth";
import HeaderWeekDays from "../../components/Calender/HeaderWeekDays/HeaderWeekDays";
import Day from "../../components/Calender/Day/Day";
import moment from "moment";
import "./Calender.scss";
import { DragDropContext } from 'react-beautiful-dnd';

export default class Calender extends React.Component {
  state = {
    curMonth: {},
    nextMonth: {},
    prevMonth: {},
    year: null,
    month: null
  };

  componentWillMount() {
    console.log('[Calender] componentWillMount');
    this.createState();
  }

  createState() {
    console.log('createState');

    const now = new Date();
    const month = now.getMonth();
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

  handleSetEditDay = day => {
    this.setState({
      curMonth: {
        ...this.state.curMonth,
        editDay: day
      }
    });
  };

  buildDays() {
    console.log('buildDays');
    const days = [];
    const props = {
      editDay: this.state.curMonth.editDay,
      handleSetEditDay: this.handleSetEditDay
    };

    for (let i = 1; i <= this.state.curMonth.days; i++) {
      let date = `${this.state.curMonth.date}-${("0" + i).slice(-2)}`; // Add leading zeros
      props["date"] = date;
      props["day"] = i;

      if (i === 1) {
        props["firstDayIndex"] = moment(date)
          .startOf("month")
          .format("d");
      } else {
        delete props["firstDayIndex"];
      }
      days.push(<Day key={i} {...props} />);
    }
    console.log('build days end');

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


  render() {
    const weekdays = moment.weekdays();
    const days = this.buildDays();

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

