import React, { Component } from "react";
import Aux from '../../../hoc/Auxiliary/Auxiliary';
import { Droppable } from 'react-beautiful-dnd';

import Reminder from "./Reminder/Reminder";

import "./Day.scss";
import { Modal, Button } from "reactstrap";

class Day extends Component {

  constructor(props) {
    super(props);
    this.state = {
      showFullReminder: false,
      remindersPlusCount: 0,
      showFooter: false
    }
    this.showFullReminderHandle = this.showFullReminderHandle.bind(this);
  }



  componentDidMount() {
    if (this.props.reminders !== null && this.props.reminders !== undefined) {
      if (this.props.reminders.length > 4) {
        this.setState({ showFooter: true, remindersPlusCount: this.props.reminders.length - 4 });
      }
    }
  }

  showFullReminderHandle() {
    this.setState({ showFullReminder: !this.state.showFullReminder });
  }

  buildPreReminder = () => {
    const preReminders = [];
    const fullReminders = [];
    if (this.props.reminders !== null && this.props.reminders !== undefined) {
      if (this.props.reminders.length > 0) {
        let array = this.props.reminders;
        let remindersCount = 0;
        array.forEach(element => {
          if (element.user) {
            if (remindersCount <= 3) {
              preReminders.push(<Reminder
                key={element.id}
                name={element.user.fullName}
                color={element.location ? element.location.colorCode : "#fff"}
                onClickDeleteReminder={() => this.props.deleteReminder(element.id)}
              />);
              remindersCount += 1;
            }

            fullReminders.push(<Reminder
              key={element.id}
              name={element.user.fullName}
              color={element.location ? element.location.colorCode : "#fff"}
              onClickDeleteReminder={() => this.props.deleteReminder(element.id)}
            />);
          }
        });
      }
    }
    return preReminders;
  }


  buildFullReminder = () => {

    console.log("Full Reminder");

    const fullReminders = [];
    if (this.props.reminders !== null && this.props.reminders !== undefined) {
      if (this.props.reminders.length > 4) {
        let array = this.props.reminders;
        array.forEach(element => {
          if (element.user) {
            fullReminders.push(<Reminder
              key={element.id}
              name={element.user.fullName}
              color={element.location ? element.location.colorCode : "#fff"}
              onClickDeleteReminder={() => this.props.deleteReminder(element.id)}
            />);
          }
        });
      }
    }
    return fullReminders;
  }


  render() {
    let preReminders = this.buildPreReminder();
    const fullReminders = this.buildFullReminder();

    let day = this.props.firstDayIndex
      ? `day first-index-${this.props.firstDayIndex}`
      : "day";

    day += this.props.weekend ? " weekend" : "";

    const footer = this.state.showFooter ? <footer className="morefooter"><a className="more" onClick={this.showFullReminderHandle}  >Tümü</a></footer> : null;


    return (
      <Aux>
        <Modal isOpen={this.state.showFullReminder} >
          <div className="modal-header">
            <h5 className="modal-title" id="addModalLabel">{this.props.date}</h5>
            <button
              aria-label="Close"
              className="close"
              data-dismiss="modal"
              type="button"
              onClick={() => this.showFullReminderHandle()}>
              <span aria-hidden={true}>×</span>
            </button>
          </div>
          <div className="modal-body popever">
            {fullReminders}
          </div>
          <div className="modal-footer">
            <Button
              color="secondary"
              data-dismiss="modal"
              type="button"
              onClick={() => this.showFullReminderHandle()}>Kapat</Button>
          </div>
        </Modal>

        <Droppable droppableId={this.props.date}>
          {provided => (
            <article className={day}
              ref={provided.innerRef}
              {...provided.droppableProps}
            >
              <React.Fragment>
                <header>{this.props.day}</header>
                {preReminders}
                {footer}
              </React.Fragment>
            </article>)}
        </Droppable>

      </Aux>
    );
  }
}

export default Day;