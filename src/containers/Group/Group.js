import React from "react";
import { connect } from 'react-redux';
import * as actions from '../../store/actions/index';
import { helperService } from "../../services";

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
import "./Group.css"

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
      locationDayLimit: "",
      locationDayLimitChange: false,
      locationDayLimitCount: "",
      locationDayLimitCountChange: false
    }
    this.inputChangeHandle = this.inputChangeHandle.bind(this);

  }

  componentDidMount() {
    if (!this.props.isWeekdayControl || !this.props.isWeekendControl || !this.props.sequentialOrderLimitCount || !this.props.locationDayLimit) {
      this.props.getGroupSettings();
      const filterData = {
        filter: {
          where: {
            groupId: {
              like: helperService.getGroupId()
            }
          }
        }
      }
      this.props.onInitLocations(filterData);
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
    if (target.name === 'locationDayLimit') {
      if (this.refs.locationDayLimit.checked === false) {
        this.setState({ locationDayLimit: this.refs.locationDayLimit.checked, locationDayLimitChange: true, locationDayLimitCount: '', locationDayLimitCountChange: false })
      }
      else {
        this.setState({ locationDayLimit: this.refs.locationDayLimit.checked, locationDayLimitChange: true });
      }

    }
    if (target.name === 'locationDayLimitCount')
      this.setState({ locationDayLimitCount: event.target.value, locationDayLimitCountChange: true });
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
    if (this.state.locationDayLimitCountChange && (this.state.locationDayLimit === '' ? this.props.locationDayLimit : this.state.locationDayLimit)) {
      groupSettings.locationDayLimitCount = parseInt(this.state.locationDayLimitCount);
    }

    this.props.updateGroupSettings(this.props.groupSettingsId, groupSettings);
  }


  render() {

    return (<>
      <UserHeader />
      <Container style={{ marginTop: "-12rem" }} fluid className="groupSettings">
        <Row>

          <Col className="order-xl-1" xl="12">
            <Card className="bg-secondary shadow">
              <CardHeader className="bg-white border-0">
                <Row className="align-items-center">
                  <Col xl="9" lg="8" md="8" xs="5" >
                    <h3 className="mb-0">Takvim Ayarları</h3>
                  </Col>
                  <Col className="text-right" xl="3" lg="4" md="4" xs="7">
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
                <Form>
                  <div className="pl-lg-4">
                    <Row>
                      <Col lg="6" className="formRow">
                        <Form inline>
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
                                onClick={event => this.inputChangeHandle(event)}
                                defaultChecked={this.props.isWeekdayControl}
                              />
                              <div className="state p-success-o">
                                <label></label>
                              </div>
                            </div>
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
                                onClick={event => this.inputChangeHandle(event)}
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
                      <Col lg="6" className="formRow">
                        <Form inline>
                          <FormGroup className="mb-2 mr-sm-2 mb-sm-0 ">

                            <Label
                              className="form-control-label mr-sm-2"
                              htmlFor="sequentialOrderLimitCount"
                            >
                              Maksimum Ardışık Nöbet Sınırı
                            </Label>
                            <Input id="sequentialOrderLimitCount" className="sequentialOrderLimitCount" bsSize="sm" name="sequentialOrderLimitCount" type="number" min="0" defaultValue={this.props.sequentialOrderLimitCount} onChange={(event) => this.inputChangeHandle(event)} />

                          </FormGroup>
                        </Form>
                      </Col>
                      <Col lg="6">
                        <Form inline>
                            <Label
                              className="form-control-label"
                              htmlFor="checkbox-locationDayLimit"
                            >
                              Maksimum Lokasyon - Gün Sınırı
                            </Label>

                            <div id="checkbox-locationDayLimit" className="pretty p-default p-curve" style={{ marginLeft: "5px", marginBottom: "auto", marginTop: "auto", marginRight: "5px" }} >
                              <input
                                type="checkbox"
                                name="locationDayLimit"
                                ref="locationDayLimit"
                                onClick={event => this.inputChangeHandle(event)}
                                defaultChecked={this.props.locationDayLimit}
                              />
                              <div className="state p-success-o">
                                <label></label>
                              </div>
                            </div>
                            <input
                              id="locationDayLimitCount"
                              name="locationDayLimitCount"
                              className="specialInput"
                              type="number"
                              min="0"
                              defaultValue={this.props.locationDayLimitCount}
                              disabled={this.state.locationDayLimit === '' ? !this.props.locationDayLimit : !this.state.locationDayLimit}
                              onChange={(event) => this.inputChangeHandle(event)}
                            />
                        </Form>
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

const mapStateToProps = state => {
  return {
    groupSettingsId: state.groupSettings.groupSettingsId,
    isWeekdayControl: state.groupSettings.isWeekdayControl,
    isWeekendControl: state.groupSettings.isWeekendControl,
    locations: state.locations.locations,
    sequentialOrderLimitCount: state.groupSettings.sequentialOrderLimitCount,
    locationDayLimit: state.groupSettings.locationDayLimit,
    locationDayLimitCount: state.groupSettings.locationDayLimitCount,
    error: state.groupSettings.error,
    statusText: state.groupSettings.statusText
  };
}


const mapDispatchToProps = dispatch => {
  return {
    getGroupSettings: () => dispatch(actions.getGroupSettings()),
    onInitLocations: (filterData) => dispatch(actions.initLocations(filterData)),
    updateGroupSettings: (id, data) => dispatch(actions.updateGroupSettings(id, data)),
    updateBulkLocations: (listOfLocations) => dispatch(actions.updateBulkLocations(listOfLocations)),
    cleanFlagsGroupSettings: () => dispatch(actions.cleanFlagsGroupSettings()),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(GroupSettings);