import React, { Component } from 'react';
import { connect } from 'react-redux';

import {
    Card,
    CardHeader,
    CardBody,
    Row
} from "reactstrap";
import { Droppable } from 'react-beautiful-dnd';
import Api from '../../api';
import Spinner from '../../components/UI/Spinner/Spinner';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import * as actions from '../../store/actions/index';
import Doctor from '../../components/Doctor/Doctor';


class Doctors extends Component {

    componentDidMount() {
        this.props.onInitDoctors();
    }

    render() {

        let doctorList = this.props.error ? <p>Doktor listesi yüklenemedi.</p> : <Spinner />

        if (this.props.doctors) {
            doctorList = this.props.doctors.map((doctor, index) => (
                <Doctor
                    {...doctor}
                    key={doctor.id}
                    index={index}
                // key={doctor.id}
                // name={doctor.fullName}
                // title={doctor.title}
                // index={index}
                // id={doctor.id}
                />
            ));
        }
        return (

            <Card className="shadow">
                <CardHeader className="bg-transparent">
                    <Row className="align-items-center">
                        <div className="col">
                            <h2 className="mb-0">Doktorlar</h2>
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
        doctors: state.doctors.doctors,
        error: state.doctors.error
    };
}

const mapDispatchToProps = dispatch => {
    return {
        onInitDoctors: () => dispatch(actions.initDoctors())
    };
}


export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(Doctors, Api));

