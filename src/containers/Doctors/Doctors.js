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
        doctors: []
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

        if (destination.droppableId === source.droppableId) {

            const newDoctors = Object.assign([], this.state.doctors);
            const quote = this.state.doctors[source.index];
            newDoctors.splice(source.index, 1);
            newDoctors.splice(destination.index, 0, quote);

            this.setState({ doctors: newDoctors });
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
            
        );
    }
}

export default Doctors;

