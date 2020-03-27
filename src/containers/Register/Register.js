import { connect } from 'react-redux';
import React from "react";
import * as actions from '../../store/actions/index';
import 'font-awesome/css/font-awesome.min.css';

// reactstrap components
import {
  Button,
  Alert,
  Card,
  Badge,
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

            <CardBody className="px-lg-5 py-lg-5">
              <div className="text-center text-muted mb-4">
                <h1> <Badge color="light">ÜYE OL</Badge></h1>
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

                  <Button className="mt-4" color="primary" type="submit" disabled={this.props.isRegistiring}>

                    {this.props.isRegistiring && (
                      <i
                        className="fa fa-refresh fa-spin"
                        style={{ marginRight: "5px" }}
                      />
                    )}

                    {this.props.isRegistiring && <span>Lütfen bekleyin...</span>}
                    {!this.props.isRegistiring && <span>Kayıt Ol</span>}
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
    isRegistiring: state.register.isRegistiring,
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


