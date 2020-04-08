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
import { helperService } from '../../services';


class Users extends Component {

    componentDidMount() {
        const filterData = {
            filter: {
                where: {
                    groupId: {
                        like: helperService.getGroupId()
                    }
                },
                include:[
                    {
                        relation:"user"
                    }
                ]
            }
        };
        this.props.onInitUsers(filterData);
    }

    searchUser = (filterKey) => {
        this.props.searchUser(filterKey, this.props.defaultUsers);
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
                            <div id="style-6" style={{ maxHeight: '650px', overflowY: 'scroll' }}
                                ref={provided.innerRef}
                            >
                                {userList}
                            </div>)}
                    </Droppable>
                    <div  style={{marginTop:'5%'}} className="add w3-hover-light-grey" onClick={this.props.clicked}><i className="fa fa-plus" style={{marginRight:"4px", fontSize:"12px"}}></i>Kullanıcı Ekle</div>
                    
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
        onInitUsers: (filterData) => dispatch(actions.getUsers(filterData)),
        searchUser: (filterKey, defaultUsers) => dispatch(actions.searchUser(filterKey, defaultUsers))
    };
}


export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(Users, Api));

