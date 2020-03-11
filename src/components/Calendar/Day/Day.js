import React, { Component } from "react";
import Reminder from "./Reminder/Reminder";
import "./Day.scss";
import { Droppable } from 'react-beautiful-dnd';

class Day extends Component {

  buildReminder = () => {
    const reminders = [];

    if (this.props.reminders !== null && this.props.reminders !== undefined) {
      if (this.props.reminders.length > 0) {
        let array = this.props.reminders;
        array.forEach(element => {
          console.log("build reminder");
          
          console.log(element);
          
          if (element.user) {

            reminders.push(<Reminder
              key={element.id}
              name={element.user.fullName}
              color={element.location ? element.location.colorCode : "#fff"}
              onClickDeleteReminder={() => this.props.deleteReminder(element.id)}
            />
            );
          }
        });
      }
    }
    return reminders;
  }


  render() {
    let reminders = this.buildReminder();

    let cssClasses = this.props.firstDayIndex
      ? `day first-index-${this.props.firstDayIndex}`
      : "day";

    cssClasses += this.props.weekend ? " weekend" : "";

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