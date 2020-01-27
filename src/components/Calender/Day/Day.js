import React from "react";
import Reminder from "./Reminder/Reminder";
import "./Day.scss";
import { Droppable } from 'react-beautiful-dnd';

class Day extends React.Component {

  render() {
    const reminders = this.props.reminders[this.props.date] || [];

    const cssClasses = this.props.firstDayIndex
      ? `day first-index-${this.props.firstDayIndex}`
      : "day";

    return (
      <Droppable droppableId={'day_' + this.props.day}>
        {provided => (
          <article className={cssClasses}
            ref={provided.innerRef}
            {...provided.droppableProps}
          >
            <React.Fragment>
              <header>{this.props.day}</header>

              {reminders.length
                ? reminders.map((reminder, i) => {
                  return (
                    <Reminder
                      key={i}
                      reminder={reminder}
                      handleDeleteReminder={this.handleDeleteReminder}
                    />
                  );
                })
                : null}
            </React.Fragment>

          </article>)}
      </Droppable>
    );
  }
}

export default Day;