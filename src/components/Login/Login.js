import React from "react";
import { connect } from 'react-redux';
import { Link } from "react-router-dom";
import * as actions from '../../store/actions/index';
import 'font-awesome/css/font-awesome.min.css';

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
      emailValid: true,
      password: '',
      passwordValid: true,
      formErrors: { email: '', password: '' },
      rememberMe: false,
      submitted: false,
      formValid: false
    };
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.emailRef = React.createRef();
  }

  handleInputChange(event) {
    this.setState({ submitted: false });
    const target = event.target;
    let emailValid = this.state.emailValid;
    let passwordValid = this.state.passwordValid;
    if (target.name === 'email') {
      emailValid = event.target.value.match(/^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i);
      this.setState({ email: event.target.value, emailValid: emailValid });
    }
    else if (target.name === 'password') {
      passwordValid = event.target.value !== "" ? true : false;
      this.setState({ password: event.target.value, passwordValid: passwordValid });
    }
    else if (target.name === 'remimberMe') {
      this.setState({ rememberMe: this.state.rememberMe })
    }
  }

  handleCheckBoxInput(event) {
    this.setState({ rememberMe: !this.state.rememberMe })
  }

  handleSubmit(event) {
    event.preventDefault();
    if (this.state.email && this.state.password) {
      if (this.state.password.length >= 8) {
        this.setState({ submitted: true });
        this.props.login(this.state.email, this.state.password, this.state.rememberMe);
      }
    }
  }


  render() {
    const { password, submitted, emailValid, passwordValid } = this.state;

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
                    <Input placeholder="Email" type="email" name="email"  ref={this.emailRef} onChange={this.handleInputChange} />

                  </InputGroup>
                  {!emailValid ?
                    <p style={{ fontSize: 12, marginTop: '1%' }} className="text-warning">Email gerekli.</p>
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

                  {!passwordValid ?
                    <p style={{ fontSize: 12, marginTop: '1%' }} className="text-warning">Şifre gerekli.</p> : null
                  }

                  {password.length < 8 && password.length > 0 ?
                    <p style={{ fontSize: 12, marginTop: '1%' }} className="text-warning">Şifre 8 karakter olmalı.</p> : null
                  }

                </FormGroup>

                <Row className="my-4">
                  <Col xs="12">
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
                </Row>


                <div className="text-center">


                  <Button className="my-4" color="primary" disabled={this.props.isAuthenticating}>

                    {this.props.isAuthenticating && (
                      <i
                        className="fa fa-refresh fa-spin"
                        style={{ marginRight: "5px" }}
                      />
                    )}

                    {this.props.isAuthenticating && <span>Lütfen bekleyin...</span>}
                    {!this.props.isAuthenticating && <span>Giriş Yap</span>}
                  </Button>

                </div>
              </Form>
            </CardBody>
          </Card>
          <Row className="mt-3">
            <Col xs="6">
              <a
                className="text-light"
                href="#pablo"
                onClick={e => e.preventDefault()}
              >
                <small>Parolamı Unuttum</small>
              </a>
            </Col>
            <Col className="text-right" xs="6">
              <Link
                className="text-light"
                to="/auth/register"
              >
                <small>Yeni Hesap Oluştur</small>
              </Link>
            </Col>
          </Row>
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




