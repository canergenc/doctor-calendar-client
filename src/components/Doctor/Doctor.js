import React, { Component } from 'react';
import styled from 'styled-components';
import { Draggable } from 'react-beautiful-dnd';

const Container = styled.div`
display: flex;
user-select: none;
padding: 8px;
margin-bottom: 8px;
align-items: flex-start;
align-content: flex-start;
border: 1px solid lightgrey;
border-radius: 4px;
font-size: 18px;
background-color: ${props => (props.isDragging ? 'lightgreen' : 'white')};
`;
const Clone = styled(Container)`
  ~div {
    transform: none!important;
  }
`;
class Doctor extends Component {
    render() {

        return (
            <Draggable
                key={this.props.id}
                draggableId={this.props.id}
                index={this.props.index}>
                {(provided, snapshot) => (
                    <React.Fragment>
                        <Container
                            ref={provided.innerRef}
                            {...provided.draggableProps}
                            {...provided.dragHandleProps}
                            isDragging={snapshot.isDragging}
                        >
                            {this.props.title} {this.props.fullName}
                        </Container>
                        {snapshot.isDragging && (
                            <Clone>{this.props.title} {this.props.fullName}</Clone>
                        )}
                    </React.Fragment>
                )}

            </Draggable>
        )
    }


};

export default Doctor;