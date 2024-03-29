import React, { Component } from "react";
import { connect } from 'react-redux';
import {
  Container,
  Row,
  Col,
  Modal,
  Form,
  FormGroup,
  InputGroup,
  Card,
  CardHeader
} from "reactstrap";
import { DragDropContext } from 'react-beautiful-dnd';
import moment from "moment/moment";
import Calender from '../containers/Calendar/Calendar';
import * as actions from '../store/actions/index';
import Header from "../components/Headers/Header.jsx";
import Users from '../containers/Users/Users';
import Location from '../containers/Locations/LocationSelect/LocationSelect';
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
import { CalendarTypes, constants, holidays } from "../variables/constants";
import withErrorHandler from "../hoc/withErrorHandler/withErrorHandler";
import api from "../hoc/Config/api";

import Select from 'react-select';

import './Index.css';
import { helperService } from "../services";

const MySwal = withReactContent(Swal)

class Index extends Component {

  constructor(props) {
    super(props)
    this.state = {
      addModal: false,
      userGroups: []
    }
    this.addHandle = this.addHandle.bind(this);
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.props.errorFromReminders) {
      MySwal.fire({
        icon: 'error',
        title: 'işlem başarısız',
        text: this.props.statusText
      });
      this.props.cleanFlagsReminder();
    }
  }

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
      return;
    }

    let isWeekend = false;
    if (moment(destination.droppableId).isoWeekday() === 6 || moment(destination.droppableId).isoWeekday() === 7) {
      isWeekend = true;
    }

    const monthlyHolidays = holidays[moment(destination.droppableId).format("YYYY")][moment(destination.droppableId).format("M")];

    const dayNumber = parseInt(moment(destination.droppableId).format("D"));

    if (monthlyHolidays && monthlyHolidays.includes(dayNumber)) {
      isWeekend = true;
    }

    switch (source.droppableId) {
      case 'UserList_1':
        if (this.props.activeLocationId) {

          const user = this.props.users[source.index];
          const reminder = {
            locationId: this.props.activeLocationId,
            groupId: helperService.getGroupId(),
            userId: user.user.id,
            startDate: moment(destination.droppableId).format("YYYY-MM-DD[T]hh:mm:ss.sss[Z]"),
            endDate: moment(destination.droppableId).format("YYYY-MM-DD[T]hh:mm:ss.sss[Z]"),
            type: CalendarTypes.Nobet,
            isWeekend: isWeekend
          }
          this.props.createReminder(reminder, this.props.filterData);
        }
        else {
          if (this.props.selectedLocations.length > 1) {
            MySwal.fire({
              icon: 'error',
              title: 'Hay aksi,',
              text: constants.ERROR_MESSAGE.serviceCountMoreThanOne
            });
          }
          else if (this.props.selectedLocations.length === 0) {
            MySwal.fire({
              icon: 'error',
              title: 'Hay aksi,',
              text: constants.ERROR_MESSAGE.serviceNotFound
            });
          }
        }
        break;
      default:
        const reminderId = result.draggableId;

        const reminderIndex = this.props.reminders.map(function (x) { return x.id; }).indexOf(reminderId);


        const reminder = {
          startDate: moment(destination.droppableId).format("YYYY-MM-DD[T]hh:mm:ss.sss[Z]"),
          endDate: moment(destination.droppableId).format("YYYY-MM-DD[T]hh:mm:ss.sss[Z]"),
          userId: this.props.reminders[reminderIndex].userId,
          isWeekend: isWeekend
        }

        this.props.updateReminder(reminderId, reminderIndex, reminder, this.props.filterData);
        break;
    }
  };

  toggleModal(state) {
    this.setState({
      [state]: !this.state[state]
    });
  };

  findUser = (filterKey) => {
    this.props.findUser(filterKey, this.props.users);
  }

  addHandle(event) {
    this.props.createUserGroupBulk(this.state.userGroups);
    this.toggleModal('addModal', undefined);
    event.preventDefault();
  }

  addUserId(user) {
    if (user) {
      let userGroups = [];
      user.forEach(element => {
        userGroups.push({ userId: element.value, groupId: helperService.getGroupId() });
      });
      this.setState({ userGroups: userGroups })
    }
  }

  noMessageHandle = () => {
    return "Eşleşme Yok"
  }

  render() {
    let options = [];

    if (this.props.globalUsers) {
      options = this.props.globalUsers
    }

    return (
      <>
        <Header />

        {/* Add Person Modal */}
        <Modal
          className="modal-dialog-centered"
          isOpen={this.state.addModal}
          toggle={() => this.toggleModal("addModal", undefined)}>
          <div className="modal-header">
            <h5 className="modal-title" id="addModalLabel">Kullanıcı Ekle</h5>
            <button
              aria-label="Close"
              className="close"
              data-dismiss="modal"
              type="button"
              onClick={() => this.toggleModal("addModal", undefined)}>
              <span aria-hidden={true}>×</span>
            </button>
          </div>

          <div className="modal-body">

            <Form role="form" >
              <FormGroup>
                <InputGroup className="input-group-alternative mb-3">
                </InputGroup>
                <Card className="shadow sticky" >
                  <CardHeader className="bg-transparent">
                    <Row style={{ zIndex: "100" }}>
                      <Select placeholder="Ara ve Seç..." noOptionsMessage={() => this.noMessageHandle()} options={options} className="select" isMulti onInputChange={(ev) => this.findUser(ev)} onChange={(user) => this.addUserId(user)} />
                    </Row>
                  </CardHeader>
                </Card>
              </FormGroup>
            </Form>
          </div>
          <div className="modal-footer" >
            <button
              className="bttn bttn-secondary"
              onClick={() => this.toggleModal("addModal", undefined)}>Kapat</button>
            <button className="bttn bttn-primary" onClick={this.addHandle}>Kaydet</button>
          </div>
        </Modal>

        <Container className="mt--8" fluid>
          <DragDropContext onDragEnd={this.onDragEnd} >
            <Row>
              <Col className="mb-5 mb-xl-0 cols-10 no-padding-left" xl="9" lg="9" md="9" sm="9">
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
              <Col className="cols-2 no-padding-right no-padding-left" xl="3" lg="3" md="3" sm="3" >
                <Users clicked={() => this.toggleModal("addModal")} />
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
    users: state.users.users,
    reminders: state.reminders.reminders,
    filterData: state.reminders.filterData,
    errorFromReminders: state.reminders.error,
    message: state.reminders.message,
    statusText: state.reminders.statusText,
    selectedLocations: state.reminders.selectedLocations,
    globalUsers: state.users.globalUsers,
    defaultUsers: state.users.defaultUsers,
    errorFromUsers: state.users.error,
    activeLocationId: state.locations.activeLocationId
  };
};

const mapDispatchToProps = dispatch => {
  return {
    cleanFlagsReminder: () => dispatch(actions.cleanFlagsReminder()),
    createReminder: (reminderData, filterData) => dispatch(actions.createReminder(reminderData, filterData)),
    updateReminder: (reminderId, reminderIndex, reminderData, filterData) => dispatch(actions.updateReminder(reminderId, reminderIndex, reminderData, filterData)),
    createUserGroupBulk: (userGroupBulk) => dispatch(actions.createUserGroupBulk(userGroupBulk)),
    findUser: (filterKey, users) => dispatch(actions.findUser(filterKey, users))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(Index, api));