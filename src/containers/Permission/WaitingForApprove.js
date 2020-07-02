import React, { Component } from "react";
import {
    Button,
    Card,
    UncontrolledDropdown,
    DropdownMenu,
    DropdownItem,
    DropdownToggle,
    Table,
    CardHeader,
    CardFooter,
    Input,
    Alert,
    Row,
    Col,
    Modal,
    Form,
    Label,
    FormGroup,
    InputGroup
} from "reactstrap";
import { connect } from 'react-redux';
import * as actions from '../../store/actions/index';
import { CalendarTypes, CalendarStatus, constants } from '../../variables/constants';
import ToastServive from 'react-material-toast';
import Select from 'react-select';
import moment from 'moment/moment';
import { permissionHelper } from "./PermissionHelper";
import { helperService } from "../../services/helper";
import DatePicker, { registerLocale } from "react-datepicker";
import tr from "date-fns/locale/tr";
import withReactContent from 'sweetalert2-react-content';
import Swal from 'sweetalert2';
import "react-datepicker/dist/react-datepicker.css";
import 'font-awesome/css/font-awesome.min.css';
import './Permission.css';

const MySwal = withReactContent(Swal);
registerLocale("tr", tr);

const toast = ToastServive.new({
    place: 'topRight',
    closable: false,
    duration: 3,
    maxCount: 10
});

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
            userId: '',
            searchParam: ''
        }
        this.inputChangeHandle = this.inputChangeHandle.bind(this);
        this.createPermission = this.createPermission.bind(this);
        this.getPermissionsBySearch = this.getPermissionsBySearch.bind(this);
        this.refreshPermissions = this.refreshPermissions.bind(this);
        this.keyPress = this.keyPress.bind(this);
    }

    loadPermissions() {
        this.props.getPermissions(permissionHelper.getWaitingForApproveFilter(this.state.currentIndex));
    }

    loadUsers() {
        this.props.getUsers(permissionHelper.getInitialUserFilter());
    }

    componentDidMount() {

        this.loadPermissions();
        this.loadUsers();
    }

    approvePermisson(item) {
        const data = {
            status: CalendarStatus.Approve
        }
        const filterOfWaitingFor = permissionHelper.getWaitingForApproveFilter(this.state.currentIndex, this.state.searchParam);
        const filterOfApproved = permissionHelper.getApprovedFilter(0);
        this.props.updatePermission(item.id, data, filterOfWaitingFor, filterOfApproved);
        this.props.getPermissionsCount(permissionHelper.getWaitingForApproveFilter(0));
        this.setState({ searchParam: this.state.searchParam });
    }

    rejectPermission(item) {


        MySwal.fire({
            title: 'Lütfen iptal nedenini giriniz',
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
                const filterOfWaitingFor = permissionHelper.getWaitingForApproveFilter(this.state.currentIndex, this.state.searchParam)
                const filterOfApproved = permissionHelper.getApprovedFilter(0);
                const data = {
                    status: CalendarStatus.Reject,
                    description: result.value
                }
                this.props.updatePermission(item.id, data, filterOfWaitingFor, filterOfApproved);

                this.setState({ searchParam: this.state.searchParam });

            }
        })
    }

    openCreateModal() {
        this.setState({
            isOpenCreateModal: true,
            submitted: false,
            startDate: new Date(),
            endDate: new Date(),
            permissionType: CalendarTypes.OzelDurum,
            description: '',
            userId: ''
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
                isWeekend: false
            }
            this.props.createPermissions(data);
            this.setState({ submitted: false, searchParam: '', isOpenCreateModal: false });
        }
    }

    getPermissionsBySearch() {
        if (this.state.searchParam) {
            this.props.getPermissions(permissionHelper.getWaitingForApproveSearchFilter(this.state.searchParam));
        } else {
            this.refreshPermissions();
        }
    }

    refreshPermissions() {
        this.setState({ searchParam: "" });
        this.props.getPermissions(permissionHelper.getWaitingForApproveFilter(0));
    }

    inputChangeHandle(event) {
        this.setState({ submitted: false })
        const target = event.target;
        if (target.name === 'permissionType') {
            this.setState({ permissionType: event.target.value });
        } else if (target.name === "description") {
            this.setState({ description: event.target.value });
        } else if (target.name === "searchPermission") {
            this.setState({ searchParam: event.target.value });
        }
    }

    setEndDate(date) {
        this.setState({ endDate: date, submitted: false });
    }

    setStartDate(date) {
        this.setState({ startDate: date, submitted: false });
    }

    keyPress(e) {
        if (e.keyCode === 13) {
            if (e.target.value) {
                this.props.getPermissions(permissionHelper.getWaitingForApproveSearchFilter(e.target.value));
            } else {
                this.refreshPermissions();
            }
        }
    }

    noMessageHandle = () => {
        return "Eşleşme Yok"
    }

    addUserId(user) {
        if (user) {
            this.setState({ userId: user.value })
        }
    }

    componentDidUpdate() {

        if (this.props.error) {
            MySwal.fire({
                icon: 'error',
                title: 'İşlem Başarısız',
                text: this.props.statusTextAtCreatePermission || this.props.statusTextAtUpdatePermission
            });
            this.setState({ submitted: false });
            this.props.cleanFlags();
        }
        else if (this.props.crudSuccess) {

            MySwal.fire({
                icon: 'success',
                title: 'Başarılı',
                text: this.props.message,
                showConfirmButton: true

            });
            this.setState({ submitted: false });
            this.props.cleanFlags();
            this.loadPermissions();
        }
    }

    render() {
        let options = [];
        if (this.props.users) {
            this.props.users.forEach(u => {
                options.push({ label: u.user.fullName + '-' + u.user.email, value: u.userId })
            });
        }

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
                        <UncontrolledDropdown>
                            <DropdownToggle className="btn-icon-only text-light" onClick={e => e.preventDefault()}>
                                <i className="fas fa-ellipsis-v" />
                            </DropdownToggle>
                            <DropdownMenu className="dropdown-menu-arrow" right>
                                <DropdownItem style={{ marginLeft: "0px" }} onClick={() => this.rejectPermission(p)}>İptal</DropdownItem>
                                <DropdownItem style={{ marginLeft: "0px" }} onClick={() => this.approvePermisson(p)}>Aktar</DropdownItem>
                            </DropdownMenu>
                        </UncontrolledDropdown>
                    </td>
                </tr>
            ));
            //this.state.copyOfListOfPermission = this.state.listOfPermission;
        }

        return (
            <>
                <Modal
                    className="modal-dialog-centered"
                    isOpen={this.state.isOpenCreateModal}
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
                                        <Input type="textarea" style={{ color: 'black', fontSize: '16px' }} className="textAreaSpecial" name="description" value={this.state.description} onChange={this.inputChangeHandle} >
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
                            <Col xl="9" lg="9" md="8" sm="9" xs="7">
                                <Input name="searchPermission" className="searchPermission" style={{ display: "inline-block" }} onKeyDown={this.keyPress} value={this.state.searchParam} placeholder="Kullanıcı adı, soyadı veya email'e göre ara" onChange={(event) => this.inputChangeHandle(event)}></Input>
                                <Button
                                    color="secondary"
                                    className="btnPermission"
                                    onClick={e => this.getPermissionsBySearch()}
                                    size="lg"
                                    style={{ display: "inline-block" }}
                                >
                                    <i className="fas fa-search fa-lg"></i>
                                </Button>

                                <Button
                                    color="secondary"
                                    className="btnPermission"
                                    onClick={e => this.refreshPermissions()}
                                    size="lg"
                                    style={{ display: "inline-block" }}
                                >
                                    <i className="fas fa-sync-alt fa-lg"></i>
                                </Button>
                            </Col>

                            <Col className="text-right" xl="3" lg="3" md="4" sm="3" xs="5">
                                <Button
                                    color="primary"
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

                    <Table className="align-items-center table-flush specialTable"  >

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
                            {this.state.listOfPermission.length == 0 &&
                                <tr>
                                    <td>
                                        Kayıt bulunmamaktadır.
                                    </td>
                                </tr>
                            }
                        </tbody>
                    </Table>
                    <CardFooter className="py-4" style={{ position: "inherit" }}>
                        {this.state.listOfPermission.length > 0 &&
                            <nav style={{ float: "right" }}>
                                Toplam : {this.state.listOfPermission.length}
                            </nav>
                        }
                    </CardFooter>
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
        statusTextAtCreatePermission: state.permission.statusTextAtCreatePermission,
        statusTextAtUpdatePermission: state.permission.statusTextAtUpdatePermission,
        createPermissionReqLoading: state.permission.createPermissionReqLoading,
        responseOnCreatePermission: state.permission.responseOnCreatePermission,
        globalUsers: state.users.globalUsers,
        totalPermissionCount: state.permission.permissionCount,
        crudSuccess: state.permission.crudSuccess,
        message: state.permission.message,
        error: state.permission.errorPermission
    }
}

const mapDispatchToProps = dispatch => {
    return {
        getUsers: (filterData) => dispatch(actions.getUsers(filterData)),
        getPermissions: (filterData) => dispatch(actions.permission.getPermissions(filterData)),
        createPermissions: (data) => dispatch(actions.permission.createPermission(data)),
        getPermissionsCount: (filter) => dispatch(actions.permission.getPermissionsCount(filter)),
        updatePermission: (id, data, filterOfWaitingFor, filterOfApproved) => dispatch(actions.permission.updatePermission(id, data, filterOfWaitingFor, filterOfApproved)),
        cleanFlags: () => dispatch(actions.permission.cleanFlagsPermissions())
    };
};


export default connect(mapStateToProps, mapDispatchToProps)(WaitingForApproved);