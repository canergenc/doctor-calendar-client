import React from "react";
import { connect } from 'react-redux';
import * as actions from '../../store/actions/index';

// reactstrap components
import {
  Modal,
  Button,
  Card,
  CardHeader,
  CardBody,
  FormGroup,
  Form,
  Input,
  InputGroup,
  InputGroupAddon,
  InputGroupText,
  Container,
  Row,
  Col
} from "reactstrap";
import withReactContent from 'sweetalert2-react-content';
import Swal from 'sweetalert2';

import UserHeader from "components/Headers/UserHeader.jsx";
import { helperService } from "../../services";

const MySwal = withReactContent(Swal)

class Profile extends React.Component {


  constructor(props) {
    super(props);
    console.log(props);

    this.state = {
      editModal: false,
      email: this.props.email,
      fullName: "",
      title: "",
      deviceId: "",
      password: "",
      newPassword: "",
      newPasswordAgain: ""
    }
    this.inputChangeHandle = this.inputChangeHandle.bind(this);
    this.updateUserInfo = this.updateUserInfo.bind(this);
    this.updatePassword = this.updatePassword.bind(this);
    this.setInputDefaultValue = this.updateUserInfo.bind(this);

  }


  componentDidMount() {
    console.log('PROFILE component did mount');

    if (!this.props.email || !this.props.fullName || !this.props.title) {
      this.props.getUserInfo();
    }
    console.log(this.props.error);


  }

  componentWillMount() {
    if (this.props.error) {
      MySwal.fire({
        icon: 'error',
        title: 'Uyarı',
        text: this.props.statusTextInUpdates
      });
    }
  }


  inputChangeHandle(event) {
    const target = event.target;
    if (target.name === 'email')
      this.setState({ email: event.target.value });
    if (target.name === 'fullName')
      this.setState({ fullName: event.target.value });
    if (target.name === 'title')
      this.setState({ title: event.target.value });
    if (target.name === 'deviceId')
      this.setState({ deviceId: event.target.value });
    if (target.name === 'password')
      this.setState({ password: event.target.value });
    if (target.name === 'newPassword')
      this.setState({ newPassword: event.target.value });
    if (target.name === 'newPasswordAgain')
      this.setState({ newPasswordAgain: event.target.value });
  }

  setInputDefaultValue() {
    if (this.props.deviceId) {
      this.setState({ deviceId: this.props.deviceId });
    }
    if (this.props.email) {
      this.setState({ email: this.props.email });
    }

    if (this.props.fullName) {
      this.setState({ fullName: this.props.fullName });
    }

    if (this.props.title) {
      this.setState({ title: this.props.title });
    }
  }




  updatePassword(event) {

    if (this.state.password && this.state.newPassword) {
      if (this.state.newPassword === this.state.newPasswordAgain) {
        var data = {
          oldPassword: this.state.password,
          currentPassword: this.state.newPassword
        }

        var userId = helperService.getUserId();
        this.props.updateUserInfo(userId, data);
        this.toggleModal('editModal');
        event.preventDefault();
      }
      else {
        MySwal.fire({
          icon: 'warning',
          title: 'Lütfen',
          text: 'Yeni şifre alanları aynı olmalıdır.'
        });
      }
    }
    else {
      MySwal.fire({
        icon: 'warning',
        title: 'Lütfen',
        text: 'zorunlu alanları doldurunuz'
      });
    }
  }


  updateUserInfo(event) {

    var data = {
      title: this.state.title ? this.state.title : this.props.title,
      fullName: this.state.fullName ? this.state.fullName : this.props.fullName,
      email: this.state.email ? this.state.email : this.props.email,
      deviceId: this.state.deviceId ? this.state.deviceId : this.props.deviceId,
    }

    var userId = helperService.getUserId();
    this.props.updateUserInfo(userId, data);

  }

  toggleModal(state) {
    this.setState({
      [state]: !this.state[state]
    });
  };


  render() {

    return (
      <>
        <UserHeader fullName={this.props.fullName} />

        {/* Edit Modal  */}
        <Modal
          className="modal-dialog-centered"
          isOpen={this.state.editModal}
          toggle={() => this.toggleModal("editModal", undefined)}>
          <div className="modal-header">
            <h5 className="modal-title" id="editModalLabel">Şifre Değiştir</h5>
            <button
              aria-label="Close"
              className="close"
              data-dismiss="modal"
              type="button"
              onClick={() => this.toggleModal("editModal", undefined)}>
              <span aria-hidden={true}>×</span>
            </button>
          </div>
          <div className="modal-body">
            <Form role="form">
              <FormGroup>
                <InputGroup className="input-group-alternative mb-3">
                  <InputGroupAddon addonType="prepend">
                    <InputGroupText>Şifre:</InputGroupText>
                    <Input name="password" type="password" value={this.state.password} onChange={(event) => this.inputChangeHandle(event)} />
                  </InputGroupAddon>
                </InputGroup>
                <InputGroup className="input-group-alternative mb-3">
                  <InputGroupAddon addonType="prepend">
                    <InputGroupText>Yeni Şifre:</InputGroupText>
                    <Input name="newPassword" type="password" value={this.state.newPassword} onChange={(event) => this.inputChangeHandle(event)} />
                  </InputGroupAddon>
                </InputGroup>
                <InputGroup className="input-group-alternative mb-3">
                  <InputGroupAddon addonType="prepend">
                    <InputGroupText>Yeni Şifre (Tekrar):</InputGroupText>
                    <Input name="newPasswordAgain" type="password" value={this.state.newPasswordAgain} onChange={(event) => this.inputChangeHandle(event)} />
                  </InputGroupAddon>
                </InputGroup>
              </FormGroup>
            </Form>
          </div>
          <div className="modal-footer">
            <Button
              color="secondary"
              data-dismiss="modal"
              type="button"
              onClick={() => this.toggleModal("editModal")}>Kapat
                        </Button>
            <Button color="primary" type="submit" onClick={this.updatePassword}>Şifre Güncelle</Button>
          </div>
        </Modal>



        {/* Page content */}
        <Container style={{ marginTop: "-12rem" }} fluid>
          <Row>

            <Col className="order-xl-1" xl="12">
              <Card className="bg-secondary shadow">
                <CardHeader className="bg-white border-0">
                  <Row className="align-items-center">
                    <Col xs="9">
                      <h3 className="mb-0">Hesabım</h3>
                    </Col>
                    <Col className="text-right" xs="1">
                      <Button
                        type="button"
                        color="primary"
                        onClick={(event) => this.updateUserInfo(event)}
                        size="sm"
                      >
                        GÜNCELLE
                      </Button>
                    </Col>
                    <Col className="text-right" xs="1">
                      <Button
                        type="button"
                        color="success"
                        onClick={() => this.toggleModal("editModal")}
                        size="sm"
                      >
                        Şifre Değiştir
                      </Button>
                    </Col>
                  </Row>
                </CardHeader>
                <CardBody>
                  <Form>
                    {/* <h6 className="heading-small text-muted mb-4">
                      User information
                    </h6> */}
                    <div className="pl-lg-4">
                      <Row>
                        <Col lg="6">
                          <FormGroup>
                            <label
                              className="form-control-label"
                              htmlFor="input-username"
                            >
                              Ad-Soyad
                            </label>
                            <Input
                              className="form-control-alternative"
                              defaultValue={this.props.fullName}
                              // value={this.state.fullName}
                              onChange={(event) => this.inputChangeHandle(event)}
                              name="fullName"
                              // placeholder="Ad-S"
                              type="text"
                            />
                          </FormGroup>
                        </Col>
                        <Col lg="6">
                          <FormGroup>
                            <label
                              className="form-control-label"
                              htmlFor="input-email"
                            >
                              Email
                            </label>
                            <Input
                              className="form-control-alternative"
                              defaultValue={this.props.email}
                              //value={this.state.email}
                              onChange={(event) => this.inputChangeHandle(event)}
                              name="email"
                              //placeholder="jesse@example.com"
                              type="email"
                            />
                          </FormGroup>
                        </Col>
                      </Row>
                      <Row>
                        <Col lg="6">
                          <FormGroup>
                            <label
                              className="form-control-label"
                              htmlFor="input-first-name"
                            >
                              Unvan
                            </label>
                            <Input
                              className="form-control-alternative"
                              defaultValue={this.props.title}

                              onChange={(event) => this.inputChangeHandle(event)}

                              name="title"
                              // placeholder="First name"
                              type="text"
                            />
                          </FormGroup>
                        </Col>
                        <Col lg="6">

                        </Col>
                      </Row>
                    </div>
                    <hr className="my-4" />


                  </Form>
                </CardBody>
              </Card>
            </Col>
          </Row>
        </Container>
      </>
    );
  }
}


const mapStateToProps = state => {
  return {
    email: state.userInfo.email,
    fullName: state.userInfo.fullName,
    title: state.userInfo.title,
    deviceId: state.userInfo.deviceId,
    statusTextInGet: state.userInfo.statusTextInGet,
    statusTextInUpdates: state.userInfo.statusTextInUpdates,
    responseInUpdate: state.userInfo.responseInUpdate,
    error: state.userInfo.error
  };
}
const mapDispatchToProps = dispatch => {
  return {
    getUserInfo: () => dispatch(actions.userInfoActions.getUserInfo()),
    updateUserInfo: (id, data) => dispatch(actions.userInfoActions.updateUserInfo(id, data)),
  };
}





export default connect(mapStateToProps, mapDispatchToProps)(Profile);

// export default Profile;
