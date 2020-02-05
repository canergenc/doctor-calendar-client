import React from "react";
import { connect } from 'react-redux';
import { Container, Row, Col } from "reactstrap";
import { DragDropContext } from 'react-beautiful-dnd';
import Calender from '../containers/Calendar/Calendar';
import * as actions from '../store/actions/index';
import Header from "components/Headers/Header.jsx";
import Doctors from '../containers/Doctors/Doctors';

class Index extends React.Component {


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

    switch (source.droppableId) {
      case destination.droppableId:
        console.log('reorder');
        break;
      case 'DoctorList_1':

        console.log('create reminder');
        console.log(destination);
        console.log(source);
        const doctor = this.props.doctors[source.index];
        console.log(doctor);

        const reminder = {
          id:1,
          name:"acıbadem test",
          calendar:{
            userId: doctor.id,
            date: destination.droppableId
          }
        }

        this.props.createReminder(reminder);

        break;
      default:
        console.log('move');
        break;
    }
  };

  render() {
    return (
      <>
        <Header />

        <Container className="mt--7" fluid>
          <DragDropContext onDragEnd={this.onDragEnd} >
            <Row>
              <Col className="mb-5 mb-xl-0" xl="10">
                <Calender />
              </Col>
              <Col xl="2">
                <Doctors />
              </Col>
            </Row>
          </DragDropContext>
        </Container>

      </>
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
    createReminder: (reminderData) => dispatch(actions.createReminder(reminderData))
  };
}
export default connect(mapStateToProps, mapDispatchToProps)(Index);
