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
import { connect } from 'react-redux';
import React from "react";
// Omitted
import Api from '../../api';
import * as actions from '../../store/actions/index';
// reactstrap components
import {
  Button,
  Alert,
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
  Col
} from "reactstrap";

class Register extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      title: '',
      fullName: '',
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
    else if (target.type === 'password')
      this.setState({ password: event.target.value });
    else if (target.name === 'fullName')
      this.setState({ fullName: event.target.value });
    else if (target.name === 'title')
      this.setState({ title: event.target.value })
  }
  handleSubmit(event) {

    event.preventDefault();
    this.setState({ submitted: true });
    const { title, fullName, email, password } = this.state;
    if (title && fullName && email && password) {
      this.props.register(email, fullName, title, password);
    }
  }
  render() {
    const { title, fullName, email, password, submitted } = this.state;
    return (
      <>
        <Col lg="6" md="8">
          <Card className="bg-secondary shadow border-0">
            <CardHeader className="bg-transparent pb-5">
              <div className="text-muted text-center mt-2 mb-4">
                <small>Kayıt Ol</small>
              </div>
              <div className="text-center">
                <Button
                  className="btn-neutral btn-icon mr-4"
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
                <small>Lütfen bilgilerinizi giriniz</small>
              </div>

              {this.props.statusText ?
                <Alert color="warning">
                  {this.props.statusText}
                </Alert>
                : ''}

              <Form role="form" onSubmit={this.handleSubmit}>
                <FormGroup>
                  <InputGroup className="input-group-alternative mb-3">
                    <InputGroupAddon addonType="prepend">
                      <InputGroupText>
                        <i className="ni ni-single-02" />
                      </InputGroupText>
                    </InputGroupAddon>
                    <Input placeholder="Ad ve Soyad" name="fullName" type="text" value={this.state.fullName} onChange={this.handleInputChange} />
                  </InputGroup>
                  {submitted && !fullName &&

                    <p style={{ fontSize: 12 }} className="text-warning">Ad ve soyad gerekli.</p>
                    // <div style={{ color: 'red', fontSize: 12, marginTop: '2%' }}>Email gerekli.</div>
                  }

                </FormGroup>
                <FormGroup>
                  <InputGroup className="input-group-alternative mb-3">
                    <InputGroupAddon addonType="prepend">
                      <InputGroupText>
                        <i className="ni ni-badge" />
                      </InputGroupText>
                    </InputGroupAddon>
                    <Input placeholder="Ünvan" name="title" type="text" value={this.state.title} onChange={this.handleInputChange} />


                  </InputGroup>


                  {submitted && !title &&

                    <p style={{ fontSize: 12 }} className="text-warning">Ünvan gerekli.</p>
                    // <div style={{ color: 'red', fontSize: 12, marginTop: '2%' }}>Email gerekli.</div>
                  }



                </FormGroup>
                <FormGroup>
                  <InputGroup className="input-group-alternative mb-3">
                    <InputGroupAddon addonType="prepend">
                      <InputGroupText>
                        <i className="ni ni-email-83" />
                      </InputGroupText>
                    </InputGroupAddon>
                    <Input placeholder="Email" type="email" value={this.state.email} onChange={this.handleInputChange} />
                  </InputGroup>

                  {submitted && !email &&

                    <p style={{ fontSize: 12 }} className="text-warning">Email gerekli.</p>
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
                  {submitted && !password &&

                    <p style={{ fontSize: 12, marginTop: '2%' }} className="text-warning">Şifre gerekli.</p>
                    // <div style={{ color: 'red', fontSize: 12, marginTop: '2%' }}>Email gerekli.</div>
                  }
                </FormGroup>
                {/* <div className="text-muted font-italic">
                  <small>
                    password strength:{" "}
                    <span className="text-success font-weight-700">strong</span>
                  </small>
                </div> */}
                <Row className="my-4">
                  <Col xs="12">
                    <div className="custom-control custom-control-alternative custom-checkbox">
                      <input
                        className="custom-control-input"
                        id="customCheckRegister"
                        type="checkbox"
                      />
                      <label
                        className="custom-control-label"
                        htmlFor="customCheckRegister"
                      >
                        <span className="text-muted">
                          Okudum, kabul ediyorum{" "}
                          <a href="#pablo" onClick={e => e.preventDefault()}>
                            Gizlilik politikası
                          </a>
                        </span>
                      </label>
                    </div>
                  </Col>
                </Row>
                <div className="text-center">
                  <Button className="mt-4" color="primary" type="submit">
                    Kayıt Ol
                  </Button>
                </div>
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
    isRegistered: state.register.isRegistered,
    user: state.register.user,
    statusText: state.register.statusText


  };
}
const mapDispatchToProps = dispatch => {
  return {
    register: (email, fullName, title, password) => dispatch(actions.registerActions.register(email, fullName, title, password)),
  };
}
export default connect(mapStateToProps, mapDispatchToProps)(Register);


