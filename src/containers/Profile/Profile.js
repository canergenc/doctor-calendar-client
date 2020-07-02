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

import UserHeader from "../../components/Headers/UserHeader.jsx";
import { helperService } from "../../services";

import "./Profile.css"

const MySwal = withReactContent(Swal)

class Profile extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      submitted: false,
      editModal: false,
      email: this.props.email,
      fullName: "",
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
    if (!this.props.email || !this.props.fullName) {
      this.props.getUserInfo();
    }
  }

  componentDidUpdate() {
    if (this.props.error) {
      MySwal.fire({
        icon: 'error',
        title: 'İşlem başarısız',
        text: this.props.statusText
      });
      this.props.cleanFlagUserInfo();
    }
    else if (this.props.crudSuccess) {
      MySwal.fire({
        icon: 'success',
        title: 'Başarılı',
        text: this.props.message
      });
      this.props.cleanFlagUserInfo();
    }
  }

  inputChangeHandle(event) {
    const target = event.target;
    if (target.name === 'email')
      this.setState({ email: event.target.value, submitted: false });
    if (target.name === 'fullName')
      this.setState({ fullName: event.target.value, submitted: false });
    if (target.name === 'password')
      this.setState({ password: event.target.value, submitted: false });
    if (target.name === 'newPassword')
      this.setState({ newPassword: event.target.value, submitted: false });
    if (target.name === 'newPasswordAgain')
      this.setState({ newPasswordAgain: event.target.value, submitted: false });
  }

  setInputDefaultValue() {
    if (this.props.email) {
      this.setState({ email: this.props.email });
    }

    if (this.props.fullName) {
      this.setState({ fullName: this.props.fullName });
    }
  }

  passwordValidation() {
    let formIsValid = true;
    const { password, newPassword, newPasswordAgain } = this.state;

    if (!password || !newPassword || !newPasswordAgain) {
      formIsValid = false;
    }

    if (password && password.length < 8) {
      formIsValid = false;
    }

    if (newPassword && newPassword.length < 8) {
      formIsValid = false;
    }

    if (newPasswordAgain && newPasswordAgain.length < 8) {
      formIsValid = false;
    }

    if (newPassword && newPasswordAgain && newPasswordAgain !== newPassword) {
      formIsValid = false;
    }

    return formIsValid
  }

  updatePassword(event) {
    this.setState({ submitted: true });
    if (this.passwordValidation()) {
      var data = {
        oldPassword: this.state.password,
        currentPassword: this.state.newPassword
      }

      var userId = helperService.getUserId();
      this.props.updateUserInfo(userId, data);
      this.toggleModal('editModal');
      event.preventDefault();
    }
  }

  updateUserInfo(event) {

    var data = {
      fullName: this.state.fullName ? this.state.fullName : this.props.fullName,
      email: this.state.email ? this.state.email : this.props.email,
      deviceId: this.state.deviceId ? this.state.deviceId : this.props.deviceId,
    }

    var userId = helperService.getUserId();
    this.props.updateUserInfo(userId, data);

  }

  toggleModal(state) {
    this.setState({
      [state]: !this.state[state],
      password: '',
      newPassword: '',
      newPasswordAgain: '',
      submitted:false
    });
  };

  render() {
    const { submitted, password, newPassword, newPasswordAgain } = this.state;
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
                    <InputGroupText>Geçerli Şifre:</InputGroupText>
                    <Input name="password" type="password" value={this.state.password} onChange={(event) => this.inputChangeHandle(event)} />
                  </InputGroupAddon>
                </InputGroup>
                {submitted && !password &&
                  <p style={{ fontSize: 12, marginTop: '2%' }} className="text-warning">Şifre gerekli.</p>
                }
                {submitted && password && password.length < 8 &&
                  <p style={{ fontSize: 12, marginTop: '2%' }} className="text-warning">Şifre en az 8 karekter olmalı.</p>
                }

                <InputGroup className="input-group-alternative mb-3">
                  <InputGroupAddon addonType="prepend">
                    <InputGroupText>Yeni Şifre:</InputGroupText>
                    <Input name="newPassword" type="password" value={this.state.newPassword} onChange={(event) => this.inputChangeHandle(event)} />
                  </InputGroupAddon>
                </InputGroup>
                {submitted && !newPassword &&
                  <p style={{ fontSize: 12, marginTop: '2%' }} className="text-warning">Yeni Şifre gerekli.</p>
                }
                {submitted && newPassword && newPassword.length < 8 &&
                  <p style={{ fontSize: 12, marginTop: '2%' }} className="text-warning">Yeni Şifre en az 8 karekter olmalı.</p>
                }

                <InputGroup className="input-group-alternative mb-3">
                  <InputGroupAddon addonType="prepend">
                    <InputGroupText>Yeni Şifre (Tekrar):</InputGroupText>
                    <Input name="newPasswordAgain" type="password" value={this.state.newPasswordAgain} onChange={(event) => this.inputChangeHandle(event)} />
                  </InputGroupAddon>
                </InputGroup>
                {submitted && !newPasswordAgain &&
                  <p style={{ fontSize: 12, marginTop: '2%' }} className="text-warning">Yeni Şifre (Tekrar) gerekli.</p>
                }
                {submitted && newPasswordAgain && newPasswordAgain.length < 8 &&
                  <p style={{ fontSize: 12, marginTop: '2%' }} className="text-warning">Yeni Şifre (Tekrar) en az 8 karekter olmalı.</p>
                }
                {submitted && newPasswordAgain && newPasswordAgain.length >= 8 && newPasswordAgain !== newPassword &&
                  <p style={{ fontSize: 12, marginTop: '2%' }} className="text-warning">Yeni Şifre ve Yeni Şifre (Tekrar) aynı olmalı.</p>
                }

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
        <Container style={{ marginTop: "-12rem" }} fluid className="profile">
          <Row>

            <Col className="order-xl-1" xl="12">
              <Card className="bg-secondary shadow">
                <CardHeader className="bg-white border-0">
                  <Row className="align-items-center">
                    <Col xl="8" lg="6" md="3" sm="2" xs="3">
                      <h3 className="mb-0">Hesabım</h3>
                    </Col>
                    <Col className="text-right" xl="4" lg="6" md="9" sm="10" xs="9">
                      <Button
                        type="button"
                        color="primary"
                        onClick={(event) => this.updateUserInfo(event)}
                        size="sm"
                      >
                        GÜNCELLE
                      </Button>
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
    statusText: state.userInfo.statusText,
    error: state.userInfo.error,
    crudSuccess: state.userInfo.crudSuccess,
    message: state.userInfo.message
  };
}
const mapDispatchToProps = dispatch => {
  return {
    getUserInfo: () => dispatch(actions.userInfoActions.getUserInfo()),
    updateUserInfo: (id, data) => dispatch(actions.userInfoActions.updateUserInfo(id, data)),
    cleanFlagUserInfo: () => dispatch(actions.userInfoActions.cleanFlagsUserInfo()),
  };
}





export default connect(mapStateToProps, mapDispatchToProps)(Profile);

// export default Profile;
