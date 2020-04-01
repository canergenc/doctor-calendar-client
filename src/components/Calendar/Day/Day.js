import React, { Component } from "react";
import Aux from '../../../hoc/Auxiliary/Auxiliary';
import { Droppable } from 'react-beautiful-dnd';

import Reminder from "./Reminder/Reminder";

import "./Day.scss";
import { Button } from "reactstrap";
import Modal from '../../UI/Modal/Modal';
import moment from "moment";

class Day extends Component {

  constructor(props) {
    super(props);
    this.state = {
      showFullReminder: false,
      showFooter: false
    }
    this.showFullReminderHandle = this.showFullReminderHandle.bind(this);
  }



  componentDidMount() {
    if (this.props.reminders !== null && this.props.reminders !== undefined) {
      if (this.props.reminders.length > 4) {
        this.setState({ showFooter: true });
      }
    }
  }

  showFullReminderHandle() {
    this.setState({ showFullReminder: !this.state.showFullReminder });
  }

  buildPreReminder = () => {
    const preReminders = [];
    if (this.props.reminders !== null && this.props.reminders !== undefined) {
      if (this.props.reminders.length > 0) {
        let array = this.props.reminders;
        let remindersCount = 0;
        array.slice().reverse().forEach(element => {
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

          }
        });
      }
    }
    return preReminders;
  }


  buildFullReminder = () => {


    const fullReminders = [];
    if (this.props.reminders !== null && this.props.reminders !== undefined) {
      if (this.props.reminders.length > 0) {
        let array = this.props.reminders;
        array.slice().reverse().forEach(element => {
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
    const dateString = moment(this.props.date).format("DD MMMM YYYY");

    return (
      <Aux>
        <Modal show={this.state.showFullReminder} >
          <div className="modal-header">
            <h5 className="modal-title" id="addModalLabel">{dateString}</h5>
            <button
              aria-label="Close"
              className="close"
              data-dismiss="modal"
              type="button"
              onClick={() => this.showFullReminderHandle()}>
              <span aria-hidden={true}>×</span>
            </button>
          </div>
          <Droppable droppableId={this.props.date}>
            {provided => (
              <div className="modal-body popever"
                ref={provided.innerRef}
                {...provided.droppableProps}
              >
                <React.Fragment>
                  {fullReminders}
                </React.Fragment>
              </div>)}
          </Droppable>
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