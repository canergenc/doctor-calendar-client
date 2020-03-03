import React from "react";
import { connect } from 'react-redux';
import { Container, Row, Col } from "reactstrap";
import { DragDropContext } from 'react-beautiful-dnd';
import moment from "moment";
import Calender from '../containers/Calendar/Calendar';
import * as actions from '../store/actions/index';
import Header from "components/Headers/Header.jsx";
import Users from '../containers/Users/Users';
import Location from '../components/Location/Location';
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
import { constants } from "../variables/constants";

const MySwal = withReactContent(Swal)

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
      case 'UserList_1':
        if (this.props.activeLocationId !== "" && this.props.activeLocationId !== null) {
          console.log(this.props.activeLocationId);

          const user = this.props.users[source.index];
          const reminder = {
            locationId: this.props.activeLocationId,
            groupId: "5e53975e62398900983c869c",
            userId: user.id,
            date: moment(destination.droppableId).format("YYYY-MM-DD[T]hh:mm:ss.sss[Z]"),
            description: user.fullName,
            type: 0
            //type: { "Nöbet": 0 }
          }
          this.props.createReminder(reminder);
        }
        else {
          console.log("location seçmelisiniz.")
          MySwal.fire({
            icon: 'error',
            title: 'Hay aksi,',
            text: constants.ERROR_MESSAGE.serviceNotFound
          })
        }

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
                <Row>
                  <Col>
                    <Location />
                  </Col>
                </Row>
                <Row>
                  <Col>
                    <Calender />
                  </Col>
                </Row>
              </Col>
              <Col xl="2">
                <Users />
              </Col>
            </Row>
          </DragDropContext>
        </Container>

      </>
    );
  }
}

const mapStateToProps = state => {

  console.log('All States', state);
  return {
    users: state.users.users,
    error: state.users.error,
    activeLocationId: state.locations.activeLocationId
  };
}
const mapDispatchToProps = dispatch => {
  return {
    createReminder: (reminderData) => dispatch(actions.createReminder(reminderData)),
    // createReminderFailed: (reminderData) => dispatch(actions.createReminderFailed(reminderData))
  };
}
export default connect(mapStateToProps, mapDispatchToProps)(Index);
