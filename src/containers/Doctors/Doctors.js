import React, { Component } from 'react';
import {
    Card,
    CardHeader,
    CardBody,
    Row
} from "reactstrap";
import axios from '../../axios-orders';
import { DragDropContext, Droppable } from 'react-beautiful-dnd';


import Doctor from '../../components/Doctor/Doctor';

class Doctors extends Component {

    state = {
        doctors: [],
        doctorIds: [],
        loading: true
    }

    onDragEnd = result => {
        const { destination, source, draggableId } = result;

        if (!destination) {
            return;
        }

        if (
            destination.droppableId === source.droppableId &&
            destination.index === source.index
        ) {
            return;
        }
        const newDoctorIds = Array.from(this.state.doctorIds);
        newDoctorIds.splice(source.index, 1);
        newDoctorIds.splice(destination.index, 0, draggableId);

        this.setState({doctorIds:newDoctorIds});
    }

    componentDidMount() {
        axios.get('/doctors.json')
            .then(res => {
                const doctors = [];
                const doctorIds = [];
                for (let key in res.data) {
                    if (key != 0) {
                        doctors.push({
                            ...res.data[key],
                            id: key
                        });
                        doctorIds.push({
                            key
                        });
                    }
                }
                this.setState({ loading: false, doctors: doctors, doctorIds: doctorIds });
            })
            .catch(err => {
                this.setState({ loading: false });
            });
    }

    render() {
        return (
            <DragDropContext onDragEnd={this.onDragEnd} >
                <Card className="shadow">
                    <CardHeader className="bg-transparent">
                        <Row className="align-items-center">
                            <div className="col">
                                <h2 className="mb-0">Doktorlar</h2>
                            </div>
                        </Row>
                    </CardHeader>
                    <CardBody>
                        <Droppable droppableId="1" >
                            {provided => (
                                <div
                                    ref={provided.innerRef}
                                    {...provided.droppableProps}
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
                                    {provided.placeholder}
                                </div>)}
                        </Droppable>
                    </CardBody>
                </Card>
            </DragDropContext>
        );
    }
}

export default Doctors;

