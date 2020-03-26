import React, { Component } from "react";
import { connect } from 'react-redux';
import {
  Container,
  Row,
  Col,
  Modal,
  Button,
  Form,
  Input,
  InputGroup,
  FormGroup
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
import api from "../api";

const MySwal = withReactContent(Swal)

class Index extends Component {

  constructor(props) {
    super(props)
    this.state = {
      addModal: false,
      name: '',
      title: '',
      email: '',
      password: ''
    }
    this.addHandle = this.addHandle.bind(this);
  }

  addHandle(event) {

    if (this.state.name) {
      const user = {
        fullName: this.state.name,
        title: this.state.title,
        email: this.state.email,
        password: this.state.password,
        //groupId: '5e53975e62398900983c869c',/* İleri de localstorage veya servisle çekilecek. Şimdilik sabit id ile yapıldı.*/
        deviceId: "1"
      };

      this.props.createUser(user);
      this.toggleModal('addModal', undefined);

    } else {
      alert('Ad alanı zorunludur!')
    }
    event.preventDefault();
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
            groupId: "5e53975e62398900983c869c",
            userId: user.user.id,
            date: moment(destination.droppableId).format("YYYY-MM-DD[T]hh:mm:ss.sss[Z]"),
            type: 0
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
  inputChangeHandle(event) {
    const target = event.target;
    if (target.name === 'title')
        this.setState({ title: event.target.value });
    if (target.name === 'name')
        this.setState({ name: event.target.value });
    if (target.name === 'email')
        this.setState({ email: event.target.value });
    if (target.name === 'password')
        this.setState({ password: event.target.value });
}
  toggleModal(state) {
    this.setState({
      [state]: !this.state[state]
    });
  };

  render() {
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
            <Form role="form" autoComplete="off">
              <FormGroup>
                <InputGroup className="input-group-alternative mb-3">
                  <Input placeholder="Ünvan" name="title" type="text" value={this.state.title} onChange={(event) => this.inputChangeHandle(event)} />
                </InputGroup>
                <InputGroup className="input-group-alternative mb-3">
                  <Input placeholder="Kullanıcı Adı ve Soyadı" name="name" type="text" value={this.state.name} onChange={(event) => this.inputChangeHandle(event)} />
                </InputGroup>
                <InputGroup className="input-group-alternative mb-3">
                  <Input placeholder="E-Mail Adresi" name="email" type="text" value={this.state.email} onChange={(event) => this.inputChangeHandle(event)} />
                </InputGroup>
                <InputGroup className="input-group-alternative mb-3">
                  <Input placeholder="Şifre" name="password" type="password" value={this.state.password} autoComplete="new-password" onChange={(event) => this.inputChangeHandle(event)} />
                </InputGroup>
              </FormGroup>

            </Form>
          </div>
          <div className="modal-footer">
            <Button
              color="secondary"
              data-dismiss="modal"
              type="button"
              onClick={() => this.toggleModal("addModal", undefined)}>Kapat
                        </Button>
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
    error: state.users.error,
    activeLocationId: state.locations.activeLocationId
  };
};

const mapDispatchToProps = dispatch => {
  return {
    createReminder: (reminderData) => dispatch(actions.createReminder(reminderData))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(Index, api));