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
import * as EmailValidator from 'email-validator';
import { withTranslation } from "react-i18next";

class Register extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      fullName: '',
      email: '',
      password: '',
      submitted: false,
      privacyPolicy: false,
      isClickPrivacyModal: false,
    };
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleInputChange(event) {
    this.setState({ submitted: false });
    const target = event.target;
    if (target.name === 'email')
      this.setState({ email: event.target.value });
    else if (target.name === 'password')
      this.setState({ password: event.target.value });
    else if (target.name === 'fullName')
      this.setState({ fullName: event.target.value });
    else if (target.name === 'privacyPolicy')
      this.setState({ privacyPolicy: !this.state.privacyPolicy })
  }

  handleValidation() {
    let formIsValid = true;
    const { fullName, email, password, privacyPolicy } = this.state;
    if (!fullName || !email || !password) {
      formIsValid = false;
    }
    if (password && password.length < 8) {
      formIsValid = false;
    }
    if (!privacyPolicy) {
      formIsValid = false
    }
    if (!EmailValidator.validate(email)) {
      formIsValid = false;
    }
    return formIsValid
  }

  handleSubmit(event) {
    event.preventDefault();
    const { fullName, email, password } = this.state;
    this.setState({ submitted: true });
    if (this.handleValidation()) {
      this.props.register(email, fullName, password);
    }
  }

  togglePrivacyCondition(state) {
    this.setState({
      [state]: !this.state[state]
    });
  };

  render() {
    const { t } = this.props;
    const { fullName, email, password, submitted, privacyPolicy } = this.state;
    const isEmailValid = EmailValidator.validate(email);
    return (
      <>


        {/* <Modal
          className="modal-dialog-centered"

          isOpen={this.state.isClickPrivacyModal}
          toggle={() => this.togglePrivacyCondition("isClickPrivacyModal")}>
          <div className="modal-header">
            <h5 className="modal-title" id="editModalLabel">Üyelik Sözleşmesi</h5>
            <button
              aria-label="Close"
              className="close"
              data-dismiss="modal"
              type="button"
              onClick={() => this.togglePrivacyCondition("isClickPrivacyModal")}>
              <span aria-hidden={true}>×</span>
            </button>
          </div>
          <div className="modal-body">
            Bir şeyler yazılacak....
          </div>
          <div className="modal-footer">
            <Button
              color="secondary"
              data-dismiss="modal"
              type="button"
              onClick={() => this.togglePrivacyCondition("isClickPrivacyModal")}>Geri Dön
                        </Button>

          </div>
        </Modal> */}


        <Col lg="5" md="7">
          <Card className="bg-secondary shadow border-0">

            <CardBody className="px-lg-5 py-lg-5">
              <div className="text-center text-muted mb-4">
                <h1> <Badge color="light">{t('register.header')}</Badge></h1>
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
                    <Input placeholder={t('register.fullName')} name="fullName" type="text" value={this.state.fullName} onChange={this.handleInputChange} />
                  </InputGroup>
                  {submitted && !fullName &&

                    <p style={{ fontSize: 12 }} className="text-warning">{t('register.needFullName')}</p>
                  }

                </FormGroup>

                <FormGroup>
                  <InputGroup className="input-group-alternative mb-3">
                    <InputGroupAddon addonType="prepend">
                      <InputGroupText>
                        <i className="ni ni-email-83" />
                      </InputGroupText>
                    </InputGroupAddon>
                    <Input name="email" placeholder={t('register.email')} type="text" value={this.state.email} onChange={this.handleInputChange} />
                  </InputGroup>

                  {submitted && !email &&

                    <p style={{ fontSize: 12 }} className="text-warning">{t('email.need')}</p>
                  }

                  {submitted && email && !isEmailValid &&

                    <p style={{ fontSize: 12 }} className="text-warning">{t('email.format')}</p>
                  }
                </FormGroup>
                <FormGroup>
                  <InputGroup className="input-group-alternative">
                    <InputGroupAddon addonType="prepend">
                      <InputGroupText>
                        <i className="ni ni-lock-circle-open" />
                      </InputGroupText>
                    </InputGroupAddon>
                    <Input placeholder={t('password.password')} type="password" name="password" value={this.state.password} onChange={this.handleInputChange} />
                  </InputGroup>
                  {submitted && !password &&

                    <p style={{ fontSize: 12, marginTop: '2%' }} className="text-warning">{t('password.need')}</p>


                    // <div style={{ color: 'red', fontSize: 12, marginTop: '2%' }}>Email gerekli.</div>
                  }


                  {submitted && password && password.length < 8 &&

                    <p style={{ fontSize: 12, marginTop: '2%' }} className="text-warning">{t('password.char')}</p>


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
                        name="privacyPolicy"
                        type="checkbox"
                        onChange={(e) => this.handleInputChange(e)}

                      />
                      <label
                        className="custom-control-label"
                        htmlFor="customCheckRegister"
                      >
                        <span className="text-muted">
                          <a href="https://omnicali-demo.web.app/terms_and_conditions.htm" >
                            {t('register.termsOfMembership')}
                          </a>
                        </span>
                      </label>
                    </div>
                  </Col>
                </Row>

                {submitted && !privacyPolicy &&
                  <p style={{ fontSize: 12 }} className="text-warning">{t('register.privacyPolicy')}</p>
                  // <div style={{ color: 'red', fontSize: 12, marginTop: '2%' }}>Email gerekli.</div>
                }

                <Row>
                  <Button  style={{ height: '45px' }} block color="primary" color="primary" type="submit" disabled={this.props.isRegistiring} >

                    {this.props.isRegistiring && (
                      <i
                        className="fa fa-refresh fa-spin"
                        style={{ marginRight: "5px" }}
                      />
                    )}

                    {this.props.isRegistiring && <span>{t('general.wait')}</span>}
                    {!this.props.isRegistiring && <span>{t('register.signUp')}</span>}
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
    isRegistiring: state.register.isRegistiring,
    isRegistered: state.register.isRegistered,
    user: state.register.user,
    statusText: state.register.statusText
  };
}
const mapDispatchToProps = dispatch => {
  return {
    register: (email, fullName, password) => dispatch(actions.registerActions.register(email, fullName, password)),
  };
}
export default withTranslation()(connect(mapStateToProps, mapDispatchToProps)(Register));
