import React, { Component } from "react";
import { connect } from 'react-redux';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import { listOfColorName } from "../../variables/constants";
import * as actions from '../../store/actions';

import {
    Modal,
    Button,
    Card,
    CardHeader,
    CardFooter,
    Col,
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
import UserHeader from "../../components/Headers/UserHeader.jsx";
import "./Locations.scss";
import styles from "./Locations.scss";
import { RadioGroup } from "pretty-checkbox-react";
import { helperService } from "../../services";
import withReactContent from 'sweetalert2-react-content';
import Swal from 'sweetalert2';

const MySwal = withReactContent(Swal);

class Locations extends Component {
    constructor(props) {
        super(props)
        this.state = {
            editModal: false,
            addModal: false,
            deleteModal: false,
            submitted: false,
            id: '',
            name: '',
            colorCode: ''
        }

        this.updateHandle = this.updateHandle.bind(this);
        this.deleteHandle = this.deleteHandle.bind(this);
        this.addHandle = this.addHandle.bind(this);
    }
    handleValidation() {
        let formIsValid = true;
        const { name, colorCode } = this.state;
        if (!name || !colorCode) {
            formIsValid = false;
        }
        return formIsValid
    }
    inputChangeHandle(event) {
        const target = event.target;
        if (target.name === 'name')
            this.setState({ name: event.target.value, submitted: false });
        if (target.name === 'colorCode')
            this.setState({ colorCode: event.target.value, submitted: false });
    };

    updateHandle(event) {
        this.setState({ submitted: true });
        if (this.handleValidation()) {
            const locationData = {
                name: this.state.name,
                colorCode: this.state.colorCode,
            }
            this.props.updateLocation(this.state.id, locationData);
            this.toggleModal('editModal', undefined);

            event.preventDefault();
        }
    };

    addHandle(event) {
        this.setState({ submitted: true });
        if (this.handleValidation()) {
            const location = {
                name: this.state.name,
                colorCode: this.state.colorCode,
                groupId: helperService.getGroupId(),
                sortOrder: this.props.locations.length
            }

            this.props.createLocation(location);
            this.toggleModal('addModal', undefined);

            event.preventDefault();
        }
    };

    deleteHandle() {
        if (this.state.id) {
            this.props.deleteLocation(this.state.id)
            this.toggleModal('deleteModal', undefined);
        }
    };

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
    };

    componentDidMount() {
        this.renderTableData();
    };

    componentDidUpdate() {
        
        if (this.props.error) {
            MySwal.fire({
                icon: 'error',
                title: 'İşlem başarısız',
                text: this.props.statusText
            });
            this.props.cleanFlagsLocation();
            this.setState({ submitted: false });
        }
        else if (this.props.crudSuccess) {
            MySwal.fire({
                icon: 'success',
                title: 'Başarılı',
                text: this.props.message
            });
            this.props.cleanFlagsLocation();
            this.setState({ submitted: false });
        }
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
                for (let i = destination.index; i <= source.index; i++) {
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
        // styles we need to apply on draggables
        ...draggableStyle
    });

    render() {
        const { name, colorCode, submitted } = this.state;
        let locations = "Lokasyonlar Yükleniyor...";
        let locationsCount = 0;
        if (this.props.locations) {
            locationsCount = this.props.locations.length;
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
                            <td ><div style={{display:"block", wordWrap:"break-word"}}>{location.name}</div></td>
                            <td  className="color-right-resp">
                                <label className="radioLabelList" type="radioLabel" title={location.colorCode} htmlFor={location.colorCode}><span type="radioSpan" className={"radioSpanList " + location.colorCode} ></span></label>
                            </td>
                            <td className="text-right" >
                                <UncontrolledDropdown>
                                    <DropdownToggle className="btn-icon-only text-light" size="sm" role="button" onClick={e => e.preventDefault()}>
                                        <i className="fas fa-ellipsis-v" />
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

        const colorsRadioNew = listOfColorName.map((color, index) =>
            <div style={{ float: "left" }} key={index}>
                <input className="radioInput" type="radio" name="colorCode" id={color} value={color} onChange={(event) => this.inputChangeHandle(event)} />
                <label className="radioLabel" type="radioLabel" htmlFor={color} title={color}><span type="radioSpan" className={"radioSpan " + color}></span></label>
            </div>
        );

        const colorsRadioEdit = listOfColorName.map((color, index) =>
            <div style={{ float: "left" }} key={index}>
                <input className="radioInput" type="radio" name="colorCode" id={color} value={color} onChange={(event) => this.inputChangeHandle(event)} checked={this.state.colorCode === color} />
                <label className="radioLabel" type="radioLabel" htmlFor={color} title={color}><span type="radioSpan" className={"radioSpan " + color} ></span></label>
            </div>
        );

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
                                            Lokasyon Adı:
                                        </InputGroupText>
                                        <Input name="name" type="text" value={this.state.name} onChange={(event) => this.inputChangeHandle(event)} />
                                    </InputGroupAddon>
                                </InputGroup>
                                {submitted && !name &&
                                    <p style={{ fontSize: 12 }} className="text-warning">Ad alanı gerekli.</p>
                                }
                            </FormGroup>

                            <FormGroup>
                                <InputGroup className="input-group-alternative mb-3 pt-3">
                                    <InputGroupAddon addonType="prepend" style={{ width: "100%" }}>
                                        <InputGroupText>
                                            <i className="ni ni-palette" />
                                        </InputGroupText>

                                        <RadioGroup name="colorCode" value={this.state.colorCode} onChange={(event) => this.inputChangeHandle(event)}>
                                            {colorsRadioNew}
                                        </RadioGroup>
                                    </InputGroupAddon>
                                </InputGroup>
                                {submitted && !colorCode &&
                                    <p style={{ fontSize: 12 }} className="text-warning">Renk seçimi gerekli.</p>
                                }
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
                                {submitted && !name &&
                                    <p style={{ fontSize: 12 }} className="text-warning">Ad alanı gerekli.</p>
                                }
                            </FormGroup>

                            <FormGroup>
                                <InputGroup className="input-group-alternative mb-3 pt-3">
                                    <InputGroupAddon addonType="prepend" style={{ width: "100%" }}>
                                        <InputGroupText>
                                            <i className="ni ni-palette" />
                                        </InputGroupText>

                                        <RadioGroup name="colorCode" value={this.state.colorCode} onChange={(event) => this.inputChangeHandle(event)}>
                                            {colorsRadioEdit}
                                        </RadioGroup>

                                    </InputGroupAddon>
                                </InputGroup>
                                {submitted && !colorCode &&
                                    <p style={{ fontSize: 12 }} className="text-warning">Renk seçimi gerekli.</p>
                                }
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
                <Container style={{ marginTop: "-12rem" }} className="locationsListSpec" fluid>
                    {/* Table */}

                    <Row>
                        <div className="col">
                            <Card className="shadow">
                                <CardHeader className="border-0">
                                    <Row>
                                        <Col xl="10" lg="9" md="8" sm="7" xs="7">
                                            <h3 className="mb-0" style={{ display: "inline-block" }}>Lokasyon Listesi</h3>
                                            <Button
                                                color="secondary"
                                                className="btnLoc"
                                                onClick={() => this.renderTableData()}
                                                size="lg"
                                            >
                                                <i className="fas fa-sync-alt fa-lg"></i>
                                            </Button>
                                        </Col>
                                        <Col  xl="2" lg="3" md="4" sm="5" xs="5">
                                            <Button color="primary" type="submit"  onClick={() => this.toggleModal("addModal", undefined)}>
                                                <span className="btn-inner--icon">
                                                    <i className="ni ni-fat-add" />
                                                </span>
                                                <span className="btn-inner--text">Yeni</span>
                                            </Button>
                                        </Col>
                                    </Row>

                                </CardHeader>
                                <DragDropContext onDragEnd={this.onDragEnd}>
                                    <Table className="align-items-center table-flush specialTableLoc" >
                                        <thead className="thead-light">
                                            <tr>
                                                <th scope="col"></th>
                                                <th scope="col">Adı</th>
                                                <th scope="col" className="color-right-resp">Renk</th>
                                                <th scope="col" className="text-right">İşlemler</th>
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
                                </DragDropContext>
                                <CardFooter className="py-4" style={{ position: "inherit" }}>
                                    <nav style={{ float: "right" }}>
                                        Toplam : {locationsCount}
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
        groupId: state.auth.groupId,
        fullName: state.userInfo.fullName,
        error: state.locations.error,
        crudSuccess: state.locations.crudSuccess,
        statusText: state.locations.statusText,
        message: state.locations.message
    };
};

const mapDispatchToProps = dispatch => {
    return {
        onInitLocations: (filterData) => dispatch(actions.initLocations(filterData)),
        createLocation: (locationData) => dispatch(actions.createLocation(locationData)),
        deleteLocation: (locationId) => dispatch(actions.deleteLocation(locationId)),
        updateLocation: (locationId, locationData) => dispatch(actions.updateLocation(locationId, locationData)),
        reorderLocation: (locationsData, startIndex, endIndex) => dispatch(actions.reorderLocation(locationsData, startIndex, endIndex)),
        cleanFlagsLocation: () => dispatch(actions.cleanFlagsLocation())

    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Locations);
