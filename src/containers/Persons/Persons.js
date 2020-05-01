import React, { Component } from "react";
import { connect } from 'react-redux';
import UserHeader from "components/Headers/UserHeader.jsx";
import { helperService } from "../../services";
import CustomPagination from "../../components/Paginations/CustomPagination";
import { constants } from '../../variables/constants';
import Person from './Person/Person';
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
import moment from "moment";

const MySwal = withReactContent(Swal)

class Persons extends Component {
    constructor(props) {
        super(props)
        this.state = {
            editModal: false,
            addModal: false,
            deleteModal: false,
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

    inputChangeHandle(event) {

        const target = event.target;
        if (target.name === 'name')
            this.setState({ name: event.target.value });
        if (target.name === 'email')
            this.setState({ email: event.target.value });
        if (target.name === 'password')
            this.setState({ password: event.target.value });
        if (target.name === 'weekendCountLimit')
            this.setState({ weekendCountLimit: event.target.value });
        if (target.name === 'weekdayCountLimit')
            this.setState({ weekdayCountLimit: event.target.value });
    }

    inputChangeHandleDate(date) {
        this.setState({ workStartDate: date });
    }

    updateHandle(event) {
        const weekdayCountLimit = parseInt(this.state.weekdayCountLimit);
        const weekendCountLimit = parseInt(this.state.weekendCountLimit);
        if (this.state.name && this.state.email && this.state.workStartDate) {
            let userData = {
                fullName: this.state.name,
                email: this.state.email,
                workStartDate: moment(this.state.workStartDate).format("YYYY-MM-DD[T]hh:mm:ss.sss[Z]"),
                weekdayCountLimit: weekdayCountLimit,
                weekendCountLimit: weekendCountLimit
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
            this.props.updateUser(this.state.id, userData, filterData);
            this.toggleModal('editModal', null);
            event.preventDefault();
            MySwal.fire({
                icon: 'success',
                title: 'Başarılı',
                text: 'Kullanıcı güncellemesi tamamlandı'
            });
        }
        else {
            MySwal.fire({
                icon: 'info',
                title: 'Lütfen,',
                text: 'zorunlu alanları doldurunuz'
            });
        }

    }

    addHandle(event) {

        if (this.state.name && this.state.email && this.state.password && this.state.workStartDate && this.state.weekdayCountLimit && this.state.weekendCountLimit) {
            const user = {
                fullName: this.state.name,
                email: this.state.email,
                password: this.state.password,
                workStartDate: moment(this.state.workStartDate).format("YYYY-MM-DD[T]hh:mm:ss.sss[Z]"),
                weekdayCountLimit: parseInt(this.state.weekdayCountLimit),
                weekendCountLimit: parseInt(this.state.weekendCountLimit),
                deviceId: "1"
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
            this.props.createUser(user, filterData);
            this.toggleModal('addModal', null);
            event.preventDefault();
            MySwal.fire({
                icon: 'success',
                title: 'Başarılı',
                text: 'Kullanıcı kaydedildi'
            });

        } else {
            MySwal.fire({
                icon: 'warning',
                title: 'Lütfen',
                text: 'zorunlu alanları doldurunuz'
            });
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
            MySwal.fire({
                icon: 'success',
                title: 'Başarılı',
                text: 'Kullanıcı silindi'
            });
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

    toggleModal(state, userGroup) {
        if (userGroup) {
            this.setState({
                [state]: !this.state[state],
                userGroupId: userGroup.id ? userGroup.id : '',
                id: userGroup.user.id ? userGroup.user.id : '',
                name: userGroup.user.fullName ? userGroup.user.fullName : '',
                email: userGroup.user.email ? userGroup.user.email : '',
                workStartDate: userGroup.user.workStartDate ? userGroup.user.workStartDate : '',
                weekdayCountLimit: userGroup.user.weekdayCountLimit ? userGroup.user.weekdayCountLimit : '',
                weekendCountLimit: userGroup.user.weekendCountLimit ? userGroup.user.weekendCountLimit : ''
            });
        }
        else {
            this.setState({
                [state]: !this.state[state],
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
                    weekdayCountLimit={user.user.weekdayCountLimit}
                    weekendCountLimit={user.user.weekendCountLimit}
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
                                <InputGroup className="input-group-alternative mb-3">
                                    <InputGroupAddon addonType="prepend" style={{ width: "100%" }}>
                                        <InputGroupText>E-Mail Adresi:</InputGroupText>
                                        <Input name="email" valid={true} type="text" value={this.state.email} onChange={(event) => this.inputChangeHandle(event)} />
                                    </InputGroupAddon>
                                </InputGroup>
                                <InputGroup className="input-group-alternative mb-3">
                                    <InputGroupAddon addonType="prepend" style={{ width: "100%" }}>
                                        <InputGroupText>Şifre:</InputGroupText>
                                        <Input name="password" valid={true} type="password" value={this.state.password} autoComplete="new-password" onChange={(event) => this.inputChangeHandle(event)} />
                                    </InputGroupAddon>
                                </InputGroup>
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
                                <InputGroup className="input-group-alternative mb-3">
                                    <InputGroupAddon addonType="prepend" style={{ width: "100%" }}>
                                        <InputGroupText>E-Mail Adresi:</InputGroupText>
                                        <Input name="email" type="text" value={this.state.email} onChange={(event) => this.inputChangeHandle(event)} />
                                    </InputGroupAddon>
                                </InputGroup>
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
                                            <h3 className="mb-0">Kullanıcı Listesi</h3>
                                        </div>
                                        <div className="col-md-1">
                                                <Button
                                                    color="primary"
                                                    onClick={() => this.renderTableData(this.state.currentIndex)}
                                                >
                                                    <i className="fas fa-sync-alt"></i>
                                                </Button>
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
                                <Table className="align-items-center table-flush" responsive>
                                    <thead className="thead-light">
                                        <tr>
                                            <th scope="col">Ad Soyad</th>
                                            <th scope="col">Kıdem</th>
                                            <th scope="col">E-Mail</th>
                                            <th scope="col">Haftaiçi Nöbet Sayısı</th>
                                            <th scope="col">Haftasonu Nöbet Sayısı</th>
                                            <th scope="col" />
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {users}
                                    </tbody>
                                </Table>
                                <CardFooter className="py-4">
                                    <nav aria-label="...">
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
        error: state.users.error
    };
};

const mapDispatchToProps = dispatch => {
    return {
        onInitUsers: (filterData) => dispatch(actions.getUsers(filterData)),
        createUser: (userData, filterData) => dispatch(actions.createUser(userData, filterData)),
        deleteUser: (userGroupId, filterData) => dispatch(actions.deleteUserGroup(userGroupId, filterData)),
        updateUser: (userId, userData, filterData) => dispatch(actions.updateUser(userId, userData, filterData)),
        getGroupUsersCount: () => dispatch(actions.getGroupUsersCount())
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Persons);
