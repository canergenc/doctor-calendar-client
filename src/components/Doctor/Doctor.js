import React, { Component } from 'react';
import './Doctor.css';
import { Draggable } from 'react-beautiful-dnd';

class Doctor extends Component {
    render() {

        return (
            <Draggable draggableId={this.props.id} index={this.props.index}>
                {provided => (

                    <div className="doctor"
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                        ref={provided.innerRef}
                    >
                        {this.props.title} {this.props.name}
                    </div>
                )}

            </Draggable>
        )
    }


};

export default Doctor;