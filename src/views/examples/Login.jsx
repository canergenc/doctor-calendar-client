/*!

=========================================================
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
// Omitted
import Api from '../../api';
// reactstrap components


import {
  Button,
  Card,
  CardHeader,
  CardBody,
  FormGroup,
  Form,
  Input,
  InputGroupAddon,
  InputGroupText,
  InputGroup,
  Row,
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
    const target = event.target;
    if (target.type === 'email')
      this.setState({ email: event.target.value });
    else
      this.setState({ password: event.target.value });
  }
  handleSubmit(event) {
    event.preventDefault();
    this.setState({ submitted: true });
    const { email, password } = this.state;
    if (email && password) {
      this.props.login(email, password);
    }



    // if(!this.state.email || !this.state.password) { alert("Zorunlu Alanlar Boş Bırakılamaz!") }
    // Api.post('users/login', { email: this.state.email, password: this.state.password }).then(res => {
    //   console.log(res);
    //   alert(res.data.token);
    // }).catch(ex => {
    //   console.log(ex);
    //   if(!ex && !ex.message)
    //   this.alertExample(ex.message);
    //   else
    //   this.alertExample(ex);
    // })
    // event.preventDefault();
  }
  alertExample(value) {
    return (
      <div>
        <Alert color="primary">
          This is a primary alert — check it out!
      </Alert>
      </div>

    );
  }

  render() {
    const { email, password, submitted } = this.state;
    return (
      <>
        <Col lg="5" md="7">
          <Card className="bg-secondary shadow border-0">
            <CardHeader className="bg-transparent pb-5">
              <div className="text-muted text-center mt-2 mb-3">
                <small>Doctor Calendar Giriş Yap</small>
              </div>
              {this.props.statusText ? <div className='alert alert-info'>{this.props.statusText}</div> : ''}
              <div className="btn-wrapper text-center">
                <Button
                  className="btn-neutral btn-icon"
                  color="default"
                  href="#pablo"
                  onClick={e => e.preventDefault()}
                >
                  <span className="btn-inner--icon">
                    <img
                      alt="..."
                      src={require("assets/img/icons/common/github.svg")}
                    />
                  </span>
                  <span className="btn-inner--text">Github(v2)</span>
                </Button>
                <Button
                  className="btn-neutral btn-icon"
                  color="default"
                  href="#pablo"
                  onClick={e => e.preventDefault()}
                >
                  <span className="btn-inner--icon">
                    <img
                      alt="..."
                      src={require("assets/img/icons/common/google.svg")}
                    />
                  </span>
                  <span className="btn-inner--text">Google(v2)</span>
                </Button>
              </div>
            </CardHeader>
            <CardBody className="px-lg-5 py-lg-5">
              <div className="text-center text-muted mb-4">
                <small>Doctor Calendar App Giriş Yap</small>
              </div>
              <Form role="form" onSubmit={this.handleSubmit}>

                <FormGroup className="mb-3">
                  <InputGroup className="input-group-alternative">
                    <InputGroupAddon addonType="prepend">
                      <InputGroupText>
                        <i className="ni ni-email-83" />
                      </InputGroupText>
                    </InputGroupAddon>
                    <Input placeholder="Email" type="email" value={this.state.email} onChange={this.handleInputChange} />

                  </InputGroup>
                  {submitted && !email &&
                    <div style={{ color: 'red', fontSize: 12, marginTop: '2%' }}>Email gerekli.</div>
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

                  {submitted && !password &&
                    <div style={{ color: 'red', fontSize: 12, marginTop: '2%' }} >Şifre gerekli.</div>
                  }

                </FormGroup>
                <div className="custom-control custom-control-alternative custom-checkbox">
                  <input
                    className="custom-control-input"
                    id=" customCheckLogin"
                    type="checkbox"
                  />
                  <label
                    className="custom-control-label"
                    htmlFor=" customCheckLogin"
                  >
                    <span className="text-muted">Beni Hatırla</span>
                  </label>
                </div>
                <div className="text-center">
                  <Button className="my-4" color="primary" type="submit" >Giriş Yap</Button>

                  
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
    isAuthenticating   : state.auth.isAuthenticating,
    statusText         : state.auth.statusText
    
  };
}
const mapDispatchToProps = dispatch => {
  return {
    login: (email, password) => dispatch(actions.loginProcess(email, password)),
  };
}
export default connect(mapStateToProps, mapDispatchToProps)(Login);




