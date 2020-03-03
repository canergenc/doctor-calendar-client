import React, { Component } from 'react';
import styled from 'styled-components';
import { Draggable } from 'react-beautiful-dnd';
import { connect } from 'react-redux';
import * as actions from '../../store/actions/index';
import 'pretty-checkbox';

const Container = styled.div`
display: flex;
user-select: none;
padding: 8px;
margin-bottom: 6px;
align-items: flex-start;
align-content: flex-start;
border: 1px solid lightgrey;
border-radius: 4px;
font-size: 14px;
background-color: ${props => (props.isDragging ? 'lightgreen' : 'white')};
`;
const Clone = styled(Container)`
  ~div {
    transform: none!important;
  }
`;


class User extends Component {
    constructor(props) {
        super(props);
        this.state = { checkedRadio: null };
    }

    OnSelect = (userId, id) => {
        console.log("userId:", userId);
        
        if (this.props.activeLocationId !== "") {
            this.props.setActiveLocationId("");
        }

        const filterData = {
            params: {
                filter: {
                    where: {
                        userId: {
                            like: userId
                        }
                    },
                    include: [
                        {
                            relation: "location"
                        }
                    ]
                }
            }
        }

        if (this.state.checkedRadio === userId) {
            this.setState({ checkedRadio: "nouserid" });
            id.target.checked = false;
            this.props.iniReminders();
        }
        else {
            this.setState({ checkedRadio: userId });
            id.target.checked = true;
            this.props.getReminders(filterData);
        }
    }


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

                            <div className="pretty p-default p-curve p-fill" style={{ marginLeft: "auto", marginBottom: "auto", marginTop: "auto" }} >
                                <input
                                    type="radio"
                                    name="radio"
                                    onClick={(e) => this.OnSelect(this.props.id, e)}
                                />
                                <div className="state p-success">
                                    <label></label>
                                </div>
                            </div>
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

const mapStateToProps = state => {
    return {
        activeLocationId: state.locations.activeLocationId,
        error: state.reminders.error
    }
}

const mapDispatchToProps = dispatch => {
    return {
        iniReminders: () => dispatch(actions.initReminders()),
        getReminders: (filterData) => dispatch(actions.getReminders(filterData)),
        setActiveLocationId: (locationId) => dispatch(actions.setActiveLocationId(locationId))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(User);