import React, { Component } from "react";
import { connect } from "react-redux";
import * as FileSaver from 'file-saver';
import * as XLSX from 'xlsx';
import moment from "moment";
import { extendMoment } from 'moment-range';
import "moment/locale/tr";
import { helperService } from "../../services";
import { CalendarTypes } from "../../variables/constants";

import HeaderMonth from "./HeaderMonth/HeaderMonth";
import HeaderWeekDays from "./HeaderWeekDays/HeaderWeekDays";
import Day from "./Day/Day";
import Spinner from '../../components/UI/Spinner/Spinner';
import withErrorHandler from "../../hoc/withErrorHandler/withErrorHandler";
import * as actions from '../../store/actions/index';
import Api from "../../api";
import { Badge } from "reactstrap";
import "./Calendar.scss";

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
    this.createState();
  }

  createState() {

    const now = new Date();
    const month = now.getMonth() + 1;
    const year = now.getFullYear();

    const curMonth =
      year && month
        ? `${year}-${month}`
        : moment().format("YYYY-MM");

    this.initReminders(curMonth);
    this.props.setCurMonth(curMonth);

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

  initReminders = (curMonth) => {
    const startOfMonth = moment(curMonth).startOf('month').format('YYYY-MM-DD');
    const endOfMonth = moment(curMonth).endOf('month').format('YYYY-MM-DD');
    this.props.setCurMonth(curMonth);
    const filterData = {
      filter: {
        where: {
          startDate: {
            between: [
              startOfMonth,
              endOfMonth
            ]
          },
          groupId: {
            like: helperService.getGroupId()
          },
          type: CalendarTypes.Nobet
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

    this.props.getReminders(filterData);

  }

  buildDays() {

    const days = [];
    const props = {};
    if (this.props.reminders && this.props.locations) {
      for (let i = 1; i <= this.state.curMonth.days; i++) {

        let date = `${this.state.curMonth.date}-${("0" + i).slice(-2)}`;
        props["date"] = date;
        props["day"] = i;
        const calendar = [];

        this.props.reminders.forEach((dateRow, index) => {
          if (moment(dateRow.startDate).format("YYYY-MM-DD") === moment(date).format("YYYY-MM-DD")) {
            // dateRow.index = index;
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
          else {
            startOfMonth -= 1;
          }
          props["firstDayIndex"] = startOfMonth;

        } else {
          delete props["firstDayIndex"];
        }

        let isWeekend = false;

        if (moment(date).isoWeekday() === 6 || moment(date).isoWeekday() === 7) {
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

    this.initReminders(curMonth);

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

    this.initReminders(curMonth);

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
    this.props.deleteReminder(reminderId, this.props.filterData);
  }

  ec = (r, c) => {
    return XLSX.utils.encode_cell({ r: r, c: c })
  }

  delete_row = (ws, row_index) => {
    let range = XLSX.utils.decode_range(ws["!ref"])
    for (var R = row_index; R < range.e.r; ++R) {
      for (var C = range.s.c; C <= range.e.c; ++C) {
        ws[this.ec(R, C)] = ws[this.ec(R + 1, C)]
      }
    }
    range.e.r--
    ws['!ref'] = XLSX.utils.encode_range(range.s, range.e)
  }

  downloadExcelHandler = () => {
    if (this.props.reminders) {
      console.log("downloadExcelHandler");

      const fileType = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
      const fileExtension = '.xlsx';

      const momentRange = extendMoment(moment);
      let excelData = [];

      const startOfMonth = moment(this.props.curMonth).startOf('month').format('YYYY-MM-DD');
      const endOfMonth = moment(this.props.curMonth).endOf('month').format('YYYY-MM-DD');
      const range = momentRange.range(startOfMonth, endOfMonth);

      let locations = [];

      this.props.reminders.forEach(element => {
        if (element.location && element.user) {
          if (locations.length === 0) {
            const locationName = element.location.name;
            locations.push(locationName, 0);
          }
          else {
            let isExistColumn = false
            for (let index = 0; index < locations.length; index += 2) {
              if (locations[index] === element.location.name) {
                isExistColumn = true;
              }
            }
            if (!isExistColumn) {
              const locationName = element.location.name;
              locations.push(locationName, 0);
            }
          }
        }
      });

      for (let index = 0; index < locations.length; index += 2) {
        for (let date of range.by("day")) {
          let locationSum = 0;
          // eslint-disable-next-line no-loop-func
          this.props.reminders.forEach(element => {
            if (element.location && element.user) {
              if (moment(element.date).format("DD.MM.YYYY") === date.format("DD.MM.YYYY")) {
                if (locations[index] === element.location.name) {
                  locationSum = locationSum + 1;
                }
              }
            }
          });
          if (locationSum > locations[index + 1]) {
            locations[index + 1] = locationSum;
          }
        }
      }


      excelData.push({
        "Tarih": moment(startOfMonth).format("DD.MM.YYYY")
      });

      for (let index = 0; index < locations.length; index += 2) {

        for (let j = 1; j <= locations[index + 1]; j++) {

          excelData[excelData.length - 1][locations[index] + "-" + j] = "Test";

        }

      }



      for (let date of range.by("day")) {

        let dateAdded = false;
        let firstAdd = true;
        this.props.reminders.forEach(element => {
          if (element.location && element.user) {
            const locationName = element.location.name;
            if (moment(element.date).format("DD.MM.YYYY") === date.format("DD.MM.YYYY")) {
              let columnNameIndex = 1;
              if (firstAdd) {
                excelData.push({
                  "Tarih": moment(element.date).format("DD.MM.YYYY"),
                  [locationName + "-" + columnNameIndex]: element.user.fullName
                });
                dateAdded = true;
                firstAdd = false;
              }
              else {
                let isAddedColumn = false;
                while (!isAddedColumn) {
                  if (excelData[excelData.length - 1][locationName + "-" + columnNameIndex]) {
                    columnNameIndex += 1;
                  }
                  else {
                    excelData[excelData.length - 1][locationName + "-" + columnNameIndex] = element.user.fullName;
                    dateAdded = true;
                    isAddedColumn = true;
                  }
                }
              }
            }
          }
        });
        if (!dateAdded) {
          excelData.push({
            "Tarih": date.format("DD.MM.YYYY")
          });
        }
      }

      // console.log(excelData);


      const ws = XLSX.utils.json_to_sheet(excelData);
      this.delete_row(ws, 1)
      const wb = { Sheets: { 'data': ws }, SheetNames: ['data'] };
      const excelBuffer = XLSX.write(wb, { bookType: 'xlsx', type: 'array' });
      const data = new Blob([excelBuffer], { type: fileType });
      FileSaver.saveAs(data, moment(startOfMonth).format("MMMM YYYY") + " NÖBET LİSTESİ" + fileExtension);
    }
  }

  render() {
    moment.locale('tr');
    const weekdays = moment.weekdays(true);

    let days = this.props.error ? <p>Takvim yüklenemedi.</p> : <Spinner />

    if (this.props.reminders) {
      days = this.buildDays();
    }


    if (this.props.reminders) {

      var countOfOnWeekend = 0;
      var countOfInWeek = 0;

      var reminders = this.props.reminders;

      var result = helperService.countOfInWeekOrWeekend(reminders);

      countOfOnWeekend = result.countOfOnWeekend;
      countOfInWeek = result.countOfInWeek;

    }

    return (
      <div className="month">
        <HeaderMonth
          curMonth={this.state.curMonth}
          countOfOnWeekend={countOfOnWeekend}
          countOfInWeek={countOfInWeek}
          nextMonth={this.state.nextMonth}
          nextMonthClick={this.nextMonthClickHandler}
          prevMonth={this.state.prevMonth}
          prevMonthClick={this.prevMonthClickHandler}
          downloadExcelClick={this.downloadExcelHandler}
        />

        <HeaderWeekDays days={weekdays} />
        <section className="days">{days}</section>
        <h2 className="h2toplam"><span>Haftaiçi Nöbet: {countOfInWeek}</span><span>Haftasonu Nöbet: {countOfOnWeekend}</span></h2>
        
        
      </div>
    );
  }
}


const mapStateToProps = state => {
  return {
    reminders: state.reminders.reminders,
    filterData: state.reminders.filterData,
    locations: state.locations.locations,
    error: state.reminders.error,
    curMonth: state.calendar.curMonth
  };
};

const mapDispatchToProps = dispatch => {
  return {
    setCurMonth: (curMonth) => dispatch(actions.setCurMonth(curMonth)),
    deleteReminder: (reminderId, filterData) => dispatch(actions.deleteReminder(reminderId, filterData)),
    getReminders: (filterData) => dispatch(actions.getReminders(filterData))
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(Calendar, Api));
