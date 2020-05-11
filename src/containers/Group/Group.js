import React from "react";
import { connect } from 'react-redux';
import * as actions from '../../store/actions/index';

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
  Col,
  Label
} from "reactstrap";
import 'pretty-checkbox';
import withReactContent from 'sweetalert2-react-content';
import Swal from 'sweetalert2';
import UserHeader from "../../components/Headers/UserHeader.jsx";

const MySwal = withReactContent(Swal)

class GroupSettings extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      isWeekdayControl: false,
      isWeekdayControlChange: false,
      isWeekendControl: false,
      isWeekendControlChange: false,
      sequentialOrderLimitCount: "",
      sequentialOrderLimitCountChange: false,
      locationDayLimit: false,
      locationDayLimitChange: false
    }
    this.inputChangeHandle = this.inputChangeHandle.bind(this);

  }

  componentDidMount() {
    if (!this.props.isWeekdayControl || !this.props.isWeekendControl || !this.props.sequentialOrderLimitCount || !this.props.locationDayLimit) {
      this.props.getGroupSettings();
    }
  }

  componentDidUpdate() {
    if (this.props.error) {
      MySwal.fire({
        icon: 'error',
        title: 'İşlem başarısız',
        text: this.props.statusText
      });
      this.props.cleanFlagsGroupSettings();
    }
  }

  inputChangeHandle(event) {

    const target = event.target;
    if (target.name === 'weekday')
      this.setState({ isWeekdayControl: this.refs.weekday.checked, isWeekdayControlChange: true });
    if (target.name === 'weekend')
      this.setState({ isWeekendControl: this.refs.weekend.checked, isWeekendControlChange: true });
    if (target.name === 'sequentialOrderLimitCount')
      this.setState({ sequentialOrderLimitCount: event.target.value, sequentialOrderLimitCountChange: true });
    if (target.name === 'locationDayLimit')
      this.setState({ locationDayLimit: this.refs.locationDayLimit.checked, locationDayLimitChange: true });
  }

  updateGroupSettings() {
    let groupSettings = {};
    if (this.state.isWeekdayControlChange) {
      groupSettings.isWeekdayControl = this.state.isWeekdayControl;
    }
    if (this.state.isWeekendControlChange) {
      groupSettings.isWeekendControl = this.state.isWeekendControl;
    }
    if (this.state.sequentialOrderLimitCountChange) {
      groupSettings.sequentialOrderLimitCount = parseInt(this.state.sequentialOrderLimitCount);
    }
    if (this.state.locationDayLimitChange) {
      groupSettings.locationDayLimit = this.state.locationDayLimit;
    }

    this.props.updateGroupSettings(this.props.groupSettingsId, groupSettings);

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
                    <h3 className="mb-0">Takvim Ayarları</h3>
                  </Col>
                  <Col className="text-right" xs="1">

                  </Col>
                  <Col className="text-right" xs="1">
                    <Button
                      type="button"
                      color="primary"
                      size="sm"
                      onClick={() => this.updateGroupSettings()}
                    >
                      GÜNCELLE
                      </Button>
                  </Col>
                </Row>
              </CardHeader>
              <CardBody>

                <div className="pl-lg-4">
                  <Row>
                    <Col lg="6">
                      <Form inline>
                        <FormGroup className="mb-2 mr-sm-2 mb-sm-0">
                          <Label
                            className="form-control-label mr-sm-2"
                            htmlFor="checkbox-weekday"
                          >
                            Haftaiçi Kontrolü
                            </Label>
                          <div id="checkbox-weekday" className="pretty p-default p-curve" style={{ marginLeft: "5px", marginBottom: "auto", marginTop: "4px", marginRight: "auto" }} >
                            <input
                              type="checkbox"
                              name="weekday"
                              ref="weekday"
                              onChange={event => this.inputChangeHandle(event)}
                              defaultChecked={this.props.isWeekdayControl}
                            />
                            <div className="state p-success-o">
                              <label></label>
                            </div>
                          </div>
                        </FormGroup>
                      </Form>
                    </Col>
                    <Col lg="6">
                      <Form inline>
                        <FormGroup className="mb-2 mr-sm-2 mb-sm-0">

                          <Label
                            className="form-control-label mr-sm-2"
                            htmlFor="checkbox-weekend"
                          >
                            Haftasonu Kontrolü
                            </Label>
                          <div className="pretty p-default p-curve" style={{ marginLeft: "5px", marginBottom: "auto", marginTop: "4px", marginRight: "auto" }} >
                            <input
                              type="checkbox"
                              name="weekend"
                              ref="weekend"
                              onChange={event => this.inputChangeHandle(event)}
                              defaultChecked={this.props.isWeekendControl}
                            />
                            <div className="state p-success-o">
                              <label></label>
                            </div>
                          </div>

                        </FormGroup>
                      </Form>
                    </Col>
                  </Row>

                  <Row style={{ marginTop: "25px" }}>
                    <Col lg="6">
                      <Form inline>
                        <FormGroup className="mb-2 mr-sm-2 mb-sm-0">

                          <Label
                            className="form-control-label mr-sm-2"
                            htmlFor="sequentialOrderLimitCount"
                          >
                            Sıralı Nöbet Sayısı
                            </Label>
                          <Input id="sequentialOrderLimitCount" bsSize="sm" name="sequentialOrderLimitCount" type="number" min="0" defaultValue={this.props.sequentialOrderLimitCount} onChange={(event) => this.inputChangeHandle(event)} />

                        </FormGroup>
                      </Form>
                    </Col>
                    <Col lg="6">
                      <Form inline>
                        <FormGroup className="mb-2 mr-sm-2 mb-sm-0">
                          <Label
                            className="form-control-label mr-sm-2"
                            htmlFor="checkbox-locationDayLimit"
                          >
                            Maksimum Lokasyon - Gün Sınırı
                            </Label>

                          <div id="checkbox-locationDayLimit" className="pretty p-default p-curve" style={{ marginLeft: "5px", marginBottom: "auto", marginTop: "4px", marginRight: "auto" }} >
                            <input
                              type="checkbox"
                              name="locationDayLimit"
                              ref="locationDayLimit"
                              onChange={event => this.inputChangeHandle(event)}
                              defaultChecked={this.props.locationDayLimit}
                            />
                            <div className="state p-success-o">
                              <label></label>
                            </div>
                          </div>
                        </FormGroup>
                      </Form>
                    </Col>
                  </Row>

                </div>
                <hr className="my-4" />

              </CardBody>
            </Card>
          </Col>
        </Row>
      </Container>

    </>
    );
  };
};

const mapStateToProps = state => {
  return {
    groupSettingsId: state.groupSettings.groupSettingsId,
    isWeekdayControl: state.groupSettings.isWeekdayControl,
    isWeekendControl: state.groupSettings.isWeekendControl,
    sequentialOrderLimitCount: state.groupSettings.sequentialOrderLimitCount,
    locationDayLimit: state.groupSettings.locationDayLimit,
    error: state.groupSettings.error,
    statusText: state.groupSettings.statusText
  };
}


const mapDispatchToProps = dispatch => {
  return {
    getGroupSettings: () => dispatch(actions.getGroupSettings()),
    updateGroupSettings: (id, data) => dispatch(actions.updateGroupSettings(id, data)),
    cleanFlagsGroupSettings: () => dispatch(actions.cleanFlagsGroupSettings()),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(GroupSettings);