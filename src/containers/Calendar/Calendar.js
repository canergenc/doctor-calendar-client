import React, { Component } from "react";
import { connect } from "react-redux";
import * as FileSaver from "file-saver";
import * as XLSX from "xlsx";
import moment from "moment/moment";
import { extendMoment } from "moment-range";
import "moment/locale/tr";
import { helperService } from "../../services";

import HeaderMonth from "./HeaderMonth/HeaderMonth";
import HeaderWeekDays from "./HeaderWeekDays/HeaderWeekDays";
import Day from "./Day/Day";
import Spinner from "../../components/UI/Spinner/Spinner";
import withErrorHandler from "../../hoc/withErrorHandler/withErrorHandler";
import * as actions from "../../store/actions/index";
import Api from "../../hoc/Config/api";
import { CalendarTypes, holidays } from '../../variables/constants';
import "./Calendar.scss";

class Calendar extends Component {
  state = {
    curMonth: {},
    nextMonth: {},
    prevMonth: {},
    year: null,
    month: null,
    calenderDay: [],
    downloading: false,
  };

  componentDidMount() {
    this.createState();
  }

  createState() {
    const now = new Date();
    const month = now.getMonth() + 1;
    const year = now.getFullYear();

    const curMonth =
      year && month ? `${year}-${month}` : moment().format("YYYY-MM");

    this.initReminders(curMonth);
    this.props.setCurMonth(curMonth);

    const nextMonth = moment(curMonth).add(1, "M").format("YYYY-MM");

    const prevMonth = moment(curMonth).subtract(1, "M").format("YYYY-MM");

    this.setState(
      {
        curMonth: {
          date: curMonth,
          name: moment(curMonth).format("MMMM YYYY"),
          days: moment(curMonth).daysInMonth(),
          editDay: null,
        },
        nextMonth: nextMonth,
        prevMonth: prevMonth,
      },
      () => {
        // console.warn(this.state);
      }
    );
  }

  initReminders = (curMonth) => {
    this.props.getIsDraft(curMonth);
    this.props.setCurMonth(curMonth);
    const selectedLocations = [];
    const selectedUsers = [];
    this.props.getReminders(selectedLocations, selectedUsers, curMonth);

    this.props.setActiveLocation("");
    var myCheckbox = document.getElementsByName("radio");
    Array.prototype.forEach.call(myCheckbox, function (el) {
      el.checked = false;
    });
  };

  buildDays() {
    const days = [];
    const props = {};
    if (this.props.reminders && this.props.locations) {
      let reminderIndex = 0;
      let isMonthPast = false;
      var date = new Date();
      let realMonth = date.getFullYear() + "-" + (date.getMonth() + 1);

      if (moment(this.state.curMonth.date) < moment(realMonth, "YYYY-MM")) {
        isMonthPast = true;
      }

      const monthlyHolidays = holidays[moment(this.state.curMonth.date).format("YYYY")][moment(this.state.curMonth.date).format("M")];


      for (let i = 1; i <= this.state.curMonth.days; i++) {
        let date = `${this.state.curMonth.date}-${("0" + i).slice(-2)}`;


        props["date"] = date;
        props["day"] = i;
        const calendar = [];
        let isAddedReminder = false;

        for (
          let index = reminderIndex;
          index < this.props.reminders.length;
          index++
        ) {
          const dateRow = this.props.reminders[index];

          if (
            moment(dateRow.startDate).format("YYYY-MM-DD") ===
            moment(date).format("YYYY-MM-DD")
          ) {
            calendar.push(dateRow);
            isAddedReminder = true;
            reminderIndex = index;
          } else {
            if (isAddedReminder) {
              break;
            }
          }
        }

        props["reminders"] = calendar;
        props["isMonthPast"] = isMonthPast;
        props["deleteReminder"] = this.deleteReminderHandler;

        if (i === 1) {
          let startOfMonth = parseInt(
            moment(date).startOf("month").format("d")
          );

          if (startOfMonth === 0) {
            startOfMonth = 6;
          } else {
            startOfMonth -= 1;
          }
          props["firstDayIndex"] = startOfMonth;
        } else {
          delete props["firstDayIndex"];
        }

        let isWeekend = false;

        if (
          moment(date).isoWeekday() === 6 ||
          moment(date).isoWeekday() === 7
        ) {
          isWeekend = true;
        }


        if (monthlyHolidays && monthlyHolidays.includes(i)) {
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
    const curMonth =
      year && month ? `${year}-${month}` : moment().format("YYYY-MM");

    this.initReminders(curMonth);

    const nextMonth = moment(curMonth).add(1, "M").format("YYYY-MM");

    const prevMonth = moment(curMonth).subtract(1, "M").format("YYYY-MM");

    this.setState(
      {
        curMonth: {
          date: curMonth,
          name: moment(curMonth).format("MMMM YYYY"),
          days: moment(curMonth).daysInMonth(),
          editDay: null,
        },
        nextMonth: nextMonth,
        prevMonth: prevMonth,
      },
      () => {
        // console.warn(this.state);
      }
    );
  };

  prevMonthClickHandler = () => {
    const year = moment(this.state.prevMonth).format("YYYY");
    const month = moment(this.state.prevMonth).format("MM");
    const curMonth =
      year && month ? `${year}-${month}` : moment().format("YYYY-MM");

    this.initReminders(curMonth);

    const nextMonth = moment(curMonth).add(1, "M").format("YYYY-MM");

    const prevMonth = moment(curMonth).subtract(1, "M").format("YYYY-MM");

    this.setState(
      {
        curMonth: {
          date: curMonth,
          name: moment(curMonth).format("MMMM YYYY"),
          days: moment(curMonth).daysInMonth(),
          editDay: null,
        },
        nextMonth: nextMonth,
        prevMonth: prevMonth,
      },
      () => {
        // console.warn(this.state);
      }
    );
  };

  deleteReminderHandler = (reminderId) => {
    this.props.deleteReminder(reminderId, this.props.filterData);
  };

  ec = (r, c) => {
    return XLSX.utils.encode_cell({ r: r, c: c });
  };

  delete_row = (ws, row_index) => {
    let range = XLSX.utils.decode_range(ws["!ref"]);
    for (var R = row_index; R < range.e.r; ++R) {
      for (var C = range.s.c; C <= range.e.c; ++C) {
        ws[this.ec(R, C)] = ws[this.ec(R + 1, C)];
      }
    }
    range.e.r--;
    ws["!ref"] = XLSX.utils.encode_range(range.s, range.e);
  };

  createExcel = async () => {
    if (this.props.reminders) {
      this.setState({ downloading: true });

      const fileType =
        "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8";
      const fileExtension = ".xlsx";

      const momentRange = extendMoment(moment);
      let excelData = [];

      const startOfMonth = moment(this.props.curMonth)
        .startOf("month")
        .format("YYYY-MM-DD");
      const endOfMonth = moment(this.props.curMonth)
        .endOf("month")
        .format("YYYY-MM-DD");
      const range = momentRange.range(startOfMonth, endOfMonth);

      let locations = [];

      // this.props.reminders.forEach((element) => {
      //   if (element.location && element.user) {
      //     if (locations.length === 0) {
      //       const locationName = element.location.name;
      //       locations.push(locationName, 0);
      //     } else {
      //       let isExistColumn = false;
      //       for (let index = 0; index < locations.length; index += 2) {
      //         if (locations[index] === element.location.name) {
      //           isExistColumn = true;
      //         }
      //       }
      //       if (!isExistColumn) {
      //         const locationName = element.location.name;
      //         locations.push(locationName, 0);
      //       }
      //     }
      //   }
      // });

      this.props.locations.forEach((element) => {
        if (element.name) {
          const locationName = element.name;
          locations.push(locationName);
        }
      });



      // for (let index = 0; index < locations.length; index += 2) {
      //   for (let date of range.by("day")) {
      //     let locationSum = 0;
      //     // eslint-disable-next-line no-loop-func
      //     this.props.reminders.forEach((element) => {
      //       if (element.location && element.user) {
      //         if (
      //           moment(element.startDate).format("DD.MM.YYYY") ===
      //           date.format("DD.MM.YYYY")
      //         ) {
      //           if (locations[index] === element.location.name) {
      //             locationSum = locationSum + 1;
      //           }
      //         }
      //       }
      //     });
      //     if (locationSum > locations[index + 1]) {
      //       locations[index + 1] = locationSum;
      //     }
      //   }
      // }

      excelData.push({
        Tarih: moment(startOfMonth).format("DD.MM.YYYY"),
      });

      for (let index = 0; index < locations.length; index += 1) {
        // for (let j = 1; j <= locations[index + 1]; j++) {
        excelData[excelData.length - 1][locations[index]] = "Test";
        // }
      }

      for (let date of range.by("day")) {
        let dateAdded = false;
        let firstAdd = true;
        for (let index = 0; index < this.props.reminders.length; index++) {
          const element = this.props.reminders[index];
          if (element.location && element.user) {
            const locationName = element.location.name;
            if (
              moment(element.startDate).format("DD.MM.YYYY") ===
              date.format("DD.MM.YYYY")
            ) {
              let columnNameIndex = 2;
              if (firstAdd) {
                excelData.push({
                  Tarih: moment(element.startDate).format("DD.MM.YYYY"),
                  [locationName]: element.user.fullName,
                });
                dateAdded = true;
                firstAdd = false;
              } else {
                let isAddedColumn = false;
                while (!isAddedColumn) {
                  if (
                    excelData[excelData.length - 1][
                    locationName
                    ]
                  ) {
                    if (
                      excelData[excelData.length - 1][
                      locationName + "-" + columnNameIndex
                      ]
                    ) {
                      columnNameIndex += 1;
                    }
                    else {
                      excelData[excelData.length - 1][
                        locationName + "-" + columnNameIndex
                      ] = element.user.fullName;
                      dateAdded = true;
                      isAddedColumn = true;
                    }
                  }
                  else {
                    excelData[excelData.length - 1][
                      locationName
                    ] = element.user.fullName;
                    dateAdded = true;
                    isAddedColumn = true;
                  }
                }
              }
            } else {
              if (dateAdded) {
                break;
              }
            }
          }
        }

        if (!dateAdded) {
          excelData.push({
            Tarih: date.format("DD.MM.YYYY"),
          });
        }
      }

      const ws = XLSX.utils.json_to_sheet(excelData);
      this.delete_row(ws, 1);
      const wb = { Sheets: { data: ws }, SheetNames: ["data"] };
      const excelBuffer = XLSX.write(wb, { bookType: "xlsx", type: "array" });
      const data = new Blob([excelBuffer], { type: fileType });
      FileSaver.saveAs(
        data,
        moment(startOfMonth).format("MMMM YYYY") +
        " NÖBET LİSTESİ" +
        fileExtension
      );
      this.setState({ downloading: false });
    }
  };

  downloadExcelHandler = async () => {
    this.setState({ downloading: true });
    setTimeout(() => {
      this.createExcel().then(() => this.setState({ downloading: false }));
    }, 0);
  };

  isDraftProcess = (event) => {

    let isDraft = true;
    const startOfMonth = moment(this.props.curMonth).startOf("month").format("YYYY-MM-DD[T]hh:mm:ss.sss[Z]");

    if (event.target.checked) {
      
      isDraft = false;
    }

    let isWeekend = false;
    if (moment(startOfMonth).isoWeekday() === 6 || moment(startOfMonth).isoWeekday() === 7) {
      isWeekend = true;
    }

    const reminder = {
      groupId: helperService.getGroupId(),
      startDate: startOfMonth,
      endDate: startOfMonth,
      isWeekend: isWeekend,
      type: CalendarTypes.Yayin,
      isDraft: isDraft
    }
    this.props.isDraftProcess(reminder, this.state.curMonth.date);
  }

  render() {
    moment.locale("tr");
    const weekdays = moment.weekdays(true);

    let days = this.props.error ? <p>Takvim yüklenemedi.</p> : <Spinner />;

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
          nextMonth={this.state.nextMonth}
          nextMonthClick={this.nextMonthClickHandler}
          prevMonth={this.state.prevMonth}
          prevMonthClick={this.prevMonthClickHandler}
          downloadExcelClick={this.downloadExcelHandler}
          refreshCalendar={() => this.initReminders(this.state.curMonth.date)}
          downloading={this.state.downloading}
          isDraftProcess={(event) => this.isDraftProcess(event)}
        />


        <HeaderWeekDays days={weekdays} />
        <section className="days">{days}</section>
        <h2 className="h2toplam">
          <span className="dutyCount">Haftaiçi Nöbet: {countOfInWeek}</span>
          <span className="dutyCount">Haftasonu Nöbet: {countOfOnWeekend}</span>
        </h2>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    reminders: state.reminders.reminders,
    filterData: state.reminders.filterData,
    error: state.reminders.error,
    locations: state.locations.locations,
    curMonth: state.calendar.curMonth,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    setCurMonth: (curMonth) => dispatch(actions.setCurMonth(curMonth)),
    deleteReminder: (reminderId, filterData) =>
      dispatch(actions.deleteReminder(reminderId, filterData)),
    setActiveLocation: (locationId) =>
      dispatch(actions.setActiveLocationId(locationId)),
    getReminders: (selectedLocations, selectedUsers, curMonth) =>
      dispatch(
        actions.getReminders(selectedLocations, selectedUsers, curMonth)
      ),
    getIsDraft: (curMonth) =>
      dispatch(
        actions.getIsDraft(curMonth)
      ),
    isDraftProcess: (reminderData, curMonth) => dispatch(actions.isDraftProcess(reminderData, curMonth))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withErrorHandler(Calendar, Api));
