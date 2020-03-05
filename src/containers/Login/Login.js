/*!

* Argon Dashboard React - v1.0.0
=========================================================

* Product Page: https://www.creative-tim.com/product/argon-dashboard-react
* Copyright 2019 Creative Tim (https://www.creative-tim.com)
* Licensed under MIT (https://github.com/creativetimofficial/argon-dashboard-react/blob/master/LICENSE.md)

* Coded by Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/

import * as actions from '../../store/actions/index';
import { connect } from 'react-redux';
import React from "react";
import { Link } from "react-router-dom";
import Api from '../../api';

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
      submitted: false
    };
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  handleInputChange(event) {
    console.log(event.target);
    this.setState({ submitted: false });
    const target = event.target;
    if (target.type === 'email')
      this.setState({ email: event.target.value });
    else
      this.setState({ password: event.target.value });

  }
  handleSubmit(event) {
    event.preventDefault();
    if (this.state.email && this.state.password) {
      if (this.state.password.length >= 8) {
        this.setState({ submitted: true });
        this.props.login(this.state.email, this.state.password);
      }
    }


    // event.preventDefault();
  }
  // alertExample(value) {
  //   return (
  //     <div>
  //       <Alert color="primary">
  //         This is a primary alert — check it out!
  //     </Alert>
  //     </div>

  //   );
  // }

  render() {
    const { email, password, submitted } = this.state;
    return (
      <>
        <Col lg="5" md="7">
          <Card className="bg-secondary shadow border-0">
           
            <CardBody className="px-lg-5 py-lg-5">
              <div className="text-center text-muted mb-4">
                {/* <small> </small> */}
                <h1> <Badge color="light">DC CALENDAR GİRİŞ</Badge></h1>
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
                    <Input placeholder="Email" type="email" value={this.state.email} onChange={this.handleInputChange} />

                  </InputGroup>
                  {!email &&

                    <p style={{ fontSize: 12, marginTop: '1%' }} className="text-warning">Email gerekli.</p>
                    // <div style={{ color: 'red', fontSize: 12, marginTop: '2%' }}>Email gerekli.</div>
                  }

                </FormGroup>
                <FormGroup>
                  <InputGroup className="input-group-alternative">
                    <InputGroupAddon addonType="prepend">
                      <InputGroupText>
                        <i className="ni ni-lock-circle-open" />
                      </InputGroupText>
                    </InputGroupAddon>
                    <Input placeholder="Şifre" type="password" value={this.state.password} onChange={this.handleInputChange} />
                  </InputGroup>

                  {!password &&
                    <p style={{ fontSize: 12, marginTop: '1%' }} className="text-warning">Şifre gerekli.</p>
                    // <div style={{ color: 'red', fontSize: 12, marginTop: '2%' }} >Şifre gerekli.</div>
                  }

                  {password.length < 8 && password &&
                    <p style={{ fontSize: 12, marginTop: '1%' }} className="text-warning">Şifre 8 karakter olmalı.</p>
                    // <div style={{ color: 'red', fontSize: 12, marginTop: '2%' }} >Şifre gerekli.</div>
                  }

                </FormGroup>

                {/* <div className="custom-control custom-control-alternative custom-checkbox">
                  <input
                    className="custom-control-input"
                    id=" customCheckLogin"
                    type="checkbox"
                  />
                  <label style={{display:'contents'}}
                    className="custom-control-label"
                    htmlFor=" customCheckLogin"
                  >
                    <span className="text-muted">Beni Hatırla</span>
                  </label>
                </div>  */}
                <div className="text-center">
                  <Button block className="my-4" color="primary" type="submit" >Giriş Yap</Button>


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
    login: (email, password) => dispatch(actions.authActions.login(email, password)),
  };
}
export default connect(mapStateToProps, mapDispatchToProps)(Login);




