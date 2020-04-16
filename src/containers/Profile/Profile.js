import React from "react";
import { connect } from 'react-redux';
import * as actions from '../../store/actions/index';

// reactstrap components
import {
  Button,
  Card,
  CardHeader,
  CardBody,
  FormGroup,
  Form,
  Input,
  Container,
  Row,
  Col
} from "reactstrap";
// core components
import UserHeader from "components/Headers/UserHeader.jsx";
import { helperService } from "../../services";

class Profile extends React.Component {


  constructor(props) {
    super(props);
    console.log(props);

    this.state = {
      email: this.props.email,
      fullName: "",
      title: "",
      deviceId: "",
    }
    this.inputChangeHandle = this.inputChangeHandle.bind(this);
    this.updateUserInfo = this.updUserInfo.bind(this);
    this.setInputDefaultValue = this.updUserInfo.bind(this);

  }

  inputChangeHandle(event) {
    const target = event.target;
    if (target.name === 'email')
      this.setState({ email: event.target.value });
    if (target.name === 'fullName')
      this.setState({ fullName: event.target.value });
    if (target.name === 'title')
      this.setState({ title: event.target.value });
    if (target.name === 'deviceId')
      this.setState({ deviceId: event.target.value });
  }

  setInputDefaultValue() {
    if (this.props.deviceId) {
      this.setState({ deviceId: this.props.deviceId });
    }
    if (this.props.email) {
      this.setState({ email: this.props.email });
    }

    if (this.props.fullName) {
      this.setState({ fullName: this.props.fullName });
    }

    if (this.props.title) {
      this.setState({ title: this.props.title });
    }
  }


  componentDidMount() {

    if (!this.props.email || !this.props.fullName || !this.props.title || !this.props.deviceId) {
      this.props.getUserInfo();
    }

    // this.setInputDefaultValue();

  }

  updUserInfo(event) {
    console.log(this.props.title);
    
    var data = {
      title: this.state.title ? this.state.title :this.props.title,
      fullName: this.state.title ? this.state.fullName :this.props.fullName,
      email: this.state.email ? this.state.email :this.props.email,
      deviceId: this.state.deviceId ? this.state.deviceId :this.props.deviceId,
    }
    console.log(data);
    var userId = helperService.getUserId();
    this.props.updateUserInfo(userId, data);

  }




  render() {



    return (
      <>
        <UserHeader fullName={this.props.fullName} />
        {/* Page content */}
        <Container className="mt--7" fluid>
          <Row>

            <Col className="order-xl-1" xl="12">
              <Card className="bg-secondary shadow">
                <CardHeader className="bg-white border-0">
                  <Row className="align-items-center">
                    <Col xs="8">
                      <h3 className="mb-0">Hesabım</h3>
                    </Col>
                    <Col className="text-right" xs="4">
                      <Button
                        type="button"
                        color="primary"
                        onClick={(event) => this.updateUserInfo(event)}
                        size="sm"
                      >
                        GÜNCELLE
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
                          <FormGroup>
                            <label
                              className="form-control-label"
                              htmlFor="input-first-name"
                            >
                              Unvan
                            </label>
                            <Input
                              className="form-control-alternative"
                              defaultValue={this.props.title}

                              onChange={(event) => this.inputChangeHandle(event)}

                              name="title"
                              // placeholder="First name"
                              type="text"
                            />
                          </FormGroup>
                        </Col>
                        <Col lg="6">
                          <FormGroup>
                            <label
                              className="form-control-label"
                              htmlFor="input-last-name"
                            >
                              Cihaz Id
                            </label>
                            <Input
                              className="form-control-alternative"
                              defaultValue={this.props.deviceId}



                              onChange={(event) => this.inputChangeHandle(event)}
                              name="deviceId"
                              // placeholder="Last name"
                              type="text"
                            />
                          </FormGroup>
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
  }
}


const mapStateToProps = state => {


  return {
    email: state.userInfo.email,
    fullName: state.userInfo.fullName,
    title: state.userInfo.title,
    deviceId: state.userInfo.deviceId,
    statusTextInGet: state.userInfo.statusTextInGet,
    statusTextInUpdates: state.userInfo.statusTextInUpdates,
    responseInUpdate: state.userInfo.responseInUpdate,
  };
}
const mapDispatchToProps = dispatch => {
  return {
    getUserInfo: () => dispatch(actions.userInfoActions.getUserInfo()),
    updateUserInfo: (id, data) => dispatch(actions.userInfoActions.updateUserInfo(id, data)),
  };
}





export default connect(mapStateToProps, mapDispatchToProps)(Profile);

// export default Profile;
