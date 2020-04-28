import React, { Component } from "react";
import Aux from '../../../hoc/Auxiliary/Auxiliary';
import { Droppable } from 'react-beautiful-dnd';

import Reminder from "./Reminder/Reminder";

import "./Day.scss";
import { Button } from "reactstrap";
import Modal from '../../../components/UI/Modal/Modal';
import moment from "moment";

class Day extends Component {

  constructor(props) {
    super(props);
    this.state = {
      showFullReminder: false,
      dayCount: 0,
      showFooter: false
    }
    this.showFullReminderHandle = this.showFullReminderHandle.bind(this);
  }



  componentDidMount() {
    if (this.props.reminders !== null && this.props.reminders !== undefined) {
      if (this.props.reminders.length > 4) {
        this.setState({ showFooter: true, dayCount: this.props.reminders.length - 4 });
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
        array.slice().reverse().forEach((element, index) => {
          if (element.user) {
            if (remindersCount <= 3) {
              preReminders.push(<Reminder
                isDrag={true}
                id={element.id}
                key={element.id}
                location={element.location.name}
                name={element.user.fullName}
                index={index}
                color={element.location ? element.location.colorCode : "#fff"}
                onClickDeleteReminder={() => this.props.deleteReminder(element.id)}
              />);
              remindersCount += 1;
            }
          }
        });

        if (remindersCount === 4) {
          if (this.props.reminders.length > 4) {
            preReminders.push(<footer className="morefooter" key={5}><div className="more" onClick={() => this.showFullReminderHandle()} >+{this.props.reminders.length - 4} kayıt</div></footer>)
          }
        }
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
          if (element.user && element.location) {
            fullReminders.push(<Reminder
              isDrag={false}
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
    let fullReminders = null;
    if (this.state.showFullReminder) {
      fullReminders = this.buildFullReminder();
    }

    let day = this.props.firstDayIndex
      ? `day first-index-${this.props.firstDayIndex}`
      : "day";

    day += this.props.weekend ? " weekend" : "";

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
          <div className="modal-body popever">
            <React.Fragment>
              {fullReminders}
            </React.Fragment>
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
              </React.Fragment>
            </article>)}
        </Droppable>

      </Aux>
    );
  }
}

export default Day;