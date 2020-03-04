import React, { Component } from "react";
import { connect } from 'react-redux';
import * as actions from '../../store/actions';
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
    FormGroup,
    Label,
} from "reactstrap";
// core components
import UserHeader from "components/Headers/UserHeader.jsx";
import "./Location.scss";
import { RadioGroup, Radio } from "pretty-checkbox-react";

class Location extends Component {
    constructor(props) {
        super(props)
        this.state = {
            editModal: false,
            addModal: false,
            deleteModal: false,
            item: {},
            name: '',
            colorCode: '',
            data: []
        }
        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleUpdate = this.handleUpdate.bind(this);
        this.handleDelete = this.handleDelete.bind(this);
        this.handleAdd = this.handleAdd.bind(this);
    }

    handleInputChange(event) {
        const target = event.target;
        if (target.name === 'name')
            this.setState({ name: event.target.value });
        if (target.name === 'colorCode')
            this.setState({ colorCode: event.target.value });
    }
    handleUpdate(event) {
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

    handleAdd(event) {
        debugger;
        if (this.state.name) {
            this.state.item.name = this.state.name;
            this.state.item.colorCode = this.state.colorCode;
            this.state.item.groupId = '5e53975e62398900983c869c'; /* İleri de localstorage veya servisle çekilecek. Şimdilik sabit id ile yapıldı.*/

            Api.post('locations', this.state.item).then((result) => {
                this.toggleModal('addModal', undefined)
            }).catch((ex) => {
                alert(ex.response.message)
            });

        } else {
            alert('Adı alanı zorunludur!')
        }
        event.preventDefault();
    }

    handleDelete(event) {
        if (this.state.item && this.state.item.id) {
            Api.delete('locations/' + this.state.item.id).then(result => {
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
                {/* Add Modal */}
                <Modal
                    className="modal-dialog-centered"
                    isOpen={this.state.addModal}
                    toggle={() => this.toggleModal("addModal", undefined)}>
                    <div className="modal-header">
                        <h5 className="modal-title" id="addModalLabel">Lokasyon Ekle</h5>
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

                            <FormGroup>

                                <InputGroup className="input-group-alternative mb-3">
                                    <InputGroupAddon addonType="prepend">
                                        <InputGroupText>
                                            <i className="ni ni-palette" />
                                        </InputGroupText>
                                    </InputGroupAddon>

                                    <RadioGroup name="colorCode" value={this.state.colorCode} onChange={this.handleInputChange}>

                                        <input class="radioInput" type="radio" name="colorCode" id="primary" value="primary" onChange={this.handleInputChange} />
                                        <label class="radioLabel" type="radioLabel" for="primary"><span type="radioSpan" class="radioSpan primary"></span></label>

                                        <input class="radioInput" type="radio" name="colorCode" id="secondary" value="secondary" onChange={this.handleInputChange} />
                                        <label class="radioLabel" type="radioLabel" for="secondary"><span type="radioSpan" class="radioSpan secondary"></span></label>

                                        <input class="radioInput" type="radio" name="colorCode" id="success" value="success" onChange={this.handleInputChange} />
                                        <label class="radioLabel" type="radioLabel" for="success"><span type="radioSpan" class="radioSpan success"></span></label>

                                        <input class="radioInput" type="radio" name="colorCode" id="info" value="info" onChange={this.handleInputChange} />
                                        <label class="radioLabel" type="radioLabel" for="info"><span type="radioSpan" class="radioSpan info"></span></label>

                                        <input class="radioInput" type="radio" name="colorCode" id="warning" value="warning" onChange={this.handleInputChange} />
                                        <label class="radioLabel" type="radioLabel" for="warning"><span type="radioSpan" class="radioSpan warning"></span></label>

                                        <input class="radioInput" type="radio" name="colorCode" id="danger" value="danger" onChange={this.handleInputChange} />
                                        <label class="radioLabel" type="radioLabel" for="danger"><span type="radioSpan" class="radioSpan danger"></span></label>

                                        <input class="radioInput" type="radio" name="colorCode" id="light" value="light" onChange={this.handleInputChange} />
                                        <label class="radioLabel" type="radioLabel" for="light"><span type="radioSpan" class="radioSpan light"></span></label>

                                        <input class="radioInput" type="radio" name="colorCode" id="dark" value="dark" onChange={this.handleInputChange} />
                                        <label class="radioLabel" type="radioLabel" for="dark"><span type="radioSpan" class="radioSpan dark"></span></label>

                                        <input class="radioInput" type="radio" name="colorCode" id="default" value="default" onChange={this.handleInputChange} />
                                        <label class="radioLabel" type="radioLabel" for="default"><span type="radioSpan" class="radioSpan default"></span></label>

                                        <input class="radioInput" type="radio" name="colorCode" id="white" value="white" onChange={this.handleInputChange} />
                                        <label class="radioLabel" type="radioLabel" for="white"><span type="radioSpan" class="radioSpan white"></span></label>

                                        <input class="radioInput" type="radio" name="colorCode" id="darker" value="darker" onChange={this.handleInputChange} />
                                        <label class="radioLabel" type="radioLabel" for="darker"><span type="radioSpan" class="radioSpan darker"></span></label>
                                    </RadioGroup>

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
                        <Button color="primary" type="submit" onClick={this.handleAdd}>Değişiklikleri Kaydet</Button>
                    </div>
                </Modal>
                {/* Edit Modal  */}
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
                        <Button color="primary" type="submit" onClick={this.handleUpdate}>Değişiklikleri Kaydet</Button>
                    </div>
                </Modal>
                {/* Delete Modal */}
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
                                    <div class="row">
                                        <div class="col-md-11">
                                            <h3 className="mb-0">Lokasyon Listesi</h3>
                                        </div>
                                        <div class="col-md-1">
                                            <Button className="btn-icon btn-3" color="primary" type="submit" onClick={() => this.toggleModal("addModal", undefined)}>
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

const mapStateToProps = state => {
    return {
        locations: state.locations.locations,
        error: state.locations.error
    };
};

const mapDispatchToProps = dispatch => {
    return {
        initLocations: () => dispatch(actions.initLocations()),
        createLocation: (locationData) => dispatch(actions.createLocation(locationData)),
        deleteLocation: (locationId) => dispatch(actions.deleteLocation(locationId)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Location);
