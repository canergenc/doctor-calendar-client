import React, { Component } from 'react';
import styled from 'styled-components';
import { Draggable } from 'react-beautiful-dnd';
import { connect } from 'react-redux';
import moment from "moment/moment";
import { extendMoment } from 'moment-range';
import "moment/locale/tr";
import 'pretty-checkbox';

import * as actions from '../../../store/actions/index';

const Container = styled.div`
display: flex;
user-select: none;
padding: 6px;
margin-bottom: 6px;
margin-right: 6px;
align-items: flex-start;
align-content: flex-start;
border: 1px solid lightgrey;
border-radius: 4px;
font-size: 12px;
background-color: ${props => (props.isDragging ? 'lightgreen' : 'white')};
`;

const Seniority = styled.div`
top: 0;
left: 0;
padding-top: 1px;
padding-left: 1px;
padding-bottom: 1px;
padding-right: 2px;
display: flex;
justify-content: flex-end;
border-radius: 3px;
`;

const Name = styled.div`
top: 0;
left: 0;
padding-top: 1px;
padding-left: 1px;
padding-bottom: 1px;
padding-right: 2px;
display: flex;
justify-content: flex-end;
`;

const Clone = styled(Container)`
  ~div {
    transform: none!important;
  }
`;
const CloneSeniority = styled(Seniority)`
  ~div {
    transform: none!important;
  }
`;
const CloneName = styled(Name)`
  ~div {
    transform: none!important;
  }
`;


class User extends Component {
    
    render() {
        const momentRange = extendMoment(moment);

        const workStartDate = moment(this.props.user.workStartDate).format('YYYY-MM-DD');
        const today = moment(new Date()).format('YYYY-MM-DD');
        const range = momentRange.range(workStartDate, today);

        const year = range.diff('years');
        const month = range.diff('months');
        const monthText = (month > 12 ? month % 12 : month) + "ay - ";
        const seniority = year + "y " + monthText;

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
                            <Seniority>
                                {seniority}
                            </Seniority>
                            <Name>
                                {this.props.user.fullName}
                            </Name>

                            {/* <Badge color="success">{this.props.count}</Badge> */}
                            <div className="pretty p-default p-curve p-fill" style={{ marginLeft: "auto", marginBottom: "auto", marginTop: "auto", marginRight: "4px" }} >
                                <input
                                    type="checkbox"
                                    name="radio"
                                    onClick={this.props.onSelect}
                                />
                                <div className="state p-success">
                                    <label></label>
                                </div>
                            </div>
                        </Container>
                        {snapshot.isDragging && (
                            <Clone>
                                <CloneSeniority>
                                    {seniority}
                                </CloneSeniority>
                                <CloneName>
                                    {this.props.user.fullName}
                                </CloneName>
                            </Clone>
                        )}
                    </React.Fragment>
                )}
            </Draggable>
        )
    }
};

const mapStateToProps = state => {
    return {
        selectedLocations: state.reminders.selectedLocations,
        curMonth: state.calendar.curMonth,
        error: state.reminders.error
    }
}

const mapDispatchToProps = dispatch => {
    return {
        getReminders: (selectedLocations, selectedUsers, curMonth) => dispatch(actions.getReminders(selectedLocations, selectedUsers, curMonth))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(User);