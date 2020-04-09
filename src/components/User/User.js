import React, { Component } from 'react';
import styled from 'styled-components';
import { Draggable } from 'react-beautiful-dnd';
import { connect } from 'react-redux';
import { Badge } from 'reactstrap'
import moment from "moment";
import 'pretty-checkbox';

import * as actions from '../../store/actions/index';
import { helperService } from '../../services';
import { CalendarTypes } from '../../variables/constants';

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

        if (this.props.activeLocationId !== "") {
            this.props.setActiveLocationId("");
        }

        const startOfMonth = moment(this.props.curMonth).startOf('month').format("YYYY-MM-DD[T]hh:mm:ss.sss[Z]");
        const endOfMonth = moment(this.props.curMonth).endOf('month').format("YYYY-MM-DD[T]hh:mm:ss.sss[Z]");

        if (this.state.checkedRadio === userId) {
            this.setState({ checkedRadio: "nouserid" });
            id.target.checked = false;

            const filterData = {
                filter: {
                    where: {
                        date: {
                            between: [
                                startOfMonth,
                                endOfMonth
                            ]
                        },
                        groupId: {
                            like: helperService.getGroupId()
                        },
                        type:CalendarTypes.Nobet
                    },
                    include: [
                        {
                            relation: "group"
                        },
                        {
                            relation: "user"
                        },
                        {
                            relation: "location"
                        }
                    ]
                }
            }

            this.props.getReminders(filterData);
        }
        else {
            this.setState({ checkedRadio: userId });
            id.target.checked = true;

            const filterData = {
                filter: {
                    where: {
                        date: {
                            between: [
                                startOfMonth,
                                endOfMonth
                            ]
                        },
                        userId: {
                            like: userId
                        },
                        groupId: {
                            like: helperService.getGroupId()
                        },
                        type: CalendarTypes.Nobet
                    },
                    include: [
                        {
                            relation: "group"
                        },
                        {
                            relation: "user"
                        },
                        {
                            relation: "location"
                        }
                    ]
                }
            }
            this.props.getReminders(filterData);
        }
    }


    render() {

        return (
            <Draggable
                key={this.props.user.id}
                draggableId={this.props.user.id}
                index={this.props.index}>
                {(provided, snapshot) => (
                    <React.Fragment>
                        <Container
                            ref={provided.innerRef}
                            {...provided.draggableProps}
                            {...provided.dragHandleProps}
                            isDragging={snapshot.isDragging}
                        >
                            {this.props.user.fullName}
                            {/* <Badge color="success">{this.props.count}</Badge> */}
                            <div className="pretty p-default p-curve p-fill" style={{ marginLeft: "auto", marginBottom: "auto", marginTop: "auto" }} >
                                <input
                                    type="radio"
                                    name="radio"
                                    onClick={(e) => this.OnSelect(this.props.user.id, e)}
                                />
                                <div className="state p-success">
                                    <label></label>
                                </div>
                            </div>
                        </Container>
                        {snapshot.isDragging && (
                            <Clone> {this.props.user.fullName}</Clone>
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
        curMonth: state.calendar.curMonth,
        error: state.reminders.error
    }
}

const mapDispatchToProps = dispatch => {
    return {
        getReminders: (filterData) => dispatch(actions.getReminders(filterData)),
        setActiveLocationId: (locationId) => dispatch(actions.setActiveLocationId(locationId))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(User);