import React, { Component } from "react";
import { connect } from 'react-redux';
import * as actions from '../../store/actions';

// reactstrap components
import {
    Modal,
    Button,
    Card,
    CardHeader,
    CardFooter,
    Pagination,
    PaginationItem,
    PaginationLink,
    Table,
    Container,
    Row,
    DropdownMenu,
    DropdownItem,
    UncontrolledDropdown,
    DropdownToggle,
    Form,
    Input,
    InputGroup,
    FormGroup
} from "reactstrap";
// core components
import UserHeader from "components/Headers/UserHeader.jsx";
import "./Persons.css";

class Persons extends Component {
    constructor(props) {
        super(props)
        this.state = {
            editModal: false,
            addModal: false,
            deleteModal: false,
            id: '',
            name: '',
            title: '',
            email: '',
            password: ''
        }
        this.updateHandle = this.updateHandle.bind(this);
        this.deleteHandle = this.deleteHandle.bind(this);
        this.addHandle = this.addHandle.bind(this);
    }

    inputChangeHandle(event) {
        const target = event.target;
        if (target.name === 'title')
            this.setState({ title: event.target.value });
        if (target.name === 'name')
            this.setState({ name: event.target.value });
        if (target.name === 'email')
            this.setState({ email: event.target.value });
        if (target.name === 'password')
            this.setState({ password: event.target.value });
    }


    updateHandle(event) {
        const userData = {
            title: this.state.title,
            fullName: this.state.name,
            email: this.state.email
        };
        this.props.updateUser(this.state.id, userData);
        this.toggleModal('editModal', undefined);

        event.preventDefault();
    }

    addHandle(event) {

        if (this.state.name) {
            const user = {
                fullName: this.state.name,
                title: this.state.title,
                email: this.state.email,
                password:this.state.password,
                //groupId: '5e53975e62398900983c869c',/* İleri de localstorage veya servisle çekilecek. Şimdilik sabit id ile yapıldı.*/
                deviceId: "1"
            };

            this.props.createUser(user);
            this.toggleModal('addModal', undefined);

        } else {
            alert('Ad alanı zorunludur!')
        }
        event.preventDefault();
    }

    deleteHandle() {
        if (this.state.id) {
            this.props.deleteUser(this.state.id)
            this.toggleModal('deleteModal', undefined);
        }
    }

    renderTableData() {
        const filterData = {
            filter: {
                where: {
                    groupId: {
                        like: '5e53975e62398900983c869c'//this.props.groupId
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
        this.renderTableData();
    }

    toggleModal(state, user) {
        if (user) {
            this.setState({
                [state]: !this.state[state],
                id: user.id ? user.id : null,
                name: user.fullName ? user.fullName : null,
                title: user.title ? user.title : null,
                email: user.email ? user.email : null
            });
        }
        else {
            this.setState({
                [state]: !this.state[state],
                id: null,
                name: null,
                title: null,
                email: null
            });
        }
    };

    render() {
        let users = "Kullanıcılar Yükleniyor...";
        if (this.props.users) {
            
            users = this.props.users.map((user) => (
                <tr key={user.user.id}>
                    <td>{user.user.title}</td>
                    <td>{user.user.fullName}</td>
                    <td>{user.user.email}</td>
                    <td className="text-right">
                        <UncontrolledDropdown>
                            <DropdownToggle className="btn-icon-only text-light" role="button" size="sm" color="" onClick={e => e.preventDefault()}>
                                <i className="fas fa-ellipsis-v" />
                            </DropdownToggle>
                            <DropdownMenu className="dropdown-menu-arrow" right>
                                <DropdownItem style={{ marginLeft: "0px" }} onClick={() => this.toggleModal("editModal", user.user)}>Düzenle</DropdownItem>
                                <DropdownItem style={{ marginLeft: "0px" }} onClick={() => this.toggleModal("deleteModal", user.user)}>Kaldır</DropdownItem>
                            </DropdownMenu>
                        </UncontrolledDropdown>
                    </td>
                </tr>
            ));
        }
        return (
            <>
                <UserHeader fullName={this.props.fullName} />
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
                                    <Input placeholder="Ünvan" name="title" type="text" value={this.state.title} onChange={(event) => this.inputChangeHandle(event)} />
                                </InputGroup>
                                <InputGroup className="input-group-alternative mb-3">
                                    <Input placeholder="Kullanıcı Adı ve Soyadı" name="name" type="text" value={this.state.name} onChange={(event) => this.inputChangeHandle(event)} />
                                </InputGroup>
                                <InputGroup className="input-group-alternative mb-3">
                                    <Input placeholder="E-Mail Adresi" name="email" type="text" value={this.state.email} onChange={(event) => this.inputChangeHandle(event)} />
                                </InputGroup>
                                <InputGroup className="input-group-alternative mb-3">
                                    <Input placeholder="Şifre" name="password" type="password" value={this.state.password} autoComplete="new-password" onChange={(event) => this.inputChangeHandle(event)} />
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
                                    <Input placeholder="Ünvan" name="title" type="text" value={this.state.title} onChange={(event) => this.inputChangeHandle(event)} />
                                </InputGroup>
                                <InputGroup className="input-group-alternative mb-3">
                                    <Input placeholder="Kullanıcı Adı ve Soyadı" name="name" type="text" value={this.state.name} onChange={(event) => this.inputChangeHandle(event)} />
                                </InputGroup>
                                <InputGroup className="input-group-alternative mb-3">
                                    <Input placeholder="E-Mail Adresi" name="email" type="text" value={this.state.email} onChange={(event) => this.inputChangeHandle(event)} />
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
                <Container className="mt--7" fluid>
                    {/* Table */}
                    <Row>
                        <div className="col">
                            <Card className="shadow">
                                <CardHeader className="border-0">
                                    <div className="row">
                                        <div className="col-md-11">
                                            <h3 className="mb-0">Kullanıcı Listesi</h3>
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
                                            <th scope="col">Ünvan</th>
                                            <th scope="col">Ad Soyad</th>
                                            <th scope="col">E-Mail</th>
                                            <th scope="col" />
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {users}
                                    </tbody>
                                </Table>
                                <CardFooter className="py-4">
                                    <nav aria-label="...">
                                        <Pagination
                                            className="pagination justify-content-end mb-0"
                                            listClassName="justify-content-end mb-0"
                                        >
                                            <PaginationItem className="disabled">
                                                <PaginationLink
                                                    href="#pablo"
                                                    onClick={e => e.preventDefault()}
                                                    tabIndex="-1"
                                                >
                                                    <i className="fas fa-angle-left" />
                                                    <span className="sr-only">Previous</span>
                                                </PaginationLink>
                                            </PaginationItem>
                                            <PaginationItem className="active">
                                                <PaginationLink
                                                    href="#pablo"
                                                    onClick={e => e.preventDefault()}>
                                                    1
                                                </PaginationLink>
                                            </PaginationItem>
                                            <PaginationItem>
                                                <PaginationLink
                                                    href="#pablo"
                                                    onClick={e => e.preventDefault()}
                                                >
                                                    2 <span className="sr-only">(current)</span>
                                                </PaginationLink>
                                            </PaginationItem>
                                            <PaginationItem>
                                                <PaginationLink
                                                    href="#pablo"
                                                    onClick={e => e.preventDefault()}
                                                >
                                                    3
                                            </PaginationLink>
                                            </PaginationItem>
                                            <PaginationItem>
                                                <PaginationLink
                                                    href="#pablo"
                                                    onClick={e => e.preventDefault()}
                                                >
                                                    <i className="fas fa-angle-right" />
                                                    <span className="sr-only">Next</span>
                                                </PaginationLink>
                                            </PaginationItem>
                                        </Pagination>
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
        groupId: state.auth.groupId,
        fullName: state.userInfo.fullName,
        error: state.users.error
    };
};

const mapDispatchToProps = dispatch => {
    return {
        onInitUsers: (filterData) => dispatch(actions.getUsers(filterData)),
        createUser: (userData) => dispatch(actions.createUser(userData)),
        deleteUser: (userId) => dispatch(actions.deleteUser(userId)),
        updateUser: (userId, userData) => dispatch(actions.updateUser(userId, userData))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Persons);
