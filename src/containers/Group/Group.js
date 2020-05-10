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

import UserHeader from "components/Headers/UserHeader.jsx";
import { helperService } from "../../services";

const MySwal = withReactContent(Swal)

class GroupSettings extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            editModal: false,
            email: this.props.email,
            fullName: "",
            deviceId: "",
            password: "",
            newPassword: "",
            newPasswordAgain: ""
        };
    }


    render() {
        return (<>
            <UserHeader />
            <Container style={{ marginTop: "-12rem" }} fluid>
          <Row>

            <Col className="order-xl-1" xl="12">
              <Card className="bg-secondary shadow">
                <CardHeader className="bg-white border-0">
                  <Row className="align-items-center">
                    <Col xs="9">
                      <h3 className="mb-0">Hesabım</h3>
                    </Col>
                    <Col className="text-right" xs="1">
                      <Button
                        type="button"
                        color="primary"
                        onClick={(event) => this.updateUserInfo(event)}
                        size="sm"
                      >
                        GÜNCELLE
                      </Button>
                    </Col>
                    <Col className="text-right" xs="1">
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
    };
};

export default GroupSettings;