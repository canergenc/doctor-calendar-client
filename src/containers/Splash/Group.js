import React from "react";
import { connect } from 'react-redux';
import { helperService } from '../../services/helper'
import * as actions from '../../store/actions/index';
// reactstrap components
import {
    Button,
    Card,
    Badge,
    CardBody,
    FormGroup,
    Form,
    Input,
    InputGroupAddon,
    InputGroupText,
    InputGroup,
    Col,
    Row,
    Label
} from "reactstrap";
import withReactContent from 'sweetalert2-react-content';
import Swal from 'sweetalert2';
import 'pretty-checkbox';
import './Group.css';

const MySwal = withReactContent(Swal);

class GroupSplash extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            groupName: helperService.generateRndStr(10),
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

        };
        this.inputChangeHandle = this.inputChangeHandle.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    inputChangeHandle(event) {
        const target = event.target;
        if (target.name === 'groupName') {
            this.setState({ groupName: event.target.value });
        }
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



    handleSubmit(event) {
        const { groupName } = this.state;
        
        let groupSettings = {type:1};
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

        if (groupName) {
            this.props.createGroup(groupName, groupSettings);
        } else {
            this.props.createGroup(null, groupSettings);
        }
        event.preventDefault();
    }

    handleCanceled = () => {
        this.props.createGroup(null);
    }

    showSwal() {
        MySwal.fire({
            icon: 'error',
            title: 'Hay aksi,',
            text: this.props.statusTextAtCreateUserGroup,

            confirmButtonText: 'Tamam',
            showLoaderOnConfirm: true,
            allowOutsideClick: () => !Swal.isLoading()
        }).then((result) => {
            console.log(result);
            this.setState({ submitted: false });

        })
    }


    render() {

        return (
            <>
                <Col lg="6" md="8">
                    <Card className="bg-secondary shadow border-0">

                        <CardBody >
                            <div className="text-center text-muted mb-4">
                                <h2> <Badge color="light" style={{ textTransform: 'none' }} >Grup adını düzenleyebilirsiniz,Örn: Pediatri Grubu</Badge></h2>
                            </div>


                            <Form role="form" onSubmit={this.handleSubmit}>
                                <FormGroup>
                                    <InputGroup className="input-group-alternative mb-3">
                                        <InputGroupAddon addonType="prepend">
                                            <InputGroupText>
                                                <i className="chart-pie-35" />
                                            </InputGroupText>
                                        </InputGroupAddon>
                                        <Input placeholder="Grup Adı" name="groupName" type="text" value={this.state.groupName} onChange={this.inputChangeHandle} />
                                    </InputGroup>

                                </FormGroup>
                                <div className="pl-lg-1">
                                    <Row>
                                        <Col lg="6" className="formRow">
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
                                        </Col>
                                        <Col lg="6">
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
                                        </Col>

                                    </Row>

                                    <Row style={{ marginTop: "25px" }}>
                                        <Col lg="6" className="formRow">
                                            <FormGroup className="mb-2 mr-sm-2 mb-sm-0 ">

                                                <Label
                                                    className="form-control-label mr-sm-2"
                                                    htmlFor="sequentialOrderLimitCount"
                                                >
                                                    Maksimum Ardışık Nöbet Sınırı
                                                    </Label>
                                                <Input id="sequentialOrderLimitCount" className="sequentialOrderLimitCount" bsSize="sm" name="sequentialOrderLimitCount" type="number" min="0" defaultValue={this.props.sequentialOrderLimitCount} onChange={(event) => this.inputChangeHandle(event)} />

                                            </FormGroup>
                                        </Col>
                                        <Col lg="6">
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
                                        </Col>
                                    </Row>

                                </div>
                                <div className="modal-footer">


                                    <Button disabled={this.props.isRegistiring} onClick={this.handleSubmit} type='button' color="primary" >

                                        {this.props.createUserGroupReqLoading && (
                                            <i
                                                className="fa fa-refresh fa-spin"
                                                style={{ marginRight: "5px" }}
                                            />
                                        )}

                                        {this.props.createUserGroupReqLoading && <span>Lütfen bekleyin...</span>}
                                        {!this.props.createUserGroupReqLoading && <span>DEVAM ET</span>}
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
        responseOnCreateUserGroup: state.userGroups.responseOnCreateUserGroup,
        statusTextAtCreateUserGroup: state.userGroups.statusTextAtCreateUserGroup,
        createUserGroupReqLoading: state.userGroups.createUserGroupReqLoading,
        token: state.auth.token,
        groupId: state.userGroups.groupId
    };
}
const mapDispatchToProps = dispatch => {
    return {
        createGroup: (groupName, groupSettings) => dispatch(actions.userGroupActions.createUserGroup(groupName, groupSettings)),
    };
}
export default connect(mapStateToProps, mapDispatchToProps)(GroupSplash);


