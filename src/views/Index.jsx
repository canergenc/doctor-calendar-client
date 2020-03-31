import React, { Component } from "react";
import { connect } from 'react-redux';
import {
  Container,
  Row,
  Col,
  Modal,
  Button,
  Form,
  FormGroup,
  InputGroup,
  Card,
  CardHeader
} from "reactstrap";
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
import withErrorHandler from "../hoc/withErrorHandler/withErrorHandler";
import { CalendarTypes} from "../variables/constants";
import api from "../api";

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

          const user = this.props.users[source.index];
          const reminder = {
            locationId: this.props.activeLocationId,
            groupId: helperService.getGroupId() ,
            userId: user.user.id,
            date: moment(destination.droppableId).format("YYYY-MM-DD[T]hh:mm:ss.sss[Z]"),
            type: CalendarTypes.Nobet
          }
          this.props.createReminder(reminder);
        }
        else {
          MySwal.fire({
            icon: 'error',
            title: 'Hay aksi,',
            text: constants.ERROR_MESSAGE.serviceNotFound
          })
        }
        break;
      default:
        break;
    }
  };


  toggleModal(state) {
    this.setState({
      [state]: !this.state[state]
    });
  };

  findUser = (filterKey) => {
    console.log("-----findUser");

    console.log(filterKey);

    this.props.findUser(filterKey);
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
                    <Row>
                      <Select options={options} className="select" isMulti onInputChange={(ev) => this.findUser(ev)} onChange={(user) => this.addUserId(user)} />
                    </Row>
                  </CardHeader>
                </Card>
              </FormGroup>
            </Form>
          </div>
          <div className="modal-footer">
            <Button
              color="secondary"
              data-dismiss="modal"
              type="button"
              onClick={() => this.toggleModal("addModal", undefined)}>Kapat</Button>
            <Button color="primary" type="submit" onClick={this.addHandle}>Kaydet</Button>
          </div>
        </Modal>

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
    globalUsers: state.users.globalUsers,
    defaultUsers: state.users.defaultUsers,
    error: state.users.error,
    activeLocationId: state.locations.activeLocationId
  };
};

const mapDispatchToProps = dispatch => {
  return {
    createReminder: (reminderData) => dispatch(actions.createReminder(reminderData)),
    createUserGroupBulk: (userGroupBulk) => dispatch(actions.userGroupActions.createUserGroupBulk(userGroupBulk)),
    findUser: (filterKey) => dispatch(actions.findUser(filterKey))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(Index, api));