import React from "react";

import {
  Container,
  Row,
  Col
} from "reactstrap";
import { DragDropContext } from 'react-beautiful-dnd';
import { connect } from 'react-redux';
import Calender from '../containers/Calender/Calender';
import Header from "components/Headers/Header.jsx";
import Doctors from '../containers/Doctors/Doctors';
import * as actions from '../store/actions/index';

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

        
        this.props.createReminder();
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
    doctors: state.doctors,
    reminders: state.reminders
  };
};

const mapDispatchToProps = dispatch => {
  return {
    createReminder: (payload) => dispatch(actions.createReminder(payload))
  };
};


export default connect(
  mapStateToProps, mapDispatchToProps)(Index);
