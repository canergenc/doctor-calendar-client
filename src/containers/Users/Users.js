import React, { Component } from 'react';
import { connect } from 'react-redux';

import {
    Card,
    CardHeader,
    CardBody,
    Row,
    Input
} from "reactstrap";
import { Droppable } from 'react-beautiful-dnd';
import Api from '../../hoc/Config/api';
import Spinner from '../../components/UI/Spinner/Spinner';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import * as actions from '../../store/actions/index';
import User from './User/User';

import './Users.css';
import { helperService } from '../../services';


class Users extends Component {
    state = {
        selectedUsers: []
    }
    componentDidMount() {
        const filterData = {
            filter: {
                where: {
                    groupId: {
                        like: helperService.getGroupId()
                    }
                },
                include: [
                    {
                        relation: "user"
                    }
                ]
            }
        };
        this.props.onInitUsers(filterData);
    }

    searchUser = (filterKey) => {
        this.props.searchUser(filterKey, this.props.defaultUsers);
    }

    onSelect = (userId) => {
        
        let selectedUsersArray = [...this.props.selectedUsers];

        if (selectedUsersArray.includes(userId)) {

            var index = selectedUsersArray.indexOf(userId);
            if (index !== -1) {
                selectedUsersArray.splice(index, 1);
            }
        }
        else {

            selectedUsersArray = [
                ...selectedUsersArray, 
                userId
            ];
        }

        this.props.getReminders(this.props.selectedLocations, selectedUsersArray, this.props.curMonth);
        
    }

    render() {

        let userList = this.props.error ? <p>Kullanıcı listesi yüklenemedi.</p> : <Spinner />

        if (this.props.users) {
            userList = this.props.users.map((user, index) => (

                <User
                    {...user}
                    key={user.id}
                    index={index}
                    onSelect={() => this.onSelect(user.user.id)}
                />
            ));
        }
        return (

            <Card className="shadow sticky"    >
                <CardHeader className="bg-transparent">
                    <Row>
                        <div className="col">
                            <Input id="userSearch" placeholder="Ara" onChange={(ev) => this.searchUser(ev.target.value)}></Input>
                        </div>
                    </Row>
                </CardHeader>
                <CardBody >
                    <Droppable droppableId="UserList_1" isDropDisabled={true}>
                        {(provided) => (
                            <div id="style-6" style={{ maxHeight: '650px', minHeight: '200px', overflowY: 'scroll' }}
                                ref={provided.innerRef}
                            >
                                {userList}
                            </div>)}
                    </Droppable>
                    <div style={{ marginTop: '5%' }} className="add w3-hover-light-grey" onClick={this.props.clicked}><i className="fa fa-plus" style={{ marginRight: "4px", fontSize: "12px" }}></i>Kullanıcı Ekle</div>

                </CardBody>
            </Card>
        );
    }
}

const mapStateToProps = state => {
    return {
        users: state.users.users,
        selectedLocations: state.reminders.selectedLocations,
        selectedUsers: state.reminders.selectedUsers,
        curMonth: state.calendar.curMonth,
        remindersError: state.reminders.error,
        defaultUsers: state.users.defaultUsers,
        error: state.users.error
    };
}

const mapDispatchToProps = dispatch => {
    return {
        onInitUsers: (filterData) => dispatch(actions.getUsers(filterData)),
        getReminders: (selectedLocations, selectedUsers, curMonth) => dispatch(actions.getReminders(selectedLocations, selectedUsers, curMonth)),
        searchUser: (filterKey, defaultUsers) => dispatch(actions.searchUser(filterKey, defaultUsers))
    };
}


export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(Users, Api));

