import React, { Component } from 'react';
import styled from 'styled-components';
import { Draggable } from 'react-beautiful-dnd';

const Container = styled.div`
border: 1px solid lightgrey;
border-radius: 2px;
padding: 8px;
margin-bottom: 8px;
font-size: 18px;
background-color: ${props => (props.isDragging ? 'lightgreen' : 'white')};
`;

class Doctor extends Component {
    render() {

        return (
            <Draggable draggableId={this.props.id} index={this.props.index}>
                {(provided, snapshot) => (

                    <Container
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                        ref={provided.innerRef}
                        isDragging={snapshot.isDragging}
                    >
                        {this.props.title} {this.props.name}
                    </Container>
                )}

            </Draggable>
        )
    }


};

export default Doctor;