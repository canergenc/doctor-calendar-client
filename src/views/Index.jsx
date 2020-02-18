import React from "react";
import { connect } from 'react-redux';
import { Container, Row, Col } from "reactstrap";
import { DragDropContext } from 'react-beautiful-dnd';
import moment from "moment";
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
      case 'DoctorList_1':
        const doctor = this.props.doctors[source.index];
        
        const reminder = {
          locationId: this.props.activeLocationId,
          userId: doctor.id,
          date: moment(destination.droppableId).format("YYYY-MM-DD[T]hh:mm:ss.sss[Z]"),
          description: doctor.fullName,
          type: {}
        }
        this.props.createReminder(reminder);

        break;
      default:
        console.log('switch default');
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
    error: state.doctors.error,
    activeLocationId: state.locations.activeLocationId
  };
}
const mapDispatchToProps = dispatch => {
  return {
    createReminder: (reminderData) => dispatch(actions.createReminder(reminderData))
  };
}
export default connect(mapStateToProps, mapDispatchToProps)(Index);
