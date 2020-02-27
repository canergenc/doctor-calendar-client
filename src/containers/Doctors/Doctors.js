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
import Doctor from '../../components/Doctor/Doctor';

import './Doctors.css';


class Doctors extends Component {

    componentDidMount() {
        this.props.onInitUsers();
    }

    searchUser = (filter) => {
        if (filter.length === 0) {
            this.props.onInitUsers();
        }
        else if (filter.length > 2) {
            this.props.searchUser(filter);
        }
    }

    render() {

        let doctorList = this.props.error ? <p>Doktor listesi yüklenemedi.</p> : <Spinner />

        if (this.props.users) {
            doctorList = this.props.users.map((user, index) => (
                <Doctor
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
                            <Input id="doctorSearch" placeholder="Doktorlar" onChange={(e) => this.searchUser(e.target.value)}></Input>
                        </div>
                    </Row>
                </CardHeader>
                <CardBody>
                    <Droppable droppableId="DoctorList_1" isDropDisabled={true}>
                        {(provided) => (
                            <div
                                ref={provided.innerRef}
                            >
                                {doctorList}
                            </div>)}
                    </Droppable>
                </CardBody>
            </Card>
        );
    }
}

const mapStateToProps = state => {
    return {
        users: state.doctors.doctors,
        error: state.doctors.error
    };
}

const mapDispatchToProps = dispatch => {
    return {
        onInitUsers: () => dispatch(actions.initDoctors()),
        searchUser: (filterKey) => dispatch(actions.searchUser(filterKey))
    };
}


export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(Doctors, Api));

