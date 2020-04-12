import React, { Component } from "react";
import { Draggable } from 'react-beautiful-dnd';
import "./Reminder.scss";

class Reminder extends Component {

  getItemStyle = (isDragging, draggableStyle) => ({
    // some basic styles to make the items look a bit nicer
    userSelect: "none",

    // change background colour if dragging
    background: isDragging ? "gray" : "",

    // styles we need to apply on draggables
    ...draggableStyle
  });

  render() {
    let sass = null;
    if (this.props.isDrag) {
      sass =  (<Draggable
          key={this.props.id}
          draggableId={this.props.id}
          index={this.props.index}>
          {(provided, draggableSnapshot) => (
            <article className={"reminder " + this.props.color}
              ref={provided.innerRef}
              {...provided.draggableProps}
              {...provided.dragHandleProps}
              style={this.getItemStyle(
                draggableSnapshot.isDragging,
                provided.draggableProps.style
              )}
            >
              <div className="tools">
                <button onClick={this.props.onClickDeleteReminder}>
                  <i className="fas fa-times" />
                </button>
              </div>
              {this.props.name}
            </article>
          )}
        </Draggable>)
      
    }
    else {
      sass = (<article className={"reminder " + this.props.color}
          key={this.props.id}>
          <div className="tools">
            <button onClick={this.props.onClickDeleteReminder}>
              <i className="fas fa-times" />
            </button>
          </div>
          {this.props.name}
        </article>)
      
    }
    return sass;
  }
};

export default Reminder;
