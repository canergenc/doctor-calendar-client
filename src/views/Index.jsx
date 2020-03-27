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
  FormGroup,
  Card,
  CardHeader,
  CardBody
} from "reactstrap";
import { DragDropContext } from 'react-beautiful-dnd';
import moment from "moment";
import Calender from '../containers/Calendar/Calendar';
import * as actions from '../store/actions/index';
import Header from "components/Headers/Header.jsx";
import Users from '../containers/Users/Users';
import Location from '../components/Location/Location';
import Spinner from '../components/UI/Spinner/Spinner';
import User from '../components/User/User';
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
import { constants } from "../variables/constants";
import withErrorHandler from "../hoc/withErrorHandler/withErrorHandler";
import api from "../api";

import SelectSearch from 'react-select-search';



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

  findUser = (filterKey) => {
    this.props.findUser(filterKey);
  }

  toggleModal(state) {
    this.setState({
      [state]: !this.state[state]
    });
  };

  render() {
    const options = [
      {name: 'Swedish', value: 'sv'},
      {name: 'English', value: 'en'},
      {
          type: 'group',
          name: 'Group name',
          items: [
              {name: 'Spanish', value: 'es'},
          ]
      },
  ];
    let globalUserList = this.props.error ? <p>Doktor listesi yüklenemedi.</p> : <p>Test</p>

    // if (this.props.globalUsers) {
    //   globalUserList = this.props.globalUsers.map((user, index) => (
    //     <User
    //       {...user}
    //       key={user.id}
    //       index={index}
    //     />
    //   ));
    // }

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
                <SelectSearch options={options} defaultValue="sv" name="language" placeholder="Choose your language" />
            {/* <Form role="form" >
              <FormGroup>
                <InputGroup className="input-group-alternative mb-3">
                </InputGroup>
                <Card className="shadow sticky" >
                   <CardHeader className="bg-transparent">
                    <Row>
                       

                    </Row>
                  </CardHeader> 
                  <CardBody>
                  </CardBody>
                </Card>
              </FormGroup>
            </Form> */}
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
    error: state.users.error,
    activeLocationId: state.locations.activeLocationId
  };
};

const mapDispatchToProps = dispatch => {
  return {
    createReminder: (reminderData) => dispatch(actions.createReminder(reminderData)),
    findUser: (filterKey) => dispatch(actions.findUser(filterKey))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(Index, api));