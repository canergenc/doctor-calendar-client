import React, { Component } from "react";
// Omitted
import Api from '../../api';
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
    InputGroupAddon,
    InputGroupText,
    InputGroup,
    Col,
    FormGroup,
    CardBody,
} from "reactstrap";
// core components
import UserHeader from "components/Headers/UserHeader.jsx";

class Location extends Component {
    constructor(props) {
        super(props)
        this.state = {
            editModal: false,
            deleteModal: false,
            item: {},
            name: '',
            data: []
        }
        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleInputChange(event) {
        const target = event.target;
        if (target.name === 'name')
            this.setState({ name: event.target.value });

    }
    handleSubmit(event) {
        if (this.state.item && this.state.name) {
            this.state.item.name = this.state.name;
            if (this.state.item.name === this.state.name) {
                Api.post('locations/' + this.state.item.id, this.state.item).then((result) => {
                    this.toggleModal('editModal', undefined)
                }).catch((ex) => {
                    alert(ex.response.message)
                });
            }
        }
        event.preventDefault();
    }

    handleDelete(event) {
        if (this.state.item && this.state.item.id) {
            Api.delete('locations/' + this.state.id).then(result => {
                this.toggleModal('deleteModal', undefined);
            }).catch(ex => {
                alert(ex.response.message)
            })
        }
    }

    renderTableData() {
        Api.get('locations', {
            filter: {
                include: [{ relation: "group" }]
            }
        }).then(res => {
            this.setState({
                data: res.data
            });
        }).catch(ex => {
            alert(ex);
        })
    }
    componentDidMount() {
        this.renderTableData();
    }

    toggleModal(state, item) {
        this.setState({
            [state]: !this.state[state],
            name: item ? item.name : undefined,
            item: item ? item : {}
        });
    };

    render() {
        let locations = "Lokasyonlar Yükleniyor...";
        if (this.state.data.length > 0) {
            locations = this.state.data.map((item) => {
                return (
                    <tr key={item.id}>
                        <td>{item.name}</td>
                        <td>***</td>
                        <td className="text-right">
                            <UncontrolledDropdown>
                                <DropdownToggle className="btn-icon-only text-light" role="button" size="sm" color="" onClick={e => e.preventDefault()}>
                                    <i className="fas fa-ellipsis-v" />
                                </DropdownToggle>
                                <DropdownMenu className="dropdown-menu-arrow" right>
                                    <DropdownItem onClick={() => this.toggleModal("editModal", item)}>Düzenle</DropdownItem>
                                    <DropdownItem onClick={() => this.toggleModal("deleteModal", item)}>Kaldır</DropdownItem>
                                </DropdownMenu>
                            </UncontrolledDropdown>
                        </td>
                    </tr>
                )
            });
        }
        return (
            <>
                <UserHeader />
                <Modal
                    className="modal-dialog-centered"
                    isOpen={this.state.editModal}
                    toggle={() => this.toggleModal("editModal", undefined)}>
                    <div className="modal-header">
                        <h5 className="modal-title" id="editModalLabel">Lokasyon Düzenle</h5>
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
                                    <InputGroupAddon addonType="prepend">
                                        <InputGroupText>
                                            <i className="ni ni-single-copy-04" />
                                        </InputGroupText>
                                    </InputGroupAddon>
                                    <Input placeholder="Lokasyon Adı" name="name" type="text" value={this.state.name} onChange={this.handleInputChange} />
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
                        <Button color="primary" type="submit" onClick={this.handleSubmit}>Değişiklikleri Kaydet</Button>
                    </div>
                </Modal>
                <Modal
                    className="modal-dialog-centered"
                    isOpen={this.state.deleteModal}
                    toggle={() => this.toggleModal("deleteModal", undefined)}>
                    <div className="modal-header">
                        <h5 className="modal-title" id="deleteModalLabel">Lokasyon Kaldır</h5>
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
                        <Button color="danger" type="submit" onClick={this.handleDelete}>Kaldır</Button>
                    </div>
                </Modal>
                {/* Page content */}
                <Container className="mt--7" fluid>
                    {/* Table */}
                    <Row>
                        <div className="col">
                            <Card className="shadow">
                                <CardHeader className="border-0">
                                    <h3 className="mb-0">Lokasyon Listesi</h3>
                                </CardHeader>
                                <CardBody>

                                    <Button className="btn-icon btn-3 float-right" color="primary" type="button">
                                        <span className="btn-inner--icon">
                                            <i className="ni ni-fat-add" />
                                        </span>
                                        <span className="btn-inner--text">Yeni</span>
                                    </Button>
                                </CardBody>
                                <Table className="align-items-center table-flush" responsive>
                                    <thead className="thead-light">
                                        <tr>
                                            <th scope="col">Adı</th>
                                            <th scope="col">Bağlı Olduğu Grup</th>
                                            <th scope="col" />
                                        </tr>
                                    </thead>
                                    <tbody>{locations}</tbody>
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

export default Location;
