import React from "react";
import { connect } from 'react-redux';
import { Link } from "react-router-dom";
import history from "../../hoc/Config/history"
import * as actions from '../../store/actions/index';
import 'font-awesome/css/font-awesome.min.css';
import * as EmailValidator from 'email-validator';
import withReactContent from 'sweetalert2-react-content';
import Swal from 'sweetalert2'
const MySwal = withReactContent(Swal)

import {
  Button,
  Card,
  CardBody,
  FormGroup,
  Form,
  Input,
  InputGroupAddon,
  InputGroupText,
  InputGroup,
  Row,
  Badge,
  Col,
  Alert
} from "reactstrap";

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      rememberMe: false,
      submitted: false,
    };
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleInputChange(event) {
    this.setState({ submitted: false });

    const target = event.target;
    let emailValid = this.state.emailValid;
    let passwordValid = this.state.passwordValid;
    if (target.name === 'email') {
      this.setState({ email: event.target.value });
    }
    else if (target.name === 'password') {
      this.setState({ password: event.target.value });
    }
    else if (target.name === 'remimberMe') {
      this.setState({ rememberMe: event.target.value })
    }
  }

  forgetPassword() {

    MySwal.fire({
      title: 'Lütfen email adresinizi giriniz',
      input: 'text',
      inputAttributes: {
        autocapitalize: 'off'
      },

      confirmButtonText: 'Kaydet',
      cancelButtonText: 'iptal',
      showCancelButton: true,
      showLoaderOnConfirm: true,
      allowOutsideClick: () => !Swal.isLoading()
    }).then((result) => {
      if (result.value) {

        const email = result.value

        //this.props.forgetPassword(email);
      }
    })
  }




  handleValidation() {
    let formIsValid = true;
    const { email, password } = this.state;
    if (!email || !password) {
      formIsValid = false;
    }
    if (password && password.length < 8) {
      formIsValid = false;
    }

    if (!EmailValidator.validate(email)) {
      formIsValid = false;
    }

    return formIsValid
  }

  handleSubmit(event) {

    event.preventDefault();
    const { email, password, rememberMe } = this.state;
    this.setState({ submitted: true });
    if (this.handleValidation()) {
      this.props.login(email, password, rememberMe);
    }
  }

  forgetPassword() {
    //history.pus('/forgetPassword');

  }





  render() {
    const { password, submitted, email } = this.state;
    const isEmailValid = EmailValidator.validate(email);
    // this.props.isAuthenticating ?  <Spinner /> :<p>Lütfen bekleyiniz.</p>  



    return (
      <>
        <Col lg="5" md="7">
          <Card className="bg-secondary shadow border-0">

            <CardBody className="px-lg-5 py-lg-5">
              <div className="text-center text-muted mb-4">
                {/* <small> </small> */}
                <h1> <Badge color="light">ÜYE GİRİŞİ</Badge></h1>
              </div>
              <Form role="form" onSubmit={this.handleSubmit}>

                {submitted && this.props.statusText && !this.props.isAuthenticated ?

                  <Alert color="warning">
                    {this.props.statusText}
                  </Alert>
                  : ''}

                <FormGroup className="mb-3">
                  <InputGroup className="input-group-alternative">
                    <InputGroupAddon addonType="prepend">
                      <InputGroupText>
                        <i className="ni ni-email-83" />
                      </InputGroupText>
                    </InputGroupAddon>
                    <Input placeholder="Email" type="text" name="email" value={this.state.email} onChange={this.handleInputChange} />

                  </InputGroup>
                  {submitted && !email ?
                    <p style={{ fontSize: 12, marginTop: '1%' }} className="text-warning">Email gerekli.</p>
                    : null}

                  {submitted && email && !isEmailValid ?
                    <p style={{ fontSize: 12, marginTop: '1%' }} className="text-warning">Email formatı uygun değil.</p>
                    : null}

                </FormGroup>
                <FormGroup>
                  <InputGroup className="input-group-alternative">
                    <InputGroupAddon addonType="prepend">
                      <InputGroupText>
                        <i className="ni ni-lock-circle-open" />
                      </InputGroupText>
                    </InputGroupAddon>
                    <Input placeholder="Şifre" type="password" name="password" value={this.state.password} onChange={this.handleInputChange} />
                  </InputGroup>

                  {submitted && !password ?
                    <p style={{ fontSize: 12, marginTop: '1%' }} className="text-warning">Şifre gerekli.</p> : null
                  }

                  {submitted && password.length < 8 && password.length > 0 ?
                    <p style={{ fontSize: 12, marginTop: '1%' }} className="text-warning">Şifre 8 karakter olmalı.</p> : null
                  }

                </FormGroup>

                <Row className="my-4">
                  <Col xs="7">
                    <div className="custom-control custom-control-alternative custom-checkbox">
                      <input
                        className="custom-control-input"
                        id="customCheckRegister"
                        name="remimberMe"
                        type="checkbox"
                        onChange={(e) => this.handleInputChange(e)}

                      />
                      <label
                        className="custom-control-label"
                        htmlFor="customCheckRegister"
                      >
                        <span className="text-muted">
                          Beni hatırla
                        </span>
                      </label>
                    </div>
                  </Col>

                  <Col xs="5">

                    <Link
                      
                      to="/auth/password-forgot"
                    >
                      <small>Şifremi Unuttum</small>
                    </Link>
                   
                  </Col>

                </Row>

                <Row>

                  <Button style={{ height: '45px' }} block color="primary" >

                    {this.props.isAuthenticating && (
                      <i
                        className="fa fa-refresh fa-spin"
                        style={{ marginRight: "5px" }}
                      />
                    )}

                    {this.props.isAuthenticating && <span>Lütfen bekleyin...</span>}
                    {!this.props.isAuthenticating && <span>Giriş Yap</span>}
                  </Button>

                </Row>

              </Form>
            </CardBody>
          </Card>
          
        </Col>

      </>
    );
  }
}


const mapStateToProps = state => {
  return {
    isAuthenticating: state.auth.isAuthenticating,
    statusText: state.auth.statusText,
    isAuthenticated: state.auth.isAuthenticated
  };
}
const mapDispatchToProps = dispatch => {
  return {
    login: (email, password, isRememberMe) => dispatch(actions.authActions.login(email, password, isRememberMe)),
  };
}
export default connect(mapStateToProps, mapDispatchToProps)(Login);




