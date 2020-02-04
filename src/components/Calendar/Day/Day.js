import React, { Component } from "react";
import Reminder from "./Reminder/Reminder";
import "./Day.scss";
import { Droppable } from 'react-beautiful-dnd';

class Day extends Component {

  buildReminder = () => {
    const reminders = [];

    if (this.props.reminders != null && this.props.reminders != undefined) {
      if (this.props.reminders.length>0) {
        debugger;
        let array = this.props.reminders;
        array.forEach(element => {
            reminders.push(<Reminder key={element.userid} date={element.date} />);
          
        });
      }
    }
    return reminders;
  }


  render() {
    let reminders = this.buildReminder();


    // array.forEach((element,i) => {
    //   if (element.calendar && element.calendar.length > 0) {
    //     reminders.push(<Reminder key={i} reminder={element.calendar.date} />);
    //   }
    // });

    // console.log("reminders");

    //console.log("date");
    //console.log(this.props.date);


    const cssClasses = this.props.firstDayIndex
      ? `day first-index-${this.props.firstDayIndex}`
      : "day";

    return (
      <Droppable droppableId={this.props.date}>
        {provided => (
          <article className={cssClasses}
            ref={provided.innerRef}
            {...provided.droppableProps}
          >
            <React.Fragment>
              <header>{this.props.day}</header>
              {reminders}
            </React.Fragment>

          </article>)}
      </Droppable>
    );
  }
}

export default Day;