import React, { Component } from "react";
import { connect } from 'react-redux';
import UserHeader from "../../components/Headers/UserHeader.jsx";
import { helperService } from "../../services";
import CustomPagination from "../../components/Paginations/CustomPagination";
import { constants } from '../../variables/constants';
import Person from './Person/Person';
import * as EmailValidator from 'email-validator';
import "./Persons.css"
import * as actions from '../../store/actions';

// reactstrap components
import {
    Modal,
    Button,
    Card,
    CardHeader,
    CardFooter,
    Table,
    Container,
    Row,
    Form,
    Input,
    InputGroup,
    InputGroupAddon,
    InputGroupText,
    FormGroup
} from "reactstrap";
import "./Persons.css";
import "react-datepicker/dist/react-datepicker.css";
import DatePicker from "react-datepicker";
import withReactContent from 'sweetalert2-react-content';
import Swal from 'sweetalert2';
import moment from "moment/moment";

const MySwal = withReactContent(Swal);

class Persons extends Component {
    constructor(props) {
        super(props)
        this.state = {
            editModal: false,
            addModal: false,
            deleteModal: false,
            submitted: false,
            userGroupId: '',
            id: '',
            name: '',
            email: '',
            workStartDate: '',
            weekendCountLimit: 0,
            weekdayCountLimit: 0,
            password: '',
            currentIndex: 0
        }
        this.updateHandle = this.updateHandle.bind(this);
        this.deleteHandle = this.deleteHandle.bind(this);
        this.addHandle = this.addHandle.bind(this);
    }

    addHandleValidation() {
        let formIsValid = true;
        const { name, email, password, workStartDate } = this.state;
        if (!name || !email || !password || !workStartDate) {
            formIsValid = false;
        }
        if (password && password.length < 8) {
            formIsValid = false;
        }
        if (!EmailValidator.validate(email)) {
            formIsValid = false;
        }
        return formIsValid
    }

    updateHandleValidation() {
        let formIsValid = true;
        const { name, email, workStartDate, userGroupId } = this.state;
        if (!name || !email || !workStartDate || !userGroupId) {
            formIsValid = false;
        }
        if (!EmailValidator.validate(email)) {
            formIsValid = false;
        }
        return formIsValid
    }

    inputChangeHandle(event) {

        const target = event.target;
        if (target.name === 'name')
            this.setState({ name: event.target.value, submitted: false });
        if (target.name === 'email')
            this.setState({ email: event.target.value, submitted: false });
        if (target.name === 'password')
            this.setState({ password: event.target.value, submitted: false });
        if (target.name === 'weekendCountLimit')
            this.setState({ weekendCountLimit: event.target.value, submitted: false });
        if (target.name === 'weekdayCountLimit')
            this.setState({ weekdayCountLimit: event.target.value, submitted: false });
    }

    inputChangeHandleDate(date) {
        this.setState({ workStartDate: date, submitted: false });
    }

    updateHandle(event) {
        this.setState({ submitted: true });
        const weekdayCountLimit = parseInt(this.state.weekdayCountLimit);
        const weekendCountLimit = parseInt(this.state.weekendCountLimit);
        if (this.updateHandleValidation()) {
            let userData = {
                fullName: this.state.name,
                email: this.state.email,
                workStartDate: moment(this.state.workStartDate).format("YYYY-MM-DD[T]hh:mm:ss.sss[Z]"),

            };
            const countLimits = {
                ...(weekdayCountLimit ? { weekdayCountLimit: weekdayCountLimit } : null),
                ...(weekendCountLimit ? { weekendCountLimit: weekendCountLimit } : null)
            };
            const filterData = {
                filter: {
                    skip: this.state.currentIndex * constants.PAGESIZE_INPERMISSION_PAGE,
                    limit: constants.PAGESIZE_INPERMISSION_PAGE,
                    where: {
                        groupId: {
                            like: helperService.getGroupId()
                        }
                    },
                    include: [
                        { relation: "user" }
                    ]
                }
            }
            this.props.updateUser(this.state.id, userData, this.state.userGroupId, countLimits, filterData);
            this.toggleModal('editModal', null);
            event.preventDefault();
        }

    }

    addHandle(event) {
        this.setState({ submitted: true });
        if (this.addHandleValidation()) {
            const weekdayCountLimit = parseInt(this.state.weekdayCountLimit);
            const weekendCountLimit = parseInt(this.state.weekendCountLimit);
            const user = {
                fullName: this.state.name,
                email: this.state.email,
                password: this.state.password,
                workStartDate: moment(this.state.workStartDate).format("YYYY-MM-DD[T]hh:mm:ss.sss[Z]"),
                deviceId: "1",
                platform: 1
            };
            const countLimits = {
                ...(weekdayCountLimit ? { weekdayCountLimit: weekdayCountLimit } : null),
                ...(weekendCountLimit ? { weekendCountLimit: weekendCountLimit } : null)
            }
            const filterData = {
                filter: {
                    skip: this.state.currentIndex * constants.PAGESIZE_INPERMISSION_PAGE,
                    limit: constants.PAGESIZE_INPERMISSION_PAGE,
                    where: {
                        groupId: {
                            like: helperService.getGroupId()
                        }
                    },
                    include: [
                        { relation: "user" }
                    ]
                }
            }
            this.props.createUser(user, countLimits, filterData);
            this.toggleModal('addModal', null);
            event.preventDefault();

        }
    }

    deleteHandle() {
        if (this.state.id) {
            const filterData = {
                filter: {
                    skip: this.state.currentIndex * constants.PAGESIZE_INPERMISSION_PAGE,
                    limit: constants.PAGESIZE_INPERMISSION_PAGE,
                    where: {
                        groupId: {
                            like: helperService.getGroupId()
                        }
                    },
                    include: [
                        { relation: "user" }
                    ]
                }
            }
            this.props.deleteUser(this.state.userGroupId, filterData)
            this.toggleModal('deleteModal', undefined);

        }
    }

    renderTableData(index) {
        const filterData = {
            filter: {
                skip: index * constants.PAGESIZE_INPERMISSION_PAGE,
                limit: constants.PAGESIZE_INPERMISSION_PAGE,
                where: {
                    groupId: {
                        like: helperService.getGroupId()
                    }
                },
                include: [
                    { relation: "user" }
                ]
            }
        }
        this.props.onInitUsers(filterData);
    }

    componentDidMount() {
        this.renderTableData(this.state.currentIndex);
        this.props.getGroupUsersCount();
    }

    componentDidUpdate() {
        if (this.props.error) {
            MySwal.fire({
                icon: 'error',
                title: 'İşlem başarısız',
                text: this.props.errorMessage
            });
            this.props.cleanFlagUser();
            this.setState({ submitted: false });
        }
        else if (this.props.crudSuccess) {
            MySwal.fire({
                icon: 'success',
                title: 'Başarılı',
                text: this.props.message
            });
            this.props.cleanFlagUser();
            this.setState({ submitted: false });
        }

    }

    toggleModal(state, userGroup) {
        if (userGroup) {
            this.setState({
                [state]: !this.state[state],
                userGroupId: userGroup.id ? userGroup.id : '',
                id: userGroup.user.id ? userGroup.user.id : '',
                name: userGroup.user.fullName ? userGroup.user.fullName : '',
                email: userGroup.user.email ? userGroup.user.email : '',
                workStartDate: userGroup.user.workStartDate ? userGroup.user.workStartDate : '',
                weekdayCountLimit: userGroup.weekdayCountLimit ? userGroup.weekdayCountLimit : '',
                weekendCountLimit: userGroup.weekendCountLimit ? userGroup.weekendCountLimit : ''
            });
        }
        else {
            this.setState({
                [state]: !this.state[state],
                userGroupId: '',
                id: '',
                name: '',
                email: '',
                workStartDate: '',
                weekdayCountLimit: '',
                weekendCountLimit: ''
            });
        }
    };

    onChangePaginationItem(index) {
        this.setState({ currentIndex: index });
        this.renderTableData(index);
    }

    render() {
        const { name, email, password, submitted, workStartDate } = this.state;
        const isEmailValid = EmailValidator.validate(email);
        let users = "Kullanıcılar Yükleniyor...";
        let usersCount = 0;

        if (this.props.users) {
            users = this.props.users.map((user) => (
                <Person
                    key={user.user.id}
                    id={user.user.id}
                    fullName={user.user.fullName}
                    workStartDate={user.user.workStartDate}
                    email={user.user.email}
                    weekdayCountLimit={user.weekdayCountLimit}
                    weekendCountLimit={user.weekendCountLimit}
                    editClick={() => this.toggleModal("editModal", user)}
                    deleteClick={() => this.toggleModal("deleteModal", user)}
                />

            ));
        }
        if (this.props.usersCount) {
            usersCount = this.props.usersCount;
        }

        return (
            <>
                <UserHeader />
                {/* Add Modal */}
                <Modal
                    className="modal-dialog-centered"
                    isOpen={this.state.addModal}
                    toggle={() => this.toggleModal("addModal", undefined)}>
                    <div className="modal-header">
                        <h5 className="modal-title" id="addModalLabel">Kullanıcı Ekle</h5>
                        <button
                            aria-label="Close"
                            className="close"
                            data-dismiss="modal"
                            type="button"
                            onClick={() => this.toggleModal("addModal", undefined)}>
                            <span aria-hidden={true}>×</span>
                        </button>
                    </div>
                    <div className="modal-body">
                        <Form role="form" autoComplete="off">
                            <FormGroup>


                                <InputGroup className="input-group-alternative mb-3">
                                    <InputGroupAddon addonType="prepend" style={{ width: "100%" }}>
                                        <InputGroupText>Ad - Soyad:</InputGroupText>
                                        <Input name="name" valid={true} me type="text" value={this.state.name} onChange={(event) => this.inputChangeHandle(event)} />
                                    </InputGroupAddon>
                                </InputGroup>
                                {submitted && !name &&
                                    <p style={{ fontSize: 12 }} className="text-warning">Ad ve soyad gerekli.</p>
                                }
                                <InputGroup className="input-group-alternative mb-3">
                                    <InputGroupAddon addonType="prepend" style={{ width: "100%" }}>
                                        <InputGroupText>E-Mail Adresi:</InputGroupText>
                                        <Input name="email" valid={true} type="text" value={this.state.email} onChange={(event) => this.inputChangeHandle(event)} />
                                    </InputGroupAddon>
                                </InputGroup>
                                {submitted && !email &&
                                    <p style={{ fontSize: 12 }} className="text-warning">Email gerekli.</p>
                                }
                                {submitted && email && !isEmailValid &&

                                    <p style={{ fontSize: 12 }} className="text-warning">Email formatı uygun değil.</p>
                                }
                                <InputGroup className="input-group-alternative mb-3">
                                    <InputGroupAddon addonType="prepend" style={{ width: "100%" }}>
                                        <InputGroupText>Şifre:</InputGroupText>
                                        <Input name="password" valid={true} type="password" value={this.state.password} autoComplete="new-password" onChange={(event) => this.inputChangeHandle(event)} />
                                    </InputGroupAddon>
                                </InputGroup>
                                {submitted && !password &&

                                    <p style={{ fontSize: 12, marginTop: '2%' }} className="text-warning">Şifre gerekli.</p>
                                }

                                {submitted && password && password.length < 8 &&

                                    <p style={{ fontSize: 12, marginTop: '2%' }} className="text-warning">Şifre en az 8 karekter olmalı.</p>
                                }
                                <InputGroup className="input-group-alternative mb-3">
                                    <InputGroupAddon addonType="prepend" style={{ width: "100%" }}>
                                        <InputGroupText>
                                            <i className="ni ni-calendar-grid-58" style={{ marginRight: "5px" }} />
                                            İş Başlangıç Tarihi:
                                        </InputGroupText>

                                        <DatePicker
                                            required={true}
                                            timeFormat={false}
                                            dateFormat="dd-MM-yyyy"
                                            selected={Date.parse(this.state.workStartDate)}
                                            onChange={(event) => this.inputChangeHandleDate(event)}
                                        />
                                    </InputGroupAddon>
                                </InputGroup>
                                {submitted && !workStartDate &&

                                    <p style={{ fontSize: 12, marginTop: '2%' }} className="text-warning">İş Başlangıç Tarihi gerekli.</p>
                                }
                                <InputGroup className="input-group-alternative mb-3">
                                    <InputGroupAddon addonType="prepend" style={{ width: "100%" }}>
                                        <InputGroupText>Haftaiçi Nöbet Sayısı:</InputGroupText>
                                        <Input name="weekdayCountLimit" type="number" min="0" value={this.state.weekdayCountLimit} onChange={(event) => this.inputChangeHandle(event)} />
                                    </InputGroupAddon>
                                </InputGroup>
                                <InputGroup className="input-group-alternative mb-3">
                                    <InputGroupAddon addonType="prepend" style={{ width: "100%" }}>
                                        <InputGroupText>Haftasonu Nöbet Sayısı:</InputGroupText>
                                        <Input name="weekendCountLimit" type="number" min="0" value={this.state.weekendCountLimit} onChange={(event) => this.inputChangeHandle(event)} />
                                    </InputGroupAddon>
                                </InputGroup>
                            </FormGroup>

                        </Form>
                    </div>
                    <div className="modal-footer">
                        <Button
                            color="secondary"
                            data-dismiss="modal"
                            type="button"
                            onClick={() => this.toggleModal("addModal", undefined)}>Kapat
                        </Button>
                        <Button color="primary" type="submit" onClick={this.addHandle}>Kaydet</Button>
                    </div>
                </Modal>

                {/* Edit Modal  */}
                <Modal
                    className="modal-dialog-centered"
                    isOpen={this.state.editModal}
                    toggle={() => this.toggleModal("editModal", undefined)}>
                    <div className="modal-header">
                        <h5 className="modal-title" id="editModalLabel">Kullanıcı Düzenle</h5>
                        <button
                            aria-label="Close"
                            className="close"
                            data-dismiss="modal"
                            type="button"
                            onClick={() => this.toggleModal("editModal", undefined)}>
                            <span aria-hidden={true}>×</span>
                        </button>
                    </div>
                    <div className="modal-body">
                        <Form role="form">
                            <FormGroup>
                                <InputGroup className="input-group-alternative mb-3">
                                    <InputGroupAddon addonType="prepend" style={{ width: "100%" }}>
                                        <InputGroupText>Ad - Soyad:</InputGroupText>
                                        <Input name="name" type="text" value={this.state.name} onChange={(event) => this.inputChangeHandle(event)} />
                                    </InputGroupAddon>
                                </InputGroup>
                                {submitted && !name &&
                                    <p style={{ fontSize: 12 }} className="text-warning">Ad ve soyad gerekli.</p>
                                }
                                <InputGroup className="input-group-alternative mb-3">
                                    <InputGroupAddon addonType="prepend" style={{ width: "100%" }}>
                                        <InputGroupText>E-Mail Adresi:</InputGroupText>
                                        <Input name="email" type="text" value={this.state.email} onChange={(event) => this.inputChangeHandle(event)} />
                                    </InputGroupAddon>
                                </InputGroup>
                                {submitted && !email &&
                                    <p style={{ fontSize: 12 }} className="text-warning">Email gerekli.</p>
                                }
                                {submitted && email && !isEmailValid &&

                                    <p style={{ fontSize: 12 }} className="text-warning">Email formatı uygun değil.</p>
                                }
                                <InputGroup className="input-group-alternative mb-3">
                                    <InputGroupAddon addonType="prepend" style={{ width: "100%" }}>
                                        <InputGroupText>
                                            <i className="ni ni-calendar-grid-58" style={{ marginRight: "5px" }} />
                                            İş Başlangıç Tarihi:
                                        </InputGroupText>
                                        <DatePicker
                                            dateFormat="dd-MM-yyyy"
                                            selected={Date.parse(this.state.workStartDate)}
                                            onChange={(event) => this.inputChangeHandleDate(event)}
                                        />
                                    </InputGroupAddon>
                                </InputGroup>
                                {submitted && !workStartDate &&

                                    <p style={{ fontSize: 12, marginTop: '2%' }} className="text-warning">İş Başlangıç Tarihi gerekli.</p>
                                }
                                <InputGroup className="input-group-alternative mb-3">
                                    <InputGroupAddon addonType="prepend" style={{ width: "100%" }}>
                                        <InputGroupText>Haftaiçi Nöbet Sayısı:</InputGroupText>
                                        <Input name="weekdayCountLimit" type="number" min="0" value={this.state.weekdayCountLimit} onChange={(event) => this.inputChangeHandle(event)} />
                                    </InputGroupAddon>
                                </InputGroup>
                                <InputGroup className="input-group-alternative mb-3">
                                    <InputGroupAddon addonType="prepend" style={{ width: "100%" }}>
                                        <InputGroupText>Haftasonu Nöbet Sayısı:</InputGroupText>
                                        <Input name="weekendCountLimit" type="number" min="0" value={this.state.weekendCountLimit} onChange={(event) => this.inputChangeHandle(event)} />
                                    </InputGroupAddon>
                                </InputGroup>
                            </FormGroup>
                        </Form>
                    </div>
                    <div className="modal-footer">
                        <Button
                            color="secondary"
                            data-dismiss="modal"
                            type="button"
                            onClick={() => this.toggleModal("editModal", undefined)}>Kapat
                        </Button>
                        <Button color="primary" type="submit" onClick={this.updateHandle}>Değişiklikleri Kaydet</Button>
                    </div>
                </Modal>

                {/* Delete Modal */}
                <Modal
                    className="modal-dialog-centered"
                    isOpen={this.state.deleteModal}
                    toggle={() => this.toggleModal("deleteModal", undefined)}>
                    <div className="modal-header">
                        <h5 className="modal-title" id="deleteModalLabel">Kullanıcı Kaldır</h5>
                        <button
                            aria-label="Close"
                            className="close"
                            data-dismiss="modal"
                            type="button"
                            onClick={() => this.toggleModal("deleteModal", undefined)}>
                            <span aria-hidden={true}>×</span>
                        </button>
                    </div>
                    <div className="modal-body">
                        <h5>Silmek istediğinize emin misiniz ?</h5>
                    </div>
                    <div className="modal-footer">
                        <Button
                            color="secondary"
                            data-dismiss="modal"
                            type="button"
                            onClick={() => this.toggleModal("deleteModal", undefined)}>Kapat
                        </Button>
                        <Button color="danger" type="submit" onClick={this.deleteHandle}>Kaldır</Button>
                    </div>
                </Modal>

                {/* Page content */}
                <Container style={{ marginTop: "-12rem" }} fluid>
                    {/* Table */}
                    <Row>
                        <div className="col">
                            <Card className="shadow">
                                <CardHeader className="border-0">
                                    <div className="row">
                                        <div className="col-md-10">
                                            <h3 className="mb-0" style={{ display: "inline-block" }}>Kullanıcı Listesi</h3>
                                            <Button
                                                color="primary"
                                                onClick={() => this.renderTableData(this.state.currentIndex)}
                                            >
                                                <i className="fas fa-sync-alt"></i>
                                            </Button>
                                        </div>
                                        <div className="col-md-1">

                                        </div>
                                        <div className="col-md-1">
                                            <Button color="primary" type="submit" onClick={() => this.toggleModal("addModal", undefined)}>
                                                <span className="btn-inner--icon">
                                                    <i className="ni ni-fat-add" />
                                                </span>
                                                <span className="btn-inner--text">Yeni</span>
                                            </Button>
                                        </div>
                                    </div>

                                </CardHeader>
                                <Table className="align-items-center table-flush" >
                                    <thead className="thead-light">
                                        <tr>
                                            <th scope="col">Ad Soyad</th>
                                            <th scope="col">Kıdem</th>
                                            <th scope="col">E-Mail</th>
                                            <th scope="col">Haftaiçi Nöbet Sayısı</th>
                                            <th scope="col">Haftasonu Nöbet Sayısı</th>
                                            <th scope="col" className="text-right">İşlemler</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {users}
                                    </tbody>
                                </Table>
                                <CardFooter className="py-4">
                                    <nav style={{ float: "right" }}>
                                        <div  style={{ float:"left",margin:"6px 18px"}}>

                                            Toplam : {usersCount}
                                        </div>
                                        
                                        {usersCount > 0 ?
                                            <CustomPagination
                                                paginationItemCount={helperService.getPaginationItemCount(usersCount, constants.PAGESIZE_INPERMISSION_PAGE)}
                                                paginationItemClick={(index) => this.onChangePaginationItem(index)}
                                                currentIndex={this.state.currentIndex}
                                            /> : null}
                                    </nav>
                                </CardFooter>
                            </Card>
                        </div>
                    </Row>
                </Container>
            </>
        );
    }
}

const mapStateToProps = state => {
    return {
        users: state.users.users,
        usersCount: state.users.groupUsersCount,
        groupId: state.auth.groupId,
        fullName: state.userInfo.fullName,
        crudSuccess: state.users.crudSuccess,
        message: state.users.message,
        error: state.users.error,
        errorMessage: state.users.statusText
    };
};

const mapDispatchToProps = dispatch => {
    return {
        onInitUsers: (filterData) => dispatch(actions.getUsers(filterData)),
        createUser: (userData, countLimits, filterData) => dispatch(actions.createUser(userData, countLimits, filterData)),
        deleteUser: (userGroupId, filterData) => dispatch(actions.deleteUserGroup(userGroupId, filterData)),
        updateUser: (userId, userData, userGroupId, countLimits, filterData) => dispatch(actions.updateUser(userId, userData, userGroupId, countLimits, filterData)),
        getGroupUsersCount: () => dispatch(actions.getGroupUsersCount()),
        cleanFlagUser: () => dispatch(actions.cleanFlagsUsers())
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Persons);
