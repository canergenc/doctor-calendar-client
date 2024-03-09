import React, { useState } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import * as actions from "../../store/actions/index";
import "font-awesome/css/font-awesome.min.css";
import * as EmailValidator from "email-validator";
import withReactContent from "sweetalert2-react-content";
import Swal from "sweetalert2";

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
  Alert,
} from "reactstrap";
const MySwal = withReactContent(Swal);

const login = (props) => {
  const { t } = useTranslation();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const isEmailValid = EmailValidator.validate(email);

  const handleInputChange = (event) => {
    setSubmitted(false);

    const target = event.target;
    if (target.name === "email") {
      setEmail(event.target.value);
    } else if (target.name === "password") {
      setPassword(event.target.value);
    } else if (target.name === "rememberMe") {
      setRememberMe(event.target.value);
    }
  };

  const forgetPassword = () => {
    MySwal.fire({
      title: "Lütfen email adresinizi giriniz",
      input: "text",
      inputAttributes: {
        autocapitalize: "off",
      },

      confirmButtonText: "Kaydet",
      cancelButtonText: "iptal",
      showCancelButton: true,
      showLoaderOnConfirm: true,
      allowOutsideClick: () => !Swal.isLoading(),
    }).then((result) => {
      if (result.value) {
        const email = result.value;

        props.forgetPassword(email);
      }
    });
  };

  const handleValidation = () => {
    let formIsValid = true;
    if (!email || !password) {
      formIsValid = false;
    }
    if (password && password.length < 8) {
      formIsValid = false;
    }

    if (!EmailValidator.validate(email)) {
      formIsValid = false;
    }

    return formIsValid;
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    setSubmitted(true);
    if (handleValidation()) {
      props.loginAction(email, password, rememberMe);
    }
  };

  return (
    <>
      <Col lg="5" md="7">
        <Card className="bg-secondary shadow border-0">
          <CardBody className="px-lg-5 py-lg-5">
            <div className="text-center text-muted mb-4">
              <h1>
                <Badge color="light">{t("header")}</Badge>
              </h1>
            </div>
            <Form role="form" onSubmit={handleSubmit}>
              {submitted && props.statusText && !props.isAuthenticated ? (
                <Alert color="warning">{props.statusText}</Alert>
              ) : (
                ""
              )}

              <FormGroup className="mb-3">
                <InputGroup className="input-group-alternative">
                  <InputGroupAddon addonType="prepend">
                    <InputGroupText>
                      <i className="ni ni-email-83" />
                    </InputGroupText>
                  </InputGroupAddon>
                  <Input
                    placeholder="Email"
                    type="text"
                    name="email"
                    value={email}
                    onChange={handleInputChange}
                  />
                </InputGroup>
                {submitted && !email ? (
                  <p
                    style={{ fontSize: 12, marginTop: "1%" }}
                    className="text-warning"
                  >
                    {t("email.need")}
                  </p>
                ) : null}

                {submitted && email && !isEmailValid ? (
                  <p
                    style={{ fontSize: 12, marginTop: "1%" }}
                    className="text-warning"
                  >
                    {t("email.format")}
                  </p>
                ) : null}
              </FormGroup>
              <FormGroup>
                <InputGroup className="input-group-alternative">
                  <InputGroupAddon addonType="prepend">
                    <InputGroupText>
                      <i className="ni ni-lock-circle-open" />
                    </InputGroupText>
                  </InputGroupAddon>
                  <Input
                    placeholder="Şifre"
                    type="current-password"
                    name="password"
                    value={password}
                    onChange={handleInputChange}
                  />
                </InputGroup>

                {submitted && !password ? (
                  <p
                    style={{ fontSize: 12, marginTop: "1%" }}
                    className="text-warning"
                  >
                    {t("password.need")}
                  </p>
                ) : null}

                {submitted && password.length < 8 && password.length > 0 ? (
                  <p
                    style={{ fontSize: 12, marginTop: "1%" }}
                    className="text-warning"
                  >
                    {t("password.char")}
                  </p>
                ) : null}
              </FormGroup>

              <Row className="my-4">
                <Col xs="7">
                  <div className="custom-control custom-control-alternative custom-checkbox">
                    <input
                      className="custom-control-input"
                      id="customCheckRegister"
                      name="rememberMe"
                      type="checkbox"
                      onChange={handleInputChange}
                    />
                    <label
                      className="custom-control-label"
                      htmlFor="customCheckRegister"
                    >
                      <span className="text-muted">
                        {t("login.rememberMe")}
                      </span>
                    </label>
                  </div>
                </Col>

                <Col xs="5">
                  <Link to="/auth/password-forgot">
                    <small>{t("password.forget")}</small>
                  </Link>
                </Col>
              </Row>

              <Row>
                <Button style={{ height: "45px" }} block color="primary">
                  {props.isAuthenticating && (
                    <i
                      className="fa fa-refresh fa-spin"
                      style={{ marginRight: "5px" }}
                    />
                  )}

                  {props.isAuthenticating && <span>{t("general.wait")}</span>}
                  {!props.isAuthenticating && <span>{t("login.button")}</span>}
                </Button>
              </Row>
            </Form>
          </CardBody>
        </Card>
      </Col>
    </>
  );
};

const mapStateToProps = (state) => {
  return {
    isAuthenticating: state.auth.isAuthenticating,
    statusText: state.auth.statusText,
    isAuthenticated: state.auth.isAuthenticated,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    loginAction: (email, password, isRememberMe) =>
      dispatch(actions.authActions.login(email, password, isRememberMe)),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(login);
