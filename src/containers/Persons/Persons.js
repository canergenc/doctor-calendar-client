import React, { Component } from "react";
import { connect } from 'react-redux';
import { helperService } from "../../services";
import UserHeader from "../../components/Headers/UserHeader.jsx";
import Person from './Person/Person';
import CustomPagination from "../../components/Paginations/CustomPagination";
import { personHelper } from "./Person/PersonHelper";
import { constants } from '../../variables/constants';
import * as EmailValidator from 'email-validator';
import * as actions from '../../store/actions';
import "./Persons.css"
import 'pretty-checkbox';

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
    Col,
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
            searchSubmitted: false,
            userGroupId: '',
            searchParam: '',
            id: '',
            name: '',
            email: '',
            workStartDate: '',
            maxData: '',
            weekendCountLimit: 0,
            weekdayCountLimit: 0,
            password: '',
            currentIndex: 0,
            isShowPagination: true
        }
        this.updateHandle = this.updateHandle.bind(this);
        this.deleteHandle = this.deleteHandle.bind(this);
        this.addHandle = this.addHandle.bind(this);
        this.keyPress = this.keyPress.bind(this);
        this.getUsersBySearch = this.getUsersBySearch.bind(this);
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
        if (target.name === 'userDisable') {
            if (this.refs.userDisable.checked) {
                this.setState({ weekendCountLimit: '0', weekdayCountLimit: '0', submitted: false });
            }
        }
        if (target.name === 'searchInput')
            this.setState({ searchParam: event.target.value, submitted: false });

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
                ...(weekdayCountLimit > -1 ? { weekdayCountLimit: weekdayCountLimit } : null),
                ...(weekendCountLimit > -1 ? { weekendCountLimit: weekendCountLimit } : null)
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
            let filter = this.state.searchParam && this.state.searchSubmitted ? personHelper.getSearchFilter(this.state.searchParam) : personHelper.getFilter(this.state.currentIndex);
            this.props.createUser(user, countLimits, filter);
            this.toggleModal('addModal', null);
            event.preventDefault();

        }
    }

    deleteHandle() {
        if (this.state.id) {
            let filter = this.state.searchParam && this.state.searchSubmitted ? personHelper.getSearchFilter(this.state.searchParam) : personHelper.getFilter(this.state.currentIndex);
            this.props.deleteUser(this.state.userGroupId, filter)
            this.toggleModal('deleteModal', undefined);
        }
    }

    getUsersBySearch() {
        if (this.state.searchParam) {
            this.props.onInitUsers(personHelper.getSearchFilter(this.state.searchParam));
            this.setState({ isShowPagination: false, currentIndex: 0, searchSubmitted: true })
        } else {
            this.props.onInitUsers(personHelper.getFilter(this.state.currentIndex));
            this.setState({ isShowPagination: true, currentIndex: 0, searchSubmitted: false })
        }
    }

    keyPress(e) {
        if (e.keyCode === 13) {
            if (e.target.value) {
                const param = e.target.value;
                this.props.onInitUsers(personHelper.getSearchFilter(param));
                this.setState({ isShowPagination: false, currentIndex: 0, searchSubmitted: true })
            } else {
                this.props.onInitUsers(personHelper.getFilter(this.state.currentIndex));
                this.setState({ isShowPagination: true, currentIndex: 0, searchSubmitted: false })
            }
        }
    }

    renderTableData(index) {
        this.props.onInitUsers(personHelper.getFilter(index));
    }

    refreshTable(index) {
        this.renderTableData(index);
        this.setState({ isShowPagination: true, searchParam: '', searchSubmitted: false });
    }

    componentDidMount() {
        const today = new Date();
        this.setState({ maxDate: today });
        this.renderTableData(this.state.currentIndex);
        this.getUserCount();
    }

    getUserCount() {
        this.props.getGroupUsersCount(personHelper.getInitCountFilter());
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
            this.getUserCount();
            this.props.cleanFlagUser();
            this.setState({ submitted: false });
            this.setState({ isShowPagination: this.state.searchParam && this.state.searchSubmitted ? false : true })
            this.setState({ searchParam: this.state.searchParam && !this.state.searchSubmitted ? '' : this.state.searchParam })
        }
    }

    personDayLimitHandle = (event, userId, userGroupId) => {
        let userData = {
        };
        let weekdayCountLimit = 1;
        let weekendCountLimit = 1;


        if (event.target.checked) {
            weekdayCountLimit = 0;
            weekendCountLimit = 0;
        }

        const countLimits = {
            weekdayCountLimit: weekdayCountLimit,
            weekendCountLimit: weekendCountLimit
        };

        let filter = this.state.searchParam && this.state.searchSubmitted ? personHelper.getSearchFilter(this.state.searchParam) : personHelper.getFilter(this.state.currentIndex);
        this.props.updateUser(userId, userData, userGroupId, countLimits, filter);
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
                weekdayCountLimit: ' ',
                weekendCountLimit: ' '
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
                    userGroupId={user.id}
                    fullName={user.user.fullName}
                    workStartDate={user.user.workStartDate}
                    email={user.user.email}
                    weekdayCountLimit={user.weekdayCountLimit}
                    weekendCountLimit={user.weekendCountLimit}
                    personDayLimitHandle={(event) => this.personDayLimitHandle(event, user.user.id, user.id)}
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
                                            showYearDropdown
                                            scrollableYearDropdown
                                            maxDate={Date.parse(this.state.maxDate)}
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
                                            maxDate={Date.parse(this.state.maxDate)}
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
                                        <InputGroupText>Nöbet Atamayı Devre Dışı Bırak:</InputGroupText>
                                        <div id="checkbox-userDisable" className="pretty p-default p-curve" style={{ marginLeft: "0px", marginBottom: "auto", marginTop: "15px", marginRight: "auto" }} >
                                            <input
                                                type="checkbox"
                                                name="userDisable"
                                                ref="userDisable"
                                                onChange={event => this.inputChangeHandle(event)}
                                                checked={((this.state.weekdayCountLimit === '0' || this.state.weekdayCountLimit === '') && (this.state.weekendCountLimit === '0' || this.state.weekendCountLimit === '')) ? true : false}
                                            />
                                            <div className="state p-danger-o">
                                                <label></label>
                                            </div>
                                        </div>
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
                <Container style={{ marginTop: "-12rem" }} className="persons" fluid>
                    {/* Table */}
                    <Row>
                        <div className="col">
                            <Card className="shadow">
                                <CardHeader className="border-0">

                                    <Row className="align-items-center">
                                        <Col xl="9" lg="9" md="8" sm="9" xs="7">
                                            <Input name="searchInput" className="searchPerson" style={{ display: "inline-block" }} onKeyDown={this.keyPress} value={this.state.searchParam} placeholder="Bir şeyler yazın ..." onChange={(event) => this.inputChangeHandle(event)}></Input>
                                            <Button
                                                color="secondary"
                                                className="btnPerson"
                                                onClick={e => this.getUsersBySearch()}
                                                size="lg"
                                                style={{ display: "inline-block" }}
                                            >
                                                <i className="fas fa-search fa-lg"></i>
                                            </Button>

                                            <Button
                                                color="secondary"
                                                className="btnPerson"
                                                onClick={e => this.refreshTable(this.state.currentIndex)}
                                                size="lg"
                                                style={{ display: "inline-block" }}
                                            >
                                                <i className="fas fa-sync-alt fa-lg"></i>
                                            </Button>
                                        </Col>

                                        <Col className="text-right" xl="3" lg="3" md="4" sm="3" xs="5">
                                            <Button color="primary" type="submit" onClick={() => this.toggleModal("addModal", undefined)}>
                                                <span className="btn-inner--icon">
                                                    <i className="ni ni-fat-add" />
                                                </span>
                                                <span className="btn-inner--text">Yeni</span>
                                            </Button>
                                        </Col>
                                    </Row>

                                </CardHeader>
                                <Table className="align-items-center table-flush specialTablePrs" >
                                    <thead className="thead-light" >
                                        <tr>
                                            <th scope="col">Ad Soyad</th>
                                            <th scope="col">Kıdem</th>
                                            <th scope="col">E-Mail</th>
                                            <th scope="col">Nöbet Durumu</th>
                                            <th scope="col">Haftaiçi Nöbet Sayısı</th>
                                            <th scope="col">Haftasonu Nöbet Sayısı</th>
                                            <th scope="col" className="text-right">İşlemler</th>
                                        </tr>
                                    </thead>
                                    <tbody >
                                        {users}
                                    </tbody>
                                </Table>

                                {
                                    this.state.isShowPagination &&
                                    <CardFooter className="py-4">
                                        <nav style={{ float: "right" }}>
                                            <div style={{ float: "left", margin: "6px 18px" }}>

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
                                }

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
        getGroupUsersCount: (filterData) => dispatch(actions.getGroupUsersCount(filterData)),
        cleanFlagUser: () => dispatch(actions.cleanFlagsUsers())
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Persons);
