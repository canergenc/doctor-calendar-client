import React, { Component } from 'react';
import {
    Card,
    CardHeader,
    CardBody,
    Row
} from "reactstrap";
import axios from '../../axios-orders';
import { Droppable, DragDropContext } from 'react-beautiful-dnd';
import styled from 'styled-components';
import { connect } from 'react-redux';


import Doctor from '../../components/Doctor/Doctor';


class Doctors extends Component {

    state = {
        doctors: []
    }

    copy = (source, destination, droppableSource, droppableDestination) => {
        const sourceClone = Array.from(source);
        const destClone = Array.from(destination);
        const item = sourceClone[droppableSource.index];

        destClone.splice(droppableDestination.index, 0, { ...item, id: "1" });
        return destClone;
    };


    onDragEnd = result => {
        const { destination, source } = result;

        if (!destination) {
            return;
        }

        if (
            destination.droppableId === source.droppableId &&
            destination.index === source.index
        ) {
            return;
        }

        if (destination.droppableId === source.droppableId) {

            // const newDoctors = Object.assign([], this.state.doctors);
            // const quote = this.state.doctors[source.index];
            // newDoctors.splice(source.index, 1);
            // newDoctors.splice(destination.index, 0, quote);

            // this.setState({ doctors: newDoctors });

            this.setState({
                [destination.droppableId]: this.copy(
                    this.state.doctors,
                    this.state[destination.droppableId],
                    source,
                    destination
                )
            });
            return;
        }

        const newDoctors = Object.assign([], this.state.doctors);
        const quote = this.state.doctors[source.index];
        newDoctors.splice(source.index, 1);
        newDoctors.splice(destination.index, 0, quote);

        this.setState({ doctors: newDoctors });

    }

    componentWillMount() {
        axios.get('/doctors.json')
            .then(res => {
                const doctors = [];
                for (let key in res.data) {
                    if (key !== "0") {
                        doctors.push({
                            ...res.data[key],
                            id: key
                        });
                    }
                }
                this.setState({ loading: false, doctors: doctors });
            })
            .catch(err => {
                this.setState({ loading: false });
            });
    }

    render() {
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
                                {this.state.doctors.map((doctor, index) => (
                                    <Doctor
                                        key={doctor.id}
                                        name={doctor.name}
                                        title={doctor.title}
                                        index={index}
                                        id={doctor.id}
                                    />
                                ))}
                            </div>)}
                    </Droppable>

                </CardBody>
            </Card>

        );
    }
}



const mapStateToProps = state => {
    return {

    }
}
export default Doctors;

