import * as actions from '../../store/actions/index';
import { connect } from 'react-redux';
import React from "react";
import { Link } from "react-router-dom";

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
            {/* <CardHeader className="bg-transparent pb-5"> */}
            {/* <div className="text-muted text-center mt-2 mb-3">
                <small>DC CALENDAR'A GİRİŞ YAP</small>
              </div> */}





            {/* <div className="btn-wrapper text-center">
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
              </div> */}
            {/* </CardHeader> */}
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
                  {submitted && !email &&

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

                  {submitted && !password &&
                    <p style={{ fontSize: 12, marginTop: '1%' }} className="text-warning">Şifre gerekli.</p>
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




