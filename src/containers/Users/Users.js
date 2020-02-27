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
import Api from '../../api';
import Spinner from '../../components/UI/Spinner/Spinner';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import * as actions from '../../store/actions/index';
import User from '../../components/User/User';

import './Users.css';


class Users extends Component {

    componentDidMount() {
        this.props.onInitUsers();
    }

    searchUser = (filterKey) => {
        this.props.searchUser(filterKey, this.props.users, this.props.defaultUsers);
    }

    render() {

        let userList = this.props.error ? <p>Doktor listesi yüklenemedi.</p> : <Spinner />

        if (this.props.users) {
            userList = this.props.users.map((user, index) => (
                <User
                    {...user}
                    key={user.id}
                    index={index}
                />
            ));
        }
        return (

            <Card className="shadow sticky" >
                <CardHeader className="bg-transparent">
                    <Row>
                        <div className="col">
                            <Input id="userSearch" placeholder="Doktorlar" onChange={(ev) => this.searchUser(ev.target.value)}></Input>
                        </div>
                    </Row>
                </CardHeader>
                <CardBody>
                    <Droppable droppableId="UserList_1" isDropDisabled={true}>
                        {(provided) => (
                            <div
                                ref={provided.innerRef}
                            >
                                {userList}
                            </div>)}
                    </Droppable>
                </CardBody>
            </Card>
        );
    }
}

const mapStateToProps = state => {
    return {
        users: state.users.users,
        defaultUsers: state.users.defaultUsers,
        error: state.users.error
    };
}

const mapDispatchToProps = dispatch => {
    return {
        onInitUsers: () => dispatch(actions.initUsers()),
        searchUser: (filterKey, users) => dispatch(actions.searchUser(filterKey, users))
    };
}


export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(Users, Api));

