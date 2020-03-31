import React, { Component } from "react";
import HeaderMonth from "../../components/Calendar/HeaderMonth/HeaderMonth";
import HeaderWeekDays from "../../components/Calendar/HeaderWeekDays/HeaderWeekDays";
import Day from "../../components/Calendar/Day/Day";
import Spinner from '../../components/UI/Spinner/Spinner';
import moment from "moment";
import { connect } from "react-redux";
import * as FileSaver from 'file-saver';
import * as XLSX from 'xlsx';
import * as actions from '../../store/actions/index';
import withErrorHandler from "../../hoc/withErrorHandler/withErrorHandler";
import Api from "../../api";
import "moment/locale/tr";
import "./Calendar.scss";
import { helperService } from "../../services";

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
    const filterData = {
      filter: {
        where: {
          groupId: {
            like: helperService.getGroupId()
          }
        },
        include: [
          {
            relation: "group"
          },
          {
            relation: "user"
          },
          {
            relation: "location"
          }
        ]
      }
    }
    this.props.onInitReminders(filterData);
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
    if (this.props.reminders && this.props.locations) {
      for (let i = 1; i <= this.state.curMonth.days; i++) {

        let date = `${this.state.curMonth.date}-${("0" + i).slice(-2)}`;
        props["date"] = date;
        props["day"] = i;
        const calendar = [];

        this.props.reminders.forEach(dateRow => {
          if (moment(dateRow.date).format("YYYY-MM-DD") === moment(date).format("YYYY-MM-DD")) {
            calendar.push(dateRow);
          }
        });

        props["reminders"] = calendar;
        props["deleteReminder"] = this.deleteReminderHandler;

        if (i === 1) {
          let startOfMonth = parseInt(moment(date).startOf("month").format("d"));
          if (startOfMonth === 0) {
            startOfMonth = 6;
          }
          else if (startOfMonth === 6) {
            startOfMonth = 0;
          }
          else {
            startOfMonth -= 1;
          }
          props["firstDayIndex"] = startOfMonth;

        } else {
          delete props["firstDayIndex"];
        }

        let isWeekend = false;

        if (moment(date).weekday() === 6 || moment(date).weekday() === 5) {
          isWeekend = true;
        }

        props["weekend"] = isWeekend;

        days.push(<Day key={i} {...props} />);
      }
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
  sortExpenses() {
    this.expenses = this.expenses.slice().sort(
      (a, b) => {
        if (a.date > b.date) {
          return -1;
        }
        if (a.date < b.date) {
          return 1;
        }
        return 0;
      }
    );
  }
  downloadExcelHandler = () => {
    if (this.props.reminders) {
      const fileType = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
      const fileExtension = '.xlsx';
      // let testData = [
      //   {
      //     "date": "11.11.2020",
      //     "Acil": "Gökhan Kurt",
      //     "Şefaltı": "Can Mercan",
      //     "1. Poliklinik": "Caner Genç",
      //     "": "Ali Rıza Temel"
      //   },
      //   {
      //     "date": "12.11.2020",
      //     "Acil": "Ali Rıza Temel",
      //     "Şefaltı": "Caner Genç",
      //     "1. Poliklinik": "Gökhan Kurt",
      //     "": "Can Mercan"
      //   }
      // ]

      let excelData = [];
      let dates = [];
      this.props.reminders.forEach(element => {
        if (!dates.includes(moment(element.date).format("YYYY-MM-DD"))) {
          dates.push(moment(element.date).format("YYYY-MM-DD"));
        }
      });


      dates.sort(function compare(a, b) {
        var dateA = new Date(a);
        var dateB = new Date(b);
        return dateA - dateB;
      });
      console.log(moment(dates[0]).format("DD.MM.YYYY"));

      console.log(dates);
      for (let i = 0; i < dates.length; i++) {
        let firstAdd = true;
        this.props.reminders.forEach(element => {
          if (element.location && element.user) {
            const locationName = element.location.name;
            if (moment(element.date).format("DD.MM.YYYY") === moment(dates[i]).format("DD.MM.YYYY")) {
              if (firstAdd) {
                excelData.push({
                  "Tarih": moment(element.date).format("DD.MM.YYYY"),
                  [locationName]: element.user.fullName
                });
                firstAdd = false;
              }
              else {
                if (excelData[excelData.length - 1][locationName]) {
                  let isAddedColumn = false;
                  let columnNameIndex = 1;
                  while (!isAddedColumn) {
                    if (excelData[excelData.length - 1][locationName + "_" + columnNameIndex]) {
                      columnNameIndex += 1;
                    }
                    else {
                      excelData[excelData.length - 1][locationName + "_" + columnNameIndex] = element.user.fullName;
                      isAddedColumn = true;
                    }
                  }
                }
                else {
                  excelData[excelData.length - 1][locationName] = element.user.fullName;
                }
              }
            }
          }
        });
      }

      console.log(excelData);


      const ws = XLSX.utils.json_to_sheet(excelData);
      const wb = { Sheets: { 'data': ws }, SheetNames: ['data'] };
      const excelBuffer = XLSX.write(wb, { bookType: 'xlsx', type: 'array' });
      const data = new Blob([excelBuffer], { type: fileType });
      FileSaver.saveAs(data, "test" + fileExtension);
    }
  }

  render() {
    moment.locale('tr');
    const weekdays = moment.weekdays(true);

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
          downloadExcelClick={this.downloadExcelHandler}
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
    locations: state.locations.locations,
    error: state.reminders.error,

  };
};

const mapDispatchToProps = dispatch => {
  return {

    deleteReminder: (reminderId) => dispatch(actions.deleteReminder(reminderId)),
    onInitReminders: (filterData) => dispatch(actions.getReminders(filterData))
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(Calendar, Api));
