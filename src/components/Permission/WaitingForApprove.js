import React, { Component, useState } from "react";
import { Button, Card, Table, CardHeader, Input, Alert, Row, Col, Modal, Form, Label, FormGroup, InputGroup } from "reactstrap";
import { connect } from 'react-redux';
import * as actions from '../../store/actions/index';
import { CalendarTypes, CalendarStatus, constants } from '../../variables/constants';
import ToastServive from 'react-material-toast';

import moment from 'moment';
import { extendMoment } from 'moment-range';
import { permissionHelper } from "./PermissionHelper";
import 'font-awesome/css/font-awesome.min.css';
import withReactContent from 'sweetalert2-react-content'
import { helperService } from "../../services/helper";
import Swal from 'sweetalert2'
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import tr from "date-fns/locale/tr";
import { registerLocale, setDefaultLocale } from "react-datepicker";
registerLocale("tr", tr);
const MySwal = withReactContent(Swal)

const toast = ToastServive.new({
    place: 'topRight',
    closable: false,
    duration: 3,
    maxCount: 10,


})
class WaitingForApproved extends Component {

    constructor(props) {
        super(props);
        this.state = {
            isOpenCreateModal: false,
            startDate: new Date(),
            permissionType: CalendarTypes.OzelDurum,
            endDate: new Date(),
            description: '',
            currentIndex: 0,
            submitted: false,
            listOfPermission: [],
            copyOfListOfPermission: []

        }
        this.inputChangeHandle = this.inputChangeHandle.bind(this);
        this.createPermission = this.createPermission.bind(this);
        this.getPermissionsBySearch = this.getPermissionsBySearch.bind(this);
        this.refreshPermissions = this.refreshPermissions.bind(this);
        this.keyPress = this.keyPress.bind(this);
        // this.searchPermission = this.searchPermission.bind(this);

    }

    loadPermissions() {
        this.props.getPermissions(permissionHelper.getWaitingForApproveFilter(this.state.currentIndex));
        this.props.getCalendarsCount(permissionHelper.getWaitingForApproveCountFilter())
    }

    componentDidMount() {
        this.loadPermissions();
    }


    approvePermisson(item) {
        console.log('item', item);

        const data = {
            status: CalendarStatus.Approve
        }

        const filterOfWaitingFor = permissionHelper.getWaitingForApproveFilter(this.state.currentIndex)
        const filterOfApproved = permissionHelper.getApprovedFilter(0);

        this.props.updatePermission(item.id, data, filterOfWaitingFor, filterOfApproved)
        //this.props.patchPermisson(filter, data, this.waitingForApproveFilter, this.approvedFilter);
    }

    rejectPermission(item) {
        const filterOfWaitingFor = permissionHelper.getWaitingForApproveFilter(this.state.currentIndex)
        const filterOfApproved = permissionHelper.getApprovedFilter(0);
        MySwal.fire({
            title: 'Lütfen ret nedenini giriniz',
            input: 'text',
            inputAttributes: {
                autocapitalize: 'off'
            },

            confirmButtonText: 'Kaydet',
            cancelButtonText: 'iptal',
            showCancelButton: true,
            showLoaderOnConfirm: true,
            allowOutsideClick: () => !Swal.isLoading()
        }).then((result) => {
            if (result.value) {
                const data = {
                    status: CalendarStatus.Reject,
                    description: result.value
                }
                this.props.updatePermission(item.id, data, filterOfWaitingFor, filterOfApproved)
            }
        })
    }

    openCreateModal() {
        this.setState({
            isOpenCreateModal: true
        });
        this.setState({
            submitted: false
        });
    }

    closeCreateModal() {

        this.setState({
            isOpenCreateModal: false
        });
        //TODO: Will create redux updated for list.
        this.loadPermissions();




    }

    createPermission() {

        const getApprovedFilter = permissionHelper.getWaitingForApproveFilter(this.state.currentIndex);
        const start = moment(this.state.startDate).format("YYYY-MM-DD[T]12:00:00.000[Z]");
        const end = moment(this.state.endDate).format("YYYY-MM-DD[T]12:00:00.000[Z]");
        const userId = helperService.getUserId();
        const groupId = helperService.getGroupId();
        const type = Number(this.state.permissionType);
        const description = this.state.description;
        const status = CalendarStatus.WaitingForApprove;
        const momentRange = extendMoment(moment);
        const range = momentRange.range(start, end);
        console.log('TEST', range);
        const data = {
            startDate: start,
            endDate: end,
            userId: userId,
            groupId: groupId,
            status: status,
            type: type,
            description: description,
            isWeekend: false,
        }
        this.props.createPermissions(data);
        this.setState({ submitted: true })
    }

    getPermissionsBySearch() {
        console.log(this.state.searchParam);
        if (this.state.searchParam) {
            this.props.getPermissions(permissionHelper.getWaitingForApproveFilter(this.state.searchParam));
        } else {
            const id = toast.warning('Lütfen aramak için bir şeyler yaznız');
        }
    }

    refreshPermissions() {
        this.setState({ searchParam: "" });
        this.props.getPermissions(permissionHelper.getWaitingForApproveFilter());
    }





    inputChangeHandle(event) {
        this.setState({ submitted: false })
        const target = event.target;
        console.log('target-value', target.value);
        if (target.name === 'permissionType') {
            this.setState({ permissionType: event.target.value });
        } else if (target.name === "description") {
            this.setState({ description: event.target.value });
        } else if (target.name === "searchPermission") {
            this.setState({ searchParam: event.target.value });
        }
    }

    setEndDate(date) {
        this.setState({ submitted: false })
        console.log(date);
        this.setState({ endDate: date })
    }

    setStartDate(date) {
        this.setState({ submitted: false })
        console.log(date);
        this.setState({ startDate: date })
    }

    keyPress(e) {
        console.log(e.keyCode);
        if (e.keyCode == 13) {
            console.log('value', e.target.value);
            if (e.target.value) {
                this.props.getPermissions(permissionHelper.getWaitingForApproveFilter(e.target.value));
            } else {
                const id = toast.warning('Lütfen aramak için bir şeyler yaznız');

            }
        }
    }

    render() {


        if (this.props.permissions) {
            this.state.listOfPermission = this.props.permissions;

            this.state.listOfPermission = this.state.listOfPermission.map((p) => (
                <tr key={p.id}>
                    <td>{p.user.fullName}</td>
                    <td>{p.user.email}</td>
                    <td>{moment(p.startDate).format('DD/MM/YYYY')}</td>
                    <td>{moment(p.endDate).format('DD/MM/YYYY')}</td>
                    <td>{p.description ? p.description : "Açıklama girilmedi."}</td>
                    <td className="text-right">
                        <Button
                            color="warning"
                            onClick={() => this.rejectPermission(p)}
                            size="sm"
                        >
                            İPTAL
                            </Button>
                        <Button
                            color="primary"
                            onClick={() => this.approvePermisson(p)}
                            size="sm"
                        >
                            AKTAR
                      </Button>

                    </td>
                </tr>
            ));
            this.state.copyOfListOfPermission = this.state.listOfPermission;


        }




        return (
            <>
                <Modal
                    className="modal-dialog-centered"
                    isOpen={this.state.isOpenCreateModal}
                    toggle={() => this.toggleModal()}>
                    <div className="modal-header">
                        <h3 className="modal-title" id="addModalLabel">Yeni İzin Girişi</h3>
                        <button
                            aria-label="Close"
                            className="close"
                            data-dismiss="modal"
                            type="button"
                            onClick={() => this.closeCreateModal()}>
                            <span aria-hidden={true}>×</span>
                        </button>
                    </div>
                    <div className="modal-body">
                        <Form role="form" autoComplete="off">

                            {this.state.submitted && this.props.statusTextAtCreatePermission ?

                                <Alert color="warning">
                                    {this.props.statusTextAtCreatePermission}
                                </Alert>
                                : ''}

                            {this.state.submitted && !this.props.statusTextAtCreatePermission && this.props.responseOnCreatePermission ?

                                <Alert color="success">

                                    {constants.SUCCESS_MESSAGE.commonMessage}
                                </Alert>
                                : ''}


                            <FormGroup>
                                <InputGroup className="input-group-alternative mb-3">
                                    <Label for="exampleEmail" sm={5}>Başalngıç Tarihi:</Label>
                                    <Col sm={7}>
                                        <DatePicker
                                            showPopperArrow={false}
                                            name="startDate"
                                            dateFormat="dd/MM/yyyy"
                                            minDate={new Date()}
                                            selected={this.state.startDate}

                                            locale="tr"
                                            onChange={date => this.setStartDate(date)}
                                        />
                                    </Col>



                                </InputGroup>
                                <InputGroup className="input-group-alternative mb-3">
                                    <Label for="exampleEmail" sm={5}>Bitiş Tarihi:</Label>
                                    <Col sm={7}>
                                        <DatePicker
                                            showPopperArrow={false}
                                            dateFormat="dd/MM/yyyy"
                                            name="endDate"
                                            minDate={this.state.startDate}
                                            selected={this.state.endDate}
                                            locale="tr"
                                            onChange={date => this.setEndDate(date)}
                                        />
                                    </Col>



                                </InputGroup>
                                <InputGroup className="input-group-alternative mb-3">
                                    <Label for="exampleEmail" sm={5}>İzin Tipi:</Label>
                                    <Col sm={7}>
                                        <Input type="select" name="permissionType" value={this.state.permissionType} onChange={this.inputChangeHandle} >
                                            <option value={CalendarTypes.Izin}>İzin</option>
                                            <option value={CalendarTypes.Rapor}>Rapor</option>
                                            <option value={CalendarTypes.Gebelik}>Gebelik</option>
                                            <option value={CalendarTypes.ResmiTatil}> Resmi Tatil</option>
                                            <option value={CalendarTypes.IdariIzin}>İdari İzin</option>
                                            <option value={CalendarTypes.OzelDurum}>Özel Durum</option>
                                            <option value={CalendarTypes.Rotasyon}>Rotasyon</option>







                                        </Input>
                                    </Col>
                                </InputGroup>
                                <InputGroup className="input-group-alternative mb-3">
                                    <Label for="exampleEmail" sm={5}>Açıklama:</Label>
                                    <Col sm={7}>
                                        <Input type="textarea" name="description" value={this.state.description} onChange={this.inputChangeHandle} >
                                        </Input>
                                    </Col>
                                </InputGroup>
                            </FormGroup>
                        </Form>
                    </div>
                    <div className="modal-footer">
                        <Button
                            color="secondary"
                            data-dismiss="modal"
                            type="button"
                            onClick={() => this.closeCreateModal()}>Kapat
                        </Button>
                        <Button color="primary" type="button" onClick={this.createPermission} >Kaydet</Button>
                    </div>
                </Modal>

                <Card className="shadow">
                    <CardHeader className="bg-white border-0">
                        <Row className="align-items-center">
                            <Col xs="8">
                                <Input name="searchPermission" onKeyDown={this.keyPress} value={this.state.searchParam} placeholder="Bir şeyler yazın ..." onChange={(event) => this.inputChangeHandle(event)}></Input>

                            </Col>

                            <Col xs="2">

                                <Button
                                    color="secondary"

                                    onClick={e => this.getPermissionsBySearch()}
                                    size="lg"


                                >
                                    <i class="fas fa-search fa-lg"></i>
                                </Button>


                                <Button
                                    color="secondary"

                                    onClick={e => this.refreshPermissions()}
                                    size="lg"

                                >
                                    <i class="fas fa-sync-alt fa-lg"></i>
                                </Button>

                            </Col>




                            <Col className="text-right" xs="2">
                                <Button
                                    color="primary"
                                    href="#pablo"
                                    onClick={e => this.openCreateModal()}
                                    size="sm"
                                >
                                    <span className="btn-inner--icon">
                                        <i className="ni ni-fat-add" />
                                    </span>
                                    Yeni
                      </Button>
                            </Col>
                        </Row>
                    </CardHeader>

                    <Table className="align-items-center table-flush" responsive>

                        <thead className="thead-light">
                            <tr>
                                <th scope="col">İsim Soyisim</th>
                                <th scope="col">E-Mail</th>
                                <th scope="col">Başlangıç Tarihi</th>
                                <th scope="col">Bitiş Tarihi</th>
                                <th scope="col">Açıklama</th>
                                <th scope="col" />
                            </tr>
                        </thead>
                        <tbody>
                            {this.state.listOfPermission}
                            {this.state.listOfPermission.length == 0 && <div style={{
                                margin: 20,
                                alignSelf: 'center',
                                justifyContent: 'center'
                            }} >
                                <p>
                                    Onay bekleyen kayıt bulunmamaktadır.
                        </p>
                            </div>}
                        </tbody>
                    </Table>
                </Card>
            </>

        )
    }
};

const mapStateToProps = state => {
    return {
        permissions: state.permission.responseOnGetPermission,
        errorMessageAtGet: state.permission.statusTexAtGet,
        calendarsCount: state.reminders.calendarsCount,
        statusTextAtCreatePermission: state.permission.statusTextAtCreatePermission,
        createPermissionReqLoading: state.permission.createPermissionReqLoading,
        responseOnCreatePermission: state.permission.responseOnCreatePermission,
    }
}

const mapDispatchToProps = dispatch => {
    return {
        getCalendarsCount: (filterData) => dispatch(actions.getRemindersCount(filterData)),
        getPermissions: (filterData) => dispatch(actions.permission.getPermissions(filterData)),
        createPermissions: (data) => dispatch(actions.permission.createPermission(data)),
        updatePermission: (id, data, filterOfWaitingFor, filterOfApproved) => dispatch(actions.permission.updatePermission(id, data, filterOfWaitingFor, filterOfApproved)),
    };
};




export default connect(mapStateToProps, mapDispatchToProps)(WaitingForApproved);

