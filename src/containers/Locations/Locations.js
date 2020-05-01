import React, { Component } from "react";
import { connect } from 'react-redux';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
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
    DropdownMenu,
    DropdownItem,
    UncontrolledDropdown,
    DropdownToggle,
    Form,
    Input,
    InputGroupAddon,
    InputGroupText,
    InputGroup,
    FormGroup
} from "reactstrap";
// core components
import UserHeader from "components/Headers/UserHeader.jsx";
import "./Location.scss";
import { RadioGroup } from "pretty-checkbox-react";
import { helperService } from "../../services";

class Location extends Component {
    constructor(props) {
        super(props)
        this.state = {
            editModal: false,
            addModal: false,
            deleteModal: false,
            id: '',
            name: '',
            colorCode: ''
        }

        this.updateHandle = this.updateHandle.bind(this);
        this.deleteHandle = this.deleteHandle.bind(this);
        this.addHandle = this.addHandle.bind(this);
    }

    inputChangeHandle(event) {
        const target = event.target;
        if (target.name === 'name')
            this.setState({ name: event.target.value });
        if (target.name === 'colorCode')
            this.setState({ colorCode: event.target.value });
    }
    updateHandle(event) {
        const locationData = {
            name: this.state.name,
            colorCode: this.state.colorCode,
        }
        this.props.updateLocation(this.state.id, locationData);
        this.toggleModal('editModal', undefined);

        event.preventDefault();
    }

    addHandle(event) {

        if (this.state.name) {
            const location = {
                name: this.state.name,
                colorCode: this.state.colorCode,
                groupId: helperService.getGroupId()
            }

            this.props.createLocation(location);
            this.toggleModal('addModal', undefined);

        } else {
            alert('Ad alanı zorunludur!')
        }
        event.preventDefault();
    }

    deleteHandle() {
        if (this.state.id) {
            this.props.deleteLocation(this.state.id)
            this.toggleModal('deleteModal', undefined);
        }
    }

    renderTableData() {
        const filterData = {
            filter: {
                where: {
                    groupId: {
                        like: helperService.getGroupId()
                    }
                }
            }
        }
        this.props.onInitLocations(filterData);
    }

    componentDidMount() {
        this.renderTableData();
    }

    toggleModal(state, location) {
        if (location) {
            this.setState({
                [state]: !this.state[state],
                id: location.id ? location.id : null,
                name: location.name ? location.name : null,
                colorCode: location.colorCode ? location.colorCode : null
            });
        }
        else {
            this.setState({
                [state]: !this.state[state],
                id: null,
                name: null,
                colorCode: null
            });
        }
    };

    onDragEnd = result => {

        const { destination, source } = result;

        if (!destination) {
            return;
        }
        if (source.index === destination.index) {
            return;
        }

        if (destination.droppableId === source.droppableId) {

            const locationsData = [];

            //hareket ettirilen kayıt
            const movedId = this.props.locations[source.index].id;
            const newSortOrder = destination.index;
            locationsData.push({
                id: this.props.locations[source.index].id,
                sortOrder: newSortOrder
            });

            if (destination.index > source.index) {
                for (let i = source.index; i <= destination.index; i++) {
                    const id = this.props.locations[i].id;
                    if (id !== movedId) {
                        locationsData.push({
                            id: id,
                            sortOrder: this.props.locations[i].sortOrder - 1
                        });
                    }
                }
            }
            else if (destination.index < source.index) {
                for (let i = destination.index; i < source.index; i++) {
                    const id = this.props.locations[i].id;
                    if (id !== movedId) {
                        locationsData.push({
                            id: id,
                            sortOrder: this.props.locations[i].sortOrder + 1
                        });
                    }
                }
            }

            this.props.reorderLocation(locationsData, source.index, destination.index);
        }
    };

    getItemStyle = (isDragging, draggableStyle) => ({
        // some basic styles to make the items look a bit nicer
        userSelect: "none",

        // change background colour if dragging
        background: isDragging ? "lightgray" : "",
        width: isDragging ? "1000px" : "",
        // styles we need to apply on draggables
        ...draggableStyle
    });

    render() {
        let locations = "Lokasyonlar Yükleniyor...";
        if (this.props.locations) {

            locations = this.props.locations.map((location, index) => (
                <Draggable
                    key={location.id}
                    draggableId={location.id}
                    index={index}>
                    {(provided, draggableSnapshot) => (
                        <tr key={location.id}
                            ref={provided.innerRef}
                            {...provided.draggableProps}
                            {...provided.dragHandleProps}
                            style={this.getItemStyle(
                                draggableSnapshot.isDragging,
                                provided.draggableProps.style
                            )}
                        >
                            <td>
                                <div id="menuToggle">
                                    <span className="span"></span>
                                    <span className="span"></span>
                                    <span className="span"></span>
                                </div>
                            </td>
                            <td>{location.name}</td>
                            <td>
                                <label className="radioLabelList" type="radioLabel" htmlFor={location.colorCode}><span type="radioSpan" className={"radioSpanList " + location.colorCode} ></span></label>
                            </td>
                            <td className="text-right">
                                <UncontrolledDropdown>
                                    <DropdownToggle className="text-dark" role="button" onClick={e => e.preventDefault()}>
                                        İşlemler
                                    </DropdownToggle>
                                    <DropdownMenu className="dropdown-menu-arrow" right>
                                        <DropdownItem style={{ marginLeft: "0px" }} onClick={() => this.toggleModal("editModal", location)}>Düzenle</DropdownItem>
                                        <DropdownItem style={{ marginLeft: "0px" }} onClick={() => this.toggleModal("deleteModal", location)}>Kaldır</DropdownItem>
                                    </DropdownMenu>
                                </UncontrolledDropdown>
                            </td>
                        </tr>
                    )}
                </Draggable>
            ));
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
                                    <InputGroupAddon addonType="prepend" style={{ width: "100%" }}>
                                        <InputGroupText>
                                            Lokasyon Adı
                                        </InputGroupText>
                                        <Input name="name" type="text" value={this.state.name} onChange={(event) => this.inputChangeHandle(event)} />
                                    </InputGroupAddon>
                                </InputGroup>
                            </FormGroup>

                            <FormGroup>
                                <InputGroup className="input-group-alternative mb-3 pt-3">
                                    <InputGroupAddon addonType="prepend" style={{ width: "100%" }}>
                                        <InputGroupText>
                                            <i className="ni ni-palette" />
                                        </InputGroupText>

                                        <RadioGroup name="colorCode" value={this.state.colorCode} onChange={(event) => this.inputChangeHandle(event)}>

                                            <input className="radioInput" type="radio" name="colorCode" id="primary" value="primary" onChange={(event) => this.inputChangeHandle(event)} />
                                            <label className="radioLabel" type="radioLabel" htmlFor="primary"><span type="radioSpan" className="radioSpan primary"></span></label>

                                            <input className="radioInput" type="radio" name="colorCode" id="secondary" value="secondary" onChange={(event) => this.inputChangeHandle(event)} />
                                            <label className="radioLabel" type="radioLabel" htmlFor="secondary"><span type="radioSpan" className="radioSpan secondary"></span></label>

                                            <input className="radioInput" type="radio" name="colorCode" id="success" value="success" onChange={(event) => this.inputChangeHandle(event)} />
                                            <label className="radioLabel" type="radioLabel" htmlFor="success"><span type="radioSpan" className="radioSpan success"></span></label>

                                            <input className="radioInput" type="radio" name="colorCode" id="info" value="info" onChange={(event) => this.inputChangeHandle(event)} />
                                            <label className="radioLabel" type="radioLabel" htmlFor="info"><span type="radioSpan" className="radioSpan info"></span></label>

                                            <input className="radioInput" type="radio" name="colorCode" id="warning" value="warning" onChange={(event) => this.inputChangeHandle(event)} />
                                            <label className="radioLabel" type="radioLabel" htmlFor="warning"><span type="radioSpan" className="radioSpan warning"></span></label>

                                            <input className="radioInput" type="radio" name="colorCode" id="danger" value="danger" onChange={(event) => this.inputChangeHandle(event)} />
                                            <label className="radioLabel" type="radioLabel" htmlFor="danger"><span type="radioSpan" className="radioSpan danger"></span></label>

                                            <input className="radioInput" type="radio" name="colorCode" id="light" value="light" onChange={(event) => this.inputChangeHandle(event)} />
                                            <label className="radioLabel" type="radioLabel" htmlFor="light"><span type="radioSpan" className="radioSpan light"></span></label>

                                            <input className="radioInput" type="radio" name="colorCode" id="dark" value="dark" onChange={(event) => this.inputChangeHandle(event)} />
                                            <label className="radioLabel" type="radioLabel" htmlFor="dark"><span type="radioSpan" className="radioSpan dark"></span></label>

                                            <input className="radioInput" type="radio" name="colorCode" id="default" value="default" onChange={(event) => this.inputChangeHandle(event)} />
                                            <label className="radioLabel" type="radioLabel" htmlFor="default"><span type="radioSpan" className="radioSpan default"></span></label>

                                            <input className="radioInput" type="radio" name="colorCode" id="white" value="white" onChange={(event) => this.inputChangeHandle(event)} />
                                            <label className="radioLabel" type="radioLabel" htmlFor="white"><span type="radioSpan" className="radioSpan white"></span></label>

                                            <input className="radioInput" type="radio" name="colorCode" id="darker" value="darker" onChange={(event) => this.inputChangeHandle(event)} />
                                            <label className="radioLabel" type="radioLabel" htmlFor="darker"><span type="radioSpan" className="radioSpan darker"></span></label>
                                        </RadioGroup>
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
                        <Button color="primary" type="submit" onClick={this.addHandle}>Değişiklikleri Kaydet</Button>
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
                                    <InputGroupAddon addonType="prepend" style={{ width: "100%" }}>
                                        <InputGroupText>
                                            Lokasyon Adı:
                                        </InputGroupText>
                                        <Input name="name" type="text" value={this.state.name || ''} onChange={(event) => this.inputChangeHandle(event)} />
                                    </InputGroupAddon>
                                </InputGroup>
                            </FormGroup>
                            <FormGroup>

                                <InputGroup className="input-group-alternative mb-3 pt-3">
                                    <InputGroupAddon addonType="prepend" style={{ width: "100%" }}>
                                        <InputGroupText>
                                            <i className="ni ni-palette" />
                                        </InputGroupText>


                                        <RadioGroup name="colorCode" value={this.state.colorCode} onChange={(event) => this.inputChangeHandle(event)}>

                                            <input className="radioInput" type="radio" name="colorCode" id="primary" value="primary" onChange={(event) => this.inputChangeHandle(event)} checked={this.state.colorCode === "primary"} />
                                            <label className="radioLabel" type="radioLabel" htmlFor="primary"><span type="radioSpan" className="radioSpan primary" ></span></label>

                                            <input className="radioInput" type="radio" name="colorCode" id="secondary" value="secondary" onChange={(event) => this.inputChangeHandle(event)} checked={this.state.colorCode === "secondary"} />
                                            <label className="radioLabel" type="radioLabel" htmlFor="secondary"><span type="radioSpan" className="radioSpan secondary"></span></label>

                                            <input className="radioInput" type="radio" name="colorCode" id="success" value="success" onChange={(event) => this.inputChangeHandle(event)} checked={this.state.colorCode === "success"} />
                                            <label className="radioLabel" type="radioLabel" htmlFor="success"><span type="radioSpan" className="radioSpan success"></span></label>

                                            <input className="radioInput" type="radio" name="colorCode" id="info" value="info" onChange={(event) => this.inputChangeHandle(event)} checked={this.state.colorCode === "info"} />
                                            <label className="radioLabel" type="radioLabel" htmlFor="info"><span type="radioSpan" className="radioSpan info"></span></label>

                                            <input className="radioInput" type="radio" name="colorCode" id="warning" value="warning" onChange={(event) => this.inputChangeHandle(event)} checked={this.state.colorCode === "warning"} />
                                            <label className="radioLabel" type="radioLabel" htmlFor="warning"><span type="radioSpan" className="radioSpan warning"></span></label>

                                            <input className="radioInput" type="radio" name="colorCode" id="danger" value="danger" onChange={(event) => this.inputChangeHandle(event)} checked={this.state.colorCode === "danger"} />
                                            <label className="radioLabel" type="radioLabel" htmlFor="danger"><span type="radioSpan" className="radioSpan danger"></span></label>

                                            <input className="radioInput" type="radio" name="colorCode" id="light" value="light" onChange={(event) => this.inputChangeHandle(event)} checked={this.state.colorCode === "light"} />
                                            <label className="radioLabel" type="radioLabel" htmlFor="light"><span type="radioSpan" className="radioSpan light"></span></label>

                                            <input className="radioInput" type="radio" name="colorCode" id="dark" value="dark" onChange={(event) => this.inputChangeHandle(event)} checked={this.state.colorCode === "dark"} />
                                            <label className="radioLabel" type="radioLabel" htmlFor="dark"><span type="radioSpan" className="radioSpan dark"></span></label>

                                            <input className="radioInput" type="radio" name="colorCode" id="default" value="default" onChange={(event) => this.inputChangeHandle(event)} checked={this.state.colorCode === "default"} />
                                            <label className="radioLabel" type="radioLabel" htmlFor="default"><span type="radioSpan" className="radioSpan default"></span></label>

                                            <input className="radioInput" type="radio" name="colorCode" id="white" value="white" onChange={(event) => this.inputChangeHandle(event)} checked={this.state.colorCode === "white"} />
                                            <label className="radioLabel" type="radioLabel" htmlFor="white"><span type="radioSpan" className="radioSpan white"></span></label>

                                            <input className="radioInput" type="radio" name="colorCode" id="darker" value="darker" onChange={(event) => this.inputChangeHandle(event)} checked={this.state.colorCode === "darker"} />
                                            <label className="radioLabel" type="radioLabel" htmlFor="darker"><span type="radioSpan" className="radioSpan darker"></span></label>
                                        </RadioGroup>
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
                        <h5>Bu lokasyonu silerseniz, lokasyona bağlı oluşturulmuş nöbetler de silinecektir! Silmek istediğinize emin misiniz ?</h5>
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
                    <DragDropContext onDragEnd={this.onDragEnd}>
                        <Row>
                            <div className="col">
                                <Card className="shadow">
                                    <CardHeader className="border-0">
                                        <div className="row">
                                            <div className="col-md-10">
                                                <h3 className="mb-0">Lokasyon Listesi</h3>

                                            </div>
                                            <div className="col-md-1">
                                                <Button
                                                    color="primary"
                                                    onClick={() => this.renderTableData()}
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
                                    <Table className="align-items-center table-flush">
                                        <thead className="thead-light">
                                            <tr>
                                                <th scope="col"></th>
                                                <th scope="col">Adı</th>
                                                <th scope="col">Renk</th>
                                                <th scope="col" />
                                            </tr>
                                        </thead>
                                        <Droppable droppableId="LocationList" >
                                            {(provided) => (
                                                <tbody ref={provided.innerRef}>
                                                    {locations}
                                                </tbody>
                                            )}
                                        </Droppable>
                                    </Table>
                                    <CardFooter className="py-4">
                                        <nav aria-label="...">

                                        </nav>
                                    </CardFooter>
                                </Card>
                            </div>
                        </Row>
                    </DragDropContext>
                </Container>
            </>
        );
    }
}

const mapStateToProps = state => {
    return {
        locations: state.locations.locations,
        groupId: state.auth.groupId,
        fullName: state.userInfo.fullName,
        error: state.locations.error
    };
};

const mapDispatchToProps = dispatch => {
    return {
        onInitLocations: (filterData) => dispatch(actions.initLocations(filterData)),
        createLocation: (locationData) => dispatch(actions.createLocation(locationData)),
        deleteLocation: (locationId) => dispatch(actions.deleteLocation(locationId)),
        updateLocation: (locationId, locationData) => dispatch(actions.updateLocation(locationId, locationData)),
        reorderLocation: (locationsData, startIndex, endIndex) => dispatch(actions.reorderLocation(locationsData, startIndex, endIndex))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Location);
