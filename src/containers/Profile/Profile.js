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

class Profile extends React.Component {

  
  constructor(props) {
    super(props);
    console.log(props);
  }

  componentDidMount() {
   this.props.getUserInfo();
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
                        color="primary"
                        href="#pablo"
                        onClick={e => e.preventDefault()}
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
                              id="input-username"
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
                              id="input-email"
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
                              id="input-first-name"
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
                              id="input-last-name"
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

  console.log(state);
  
  return {
    email: state.userInfo.email,
    fullName: state.userInfo.fullName,
    title: state.userInfo.title,
    deviceId: state.userInfo.deviceId
  };
}
const mapDispatchToProps = dispatch => {
  return {
    getUserInfo: () => dispatch(actions.userInfoActions.getUserInfo()),
  };
}





export default connect(mapStateToProps, mapDispatchToProps)(Profile);

// export default Profile;
