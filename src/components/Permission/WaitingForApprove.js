import React, { Component } from "react";
import { Button, Card,UncontrolledDropdown,DropdownMenu,DropdownItem,DropdownToggle, Table, CardHeader, Input, Alert, Row, Col, Modal, Form, Label, FormGroup, InputGroup } from "reactstrap";
import { connect } from 'react-redux';
import * as actions from '../../store/actions/index';
import { CalendarTypes, CalendarStatus, constants } from '../../variables/constants';
import ToastServive from 'react-material-toast';
import Select from 'react-select';
import moment from 'moment/moment';
import { permissionHelper } from "./PermissionHelper";
import 'font-awesome/css/font-awesome.min.css';
import { helperService } from "../../services/helper";

import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import tr from "date-fns/locale/tr";
import { registerLocale } from "react-datepicker";
import './Permission.css';
registerLocale("tr", tr);
import withReactContent from 'sweetalert2-react-content';
import Swal from 'sweetalert2'
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
            copyOfListOfPermission: [],
            userId: ''

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

    loadUsers() {
        this.props.getUsers(permissionHelper.getInitialUserFilter());
    }

    componentDidMount() {
        this.loadPermissions();
        this.loadUsers();

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
        this.loadPermissions();
    }





    createPermission() {

        const { startDate, endDate, userId, description } = this.state;
        if (!startDate || !endDate || !userId || !description) {
             toast.error('Tüm alanlar girilmiş olmalı');
            return;
        } else {
            const start = moment(this.state.startDate).format("YYYY-MM-DD[T]12:00:00.000[Z]");
            const end = moment(this.state.endDate).format("YYYY-MM-DD[T]12:00:00.000[Z]");
            const groupId = helperService.getGroupId();
            const type = Number(this.state.permissionType);
            const description = this.state.description;
            const userId = this.state.userId;
            const status = CalendarStatus.WaitingForApprove;
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

    }

    getPermissionsBySearch() {
        console.log(this.state.searchParam);
        if (this.state.searchParam) {
            this.props.getPermissions(permissionHelper.getWaitingForApproveFilter(this.state.searchParam));
        } else {
            this.refreshPermissions();
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
        if (e.keyCode === 13) {
            console.log('value', e.target.value);
            if (e.target.value) {
                this.props.getPermissions(permissionHelper.getWaitingForApproveFilter(e.target.value));
            } else {
                this.refreshPermissions();

            }
        }
    }

    noMessageHandle = () => {
        return "Eşleşme Yok"
    }



    addUserId(user) {
        console.log(user);
        if (user) {
            this.setState({ userId: user.value })
        }
        // if (user) {
        //     let userGroups = [];
        //     user.forEach(element => {
        //         userGroups.push({ userId: element.value, groupId: helperService.getGroupId() });
        //     });
        //     this.setState({ userGroups: userGroups })
        // }

    }

    render() {


        console.log('OP1', this.props.users);

        let options = [];
        if (this.props.users) {
            this.props.users.forEach(u => {
                options.push({ label: u.user.fullName + '-' + u.user.email, value: u.userId })
            });

        }

        if (this.props.permissions) {
            this.state.listOfPermission = this.props.permissions.filter((p) => {
                return p.id && p.user && p.startDate && p.endDate;
            })

            this.state.listOfPermission = this.state.listOfPermission.map((p) => (
                <tr key={p.id}>
                    <td>{p.user.fullName}</td>
                    <td>{p.user.email}</td>
                    <td>{moment(p.startDate).format('DD/MM/YYYY')}</td>
                    <td>{moment(p.endDate).format('DD/MM/YYYY')}</td>
                    <td>{p.description ? p.description : "Açıklama girilmedi."}</td>

                    <td className="text-right">
                        <UncontrolledDropdown>
                            <DropdownToggle className="btn-icon-only text-light" onClick={e => e.preventDefault()}>
                            <i className="fas fa-ellipsis-v" />
                        </DropdownToggle>
                            <DropdownMenu className="dropdown-menu-arrow" right>
                                <DropdownItem style={{ marginLeft: "0px" }}  onClick={() => this.rejectPermission(p)}>İptal</DropdownItem>
                                <DropdownItem style={{ marginLeft: "0px" }}  onClick={() => this.approvePermisson(p)}>Aktar</DropdownItem>
                            </DropdownMenu>
                        </UncontrolledDropdown>
                    </td>


                    {/* <td className="text-right">
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

                    </td> */}
                </tr>
            ));
            this.state.copyOfListOfPermission = this.state.listOfPermission;


        }




        return (
            <>
                <Modal
                    className="modal-dialog-centered"
                    isOpen={this.state.isOpenCreateModal}
                // toggle={() => this.toggleModal()}
                >
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
                                    <Label for="exampleEmail" sm={5}>Başlangıç Tarihi:</Label>
                                    <Col sm={7}>
                                        <DatePicker
                                            showPopperArrow={false}
                                            name="startDate"
                                            dateFormat="dd/MM/yyyy"
                                            minDate={new Date()}
                                            // maxDate={this.state.endDate}
                                            selected={this.state.startDate}

                                            locale="tr"
                                            onChange={date => {
                                                this.setStartDate(date);
                                                this.setState({ endDate: date })
                                            }}
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
                                            onChange={date => {
                                                this.setEndDate(date)

                                            }}

                                        />
                                    </Col>



                                </InputGroup>
                                <InputGroup className="input-group-alternative mb-3">
                                    <Label for="exampleEmail" sm={5}>İzin Tipi:</Label>
                                    <Col sm={7}>
                                        <Input type="select" name="permissionType" style={{ color: 'black', fontSize: '16px' }} value={this.state.permissionType} onChange={this.inputChangeHandle} >
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
                                        <Input type="text" style={{ color: 'black', fontSize: '16px' }} name="description" value={this.state.description} onChange={this.inputChangeHandle} >
                                        </Input>
                                    </Col>
                                </InputGroup>



                                <InputGroup className="input-group-alternative mb-3">
                                    <Label for="exampleEmail" sm={5}>Kişi Seçimi:</Label>
                                    <Col sm={7}>
                                        <Select
                                            classNamePrefix="select"


                                            noOptionsMessage={() => this.noMessageHandle()} isSearchable={true} options={options} className="selectPermission" onChange={(user) => this.addUserId(user)} placeholder="Ara ve Seç..." />

                                    </Col>
                                </InputGroup>




                            </FormGroup>
                        </Form>
                    </div>
                    <div className="modal-footer">
                        <button
                            className="bttn bttn-secondary"
                            onClick={() => this.closeCreateModal()}>Kapat
                        </button>
                        <button className="bttn bttn-primary" onClick={this.createPermission} >Kaydet</button>
                    </div>
                </Modal>

                <Card className="shadow">



                    <CardHeader style={{ paddingLeft: '0.5rem' }} className="bg-white border-0">
                        <Row className="align-items-center">
                            <Col xs="3">
                                <Input name="searchPermission" onKeyDown={this.keyPress} value={this.state.searchParam} placeholder="Bir şeyler yazın ..." onChange={(event) => this.inputChangeHandle(event)}></Input>

                            </Col>

                            <Col xs="2">

                                <Button
                                    color="secondary"

                                    onClick={e => this.getPermissionsBySearch()}
                                    size="lg"


                                >
                                    <i className="fas fa-search fa-lg"></i>
                                </Button>


                                <Button
                                    color="secondary"

                                    onClick={e => this.refreshPermissions()}
                                    size="lg"

                                >
                                    <i className="fas fa-sync-alt fa-lg"></i>
                                </Button>

                            </Col>




                            <Col className="text-right" xs="7">
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




                    <Table className="align-items-center table-flush" >

                        <thead className="thead-light">
                            <tr>
                                <th scope="col">İsim Soyisim</th>
                                <th scope="col">E-Mail</th>
                                <th scope="col">Başlangıç Tarihi</th>
                                <th scope="col">Bitiş Tarihi</th>
                                <th scope="col">Açıklama</th>
                                <th scope="col" className="text-right">İşlemler</th>
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
        users: state.users.users,
        permissions: state.permission.responseOnGetPermission,
        errorMessageAtGet: state.permission.statusTexAtGet,
        calendarsCount: state.reminders.calendarsCount,
        statusTextAtCreatePermission: state.permission.statusTextAtCreatePermission,
        createPermissionReqLoading: state.permission.createPermissionReqLoading,
        responseOnCreatePermission: state.permission.responseOnCreatePermission,
        globalUsers: state.users.globalUsers,
    }
}

const mapDispatchToProps = dispatch => {
    return {
        getUsers: (filterData) => dispatch(actions.getUsers(filterData)),
        getCalendarsCount: (filterData) => dispatch(actions.getRemindersCount(filterData)),
        getPermissions: (filterData) => dispatch(actions.permission.getPermissions(filterData)),
        createPermissions: (data) => dispatch(actions.permission.createPermission(data)),
        updatePermission: (id, data, filterOfWaitingFor, filterOfApproved) => dispatch(actions.permission.updatePermission(id, data, filterOfWaitingFor, filterOfApproved)),
    };
};




export default connect(mapStateToProps, mapDispatchToProps)(WaitingForApproved);

