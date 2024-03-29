import React from "react";
import { connect } from 'react-redux';
import * as actions from '../../store/actions/index';
import { helperService } from "../../services";

import {
  Button,
  Card,
  CardHeader,
  CardBody,
  Container,
  Col,
  FormGroup,
  Form,
  Input,
  InputGroup,
  InputGroupAddon,
  InputGroupText,
  Row,
  Label,
  Table,
  Modal,
  DropdownMenu,
  DropdownItem,
  UncontrolledDropdown,
  DropdownToggle
} from "reactstrap";
import 'pretty-checkbox';
import withReactContent from 'sweetalert2-react-content';
import Swal from 'sweetalert2';
import UserHeader from "../../components/Headers/UserHeader.jsx";
import "./GroupSettings.css"

const MySwal = withReactContent(Swal)

class GroupSettings extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      editModal: false,
      addModal: false,
      deleteModal: false,
      submitted: false,
      isWeekdayControl: false,
      isWeekdayControlChange: false,
      isWeekendControl: false,
      isWeekendControlChange: false,
      sequentialOrderLimitCount: "",
      sequentialOrderLimitCountChange: false,
      locationDayLimit: "",
      locationDayLimitChange: false,
      locationDayLimitCount: "",
      locationDayLimitCountChange: false,
      id: '',
      name: '',
      start: '',
      finish: '',
      defaultWeekDayDutyLimit: '',
      defaultWeekEndDutyLimit: '',
    };
    this.updateHandle = this.updateHandle.bind(this);
    this.deleteHandle = this.deleteHandle.bind(this);
    this.addHandle = this.addHandle.bind(this);
    this.inputChangeHandle = this.inputChangeHandle.bind(this);

  }

  componentDidMount() {
    this.props.getGroupSettings();
    this.props.getSeniority();
  }

  componentDidUpdate() {
    if (this.props.error) {
      MySwal.fire({
        icon: 'error',
        title: 'İşlem başarısız',
        text: this.props.statusText
      });
      this.setState({ submitted: false });
      this.props.cleanFlagsGroupSettings();
    }
    else if (this.props.crudSuccess) {

      MySwal.fire({
        icon: 'success',
        title: 'Başarılı',
        text: this.props.message,
        showConfirmButton: true

      });
      this.setState({ submitted: false });
      this.props.cleanFlagsGroupSettings();
    }
  }

  inputChangeHandle(event) {

    const target = event.target;

    if (target.name === 'name')
      this.setState({ name: event.target.value, submitted: false });
    if (target.name === 'start')
      this.setState({ start: event.target.value, submitted: false });
    if (target.name === 'finish')
      this.setState({ finish: event.target.value, submitted: false });
    if (target.name === 'defaultWeekDayDutyLimit')
      this.setState({ defaultWeekDayDutyLimit: event.target.value, submitted: false });
    if (target.name === 'defaultWeekEndDutyLimit')
      this.setState({ defaultWeekEndDutyLimit: event.target.value, submitted: false });
  }

  updateGroupSettings(event) {

    const target = event.target;
    let groupSettings = {};

    if (target.name === 'weekday')
      groupSettings.isWeekdayControl = this.refs.weekday.checked;
    if (target.name === 'weekend')
      groupSettings.isWeekendControl = this.refs.weekend.checked;
    if (target.name === 'sequentialOrderLimitCount')
      groupSettings.sequentialOrderLimitCount = parseInt(event.target.value);
    if (target.name === 'locationDayLimit') {
      groupSettings.locationDayLimit = this.refs.locationDayLimit.checked;
    }
    if (target.name === 'locationDayLimitCount')
      groupSettings.locationDayLimitCount = parseInt(event.target.value);


    if (Object.keys(groupSettings).length !== 0) {
      this.props.updateGroupSettings(this.props.groupSettingsId, groupSettings);
    }
  }

  addHandleValidation() {
    let formIsValid = true;
    const { name, start, finish, defaultWeekDayDutyLimit, defaultWeekEndDutyLimit } = this.state;
    if (!name || !start || !finish || !defaultWeekDayDutyLimit || !defaultWeekEndDutyLimit) {
      formIsValid = false;
    }

    if (finish < start) {
      formIsValid = false;
    }

    if (start && start < 0) {
      formIsValid = false;
    }

    if (finish && finish <= 0) {
      formIsValid = false;
    }

    if (defaultWeekDayDutyLimit && defaultWeekDayDutyLimit < 0) {
      formIsValid = false;
    }

    if (defaultWeekEndDutyLimit && defaultWeekEndDutyLimit < 0) {
      formIsValid = false;
    }

    return formIsValid
  }

  updateHandleValidation() {
    let formIsValid = true;
    const { name, start, finish, defaultWeekDayDutyLimit, defaultWeekEndDutyLimit } = this.state;
    if (!name || !start || !finish || !defaultWeekDayDutyLimit || !defaultWeekEndDutyLimit) {
      formIsValid = false;
    }

    if (finish < start) {
      formIsValid = false;
    }

    if (start && start < 0) {
      formIsValid = false;
    }

    if (finish && finish <= 0) {
      formIsValid = false;
    }

    if (defaultWeekDayDutyLimit && defaultWeekDayDutyLimit < 0) {
      formIsValid = false;
    }

    if (defaultWeekEndDutyLimit && defaultWeekEndDutyLimit < 0) {
      formIsValid = false;
    }

    return formIsValid
  }

  updateHandle(event) {
    this.setState({ submitted: true });
    const weekdayCountLimit = parseInt(this.state.weekdayCountLimit);
    const weekendCountLimit = parseInt(this.state.weekendCountLimit);
    if (this.updateHandleValidation()) {
      const start = parseInt(this.state.start);
      const finish = parseInt(this.state.finish);
      const defaultWeekDayDutyLimit = parseInt(this.state.defaultWeekDayDutyLimit);
      const defaultWeekEndDutyLimit = parseInt(this.state.defaultWeekEndDutyLimit);
      const data = {
        name: this.state.name,
        start: start,
        finish: finish,
        defaultWeekDayDutyLimit: defaultWeekDayDutyLimit,
        defaultWeekEndDutyLimit: defaultWeekEndDutyLimit
      };

      this.props.updateSeniority(this.state.id, data);

      this.toggleModal('editModal', null);
      event.preventDefault();
    }
  }

  addHandle(event) {
    this.setState({ submitted: true });
    if (this.addHandleValidation()) {
      const start = parseInt(this.state.start);
      const finish = parseInt(this.state.finish);
      const defaultWeekDayDutyLimit = parseInt(this.state.defaultWeekDayDutyLimit);
      const defaultWeekEndDutyLimit = parseInt(this.state.defaultWeekEndDutyLimit);
      const groupId = helperService.getGroupId();
      const data = {
        name: this.state.name,
        start: start,
        finish: finish,
        defaultWeekDayDutyLimit: defaultWeekDayDutyLimit,
        defaultWeekEndDutyLimit: defaultWeekEndDutyLimit,
        groupId: groupId,
        timeType: 1,
        type: 2
      };

      this.props.createSeniority(data);
      this.toggleModal('addModal', null);
      event.preventDefault();

    }
  }

  deleteHandle(event) {
    if (this.state.id) {
      this.props.deleteGroupSettings(this.state.id)
      this.toggleModal('deleteModal', undefined);
    }
  }

  toggleModal(state, senior) {
    if (senior) {

      this.setState({
        [state]: !this.state[state],
        seniorId: senior.id ? senior.id : '',
        id: senior.id ? senior.id : '',
        name: senior.name ? senior.name : '',
        start: senior.start > -1 ? senior.start : '',
        finish: senior.finish > -1 ? senior.finish : '',
        defaultWeekDayDutyLimit: senior.defaultWeekDayDutyLimit > -1 ? senior.defaultWeekDayDutyLimit : '',
        defaultWeekEndDutyLimit: senior.defaultWeekEndDutyLimit > -1 ? senior.defaultWeekEndDutyLimit : ''
      });
    }
    else {
      this.setState({
        [state]: !this.state[state],
        seniorId: '',
        id: '',
        name: '',
        start: '',
        finish: '',
        defaultWeekDayDutyLimit: '',
        defaultWeekEndDutyLimit: '',
        submitted: false
      });
    }
  };


  render() {
    const { name, start, finish, defaultWeekDayDutyLimit, defaultWeekEndDutyLimit, submitted } = this.state;
    let seniority = <tr><td>Kıdemler yükleniyor...</td></tr>;
    if (this.props.seniority) {
      seniority = this.props.seniority.map((senior) => (
        <tr key={senior.id}>
          <td>{senior.name}</td>
          <td>{senior.start}</td>
          <td>{senior.finish}</td>
          <td>{senior.defaultWeekDayDutyLimit}</td>
          <td>{senior.defaultWeekEndDutyLimit}</td>
          <td className="text-right">
            <UncontrolledDropdown>
              <DropdownToggle className="btn-icon-only text-light" role="button" onClick={e => e.preventDefault()}>
                <i className="fas fa-ellipsis-v" />
              </DropdownToggle>
              <DropdownMenu className="dropdown-menu-arrow" right>
                <DropdownItem style={{ marginLeft: "0px" }} onClick={() => this.toggleModal("editModal", senior)}>Düzenle</DropdownItem>
                <DropdownItem style={{ marginLeft: "0px" }} onClick={() => this.toggleModal("deleteModal", senior)}>Kaldır</DropdownItem>
              </DropdownMenu>
            </UncontrolledDropdown>
          </td>
        </tr>
      ));
    }

    return (<>
      <UserHeader />

      {/* Add Modal */}
      <Modal
        className="modal-dialog-centered"
        isOpen={this.state.addModal}
        toggle={() => this.toggleModal("addModal", undefined)}>
        <div className="modal-header">
          <h5 className="modal-title" id="addModalLabel">Kıdem Ekle</h5>
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
                  <InputGroupText>Tanım:</InputGroupText>
                  <Input name="name" valid={true} type="text" value={this.state.name} maxLength={30} onChange={(event) => this.inputChangeHandle(event)} />
                </InputGroupAddon>
              </InputGroup>
              {submitted && !name &&
                <p style={{ fontSize: 12 }} className="text-warning">Tanım gerekli.</p>
              }

              <InputGroup className="input-group-alternative mb-3">
                <InputGroupAddon addonType="prepend" style={{ width: "100%" }}>
                  <InputGroupText>Başlangıç (Ay):</InputGroupText>
                  <Input name="start" valid={true} type="number" min={0} value={this.state.start} onChange={(event) => this.inputChangeHandle(event)} />
                </InputGroupAddon>
              </InputGroup>
              {submitted && !start &&
                <p style={{ fontSize: 12 }} className="text-warning">Başlangıç gerekli.</p>
              }

              {submitted && start && start < 0 &&
                <p style={{ fontSize: 12 }} className="text-warning">Başlangıç sıfırdan küçük olamaz.</p>
              }

              <InputGroup className="input-group-alternative mb-3">
                <InputGroupAddon addonType="prepend" style={{ width: "100%" }}>
                  <InputGroupText>Bitiş (Ay):</InputGroupText>
                  <Input name="finish" valid={true} type="number" min={0} value={this.state.finish} min={this.state.start} onChange={(event) => this.inputChangeHandle(event)} />
                </InputGroupAddon>
              </InputGroup>
              {submitted && !finish &&
                <p style={{ fontSize: 12 }} className="text-warning">Bitiş gerekli.</p>
              }
              {submitted && finish && finish < start &&
                <p style={{ fontSize: 12 }} className="text-warning">Bitiş Başlangıça eşit ya da büyük olmalı.</p>
              }
              {submitted && finish && finish <= 0 &&
                <p style={{ fontSize: 12 }} className="text-warning">Bitiş sıfırdan küçük olamaz.</p>
              }


              <InputGroup className="input-group-alternative mb-3">
                <InputGroupAddon addonType="prepend" style={{ width: "100%" }}>
                  <InputGroupText>Haftaiçi Nöbet Sayısı:</InputGroupText>
                  <Input name="defaultWeekDayDutyLimit" type="number" min={0} value={this.state.defaultWeekDayDutyLimit} onChange={(event) => this.inputChangeHandle(event)} />
                </InputGroupAddon>
              </InputGroup>
              {submitted && !defaultWeekDayDutyLimit &&
                <p style={{ fontSize: 12 }} className="text-warning">Haftaiçi Nöbet Sayısı gerekli.</p>
              }
              {submitted && defaultWeekDayDutyLimit && defaultWeekDayDutyLimit < 0 &&
                <p style={{ fontSize: 12 }} className="text-warning">Haftaiçi Nöbet Sayısı sıfırdan küçük olamaz.</p>
              }
              <InputGroup className="input-group-alternative mb-3">
                <InputGroupAddon addonType="prepend" style={{ width: "100%" }}>
                  <InputGroupText>Haftasonu Nöbet Sayısı:</InputGroupText>
                  <Input name="defaultWeekEndDutyLimit" type="number" min={0} value={this.state.defaultWeekEndDutyLimit} onChange={(event) => this.inputChangeHandle(event)} />
                </InputGroupAddon>
              </InputGroup>
              {submitted && !defaultWeekEndDutyLimit &&
                <p style={{ fontSize: 12 }} className="text-warning">Haftasonu Nöbet Sayısı gerekli.</p>
              }
              {submitted && defaultWeekEndDutyLimit && defaultWeekEndDutyLimit < 0 &&
                <p style={{ fontSize: 12 }} className="text-warning">Haftasonu Nöbet Sayısı sıfırdan küçük olamaz.</p>
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
          <Button color="primary" type="submit" onClick={this.addHandle}>Kaydet</Button>
        </div>
      </Modal>

      {/* Edit Modal  */}
      <Modal
        className="modal-dialog-centered"
        isOpen={this.state.editModal}
        toggle={() => this.toggleModal("editModal", undefined)}>
        <div className="modal-header">
          <h5 className="modal-title" id="editModalLabel">Kıdem Düzenle</h5>
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
                  <InputGroupText>Tanım:</InputGroupText>
                  <Input name="name" type="text" value={this.state.name} maxLength={30} onChange={(event) => this.inputChangeHandle(event)} />
                </InputGroupAddon>
              </InputGroup>
              {submitted && !name &&
                <p style={{ fontSize: 12 }} className="text-warning">Ad ve soyad gerekli.</p>
              }

              <InputGroup className="input-group-alternative mb-3">
                <InputGroupAddon addonType="prepend" style={{ width: "100%" }}>
                  <InputGroupText>Başlangıç (Ay):</InputGroupText>
                  <Input name="start" type="number" value={this.state.start} min={0} onChange={(event) => this.inputChangeHandle(event)} />
                </InputGroupAddon>
              </InputGroup>
              {submitted && !start &&
                <p style={{ fontSize: 12 }} className="text-warning">Başlangıç gerekli.</p>
              }
              {submitted && start && start < 0 &&
                <p style={{ fontSize: 12 }} className="text-warning">Başlangıç sıfırdan küçük olamaz.</p>
              }


              <InputGroup className="input-group-alternative mb-3">
                <InputGroupAddon addonType="prepend" style={{ width: "100%" }}>
                  <InputGroupText>Bitiş (Ay):</InputGroupText>
                  <Input name="finish" type="number" value={this.state.finish} min={0} onChange={(event) => this.inputChangeHandle(event)} />
                </InputGroupAddon>
              </InputGroup>
              {submitted && !finish &&
                <p style={{ fontSize: 12 }} className="text-warning">Bitiş gerekli.</p>
              }
              {submitted && finish && finish < start &&
                <p style={{ fontSize: 12 }} className="text-warning">Bitiş Başlangıça eşit ya da büyük olmalı.</p>
              }
              {submitted && finish && finish <= 0 &&
                <p style={{ fontSize: 12 }} className="text-warning">Bitiş sıfırdan küçük olamaz.</p>
              }

              <InputGroup className="input-group-alternative mb-3">
                <InputGroupAddon addonType="prepend" style={{ width: "100%" }}>
                  <InputGroupText>Haftaiçi Nöbet Sayısı:</InputGroupText>
                  <Input name="defaultWeekDayDutyLimit" type="number" min={0} value={this.state.defaultWeekDayDutyLimit} onChange={(event) => this.inputChangeHandle(event)} />
                </InputGroupAddon>
              </InputGroup>
              {submitted && !defaultWeekDayDutyLimit &&
                <p style={{ fontSize: 12 }} className="text-warning">Haftaiçi Nöbet Sayısı gerekli.</p>
              }
              {submitted && defaultWeekDayDutyLimit && defaultWeekDayDutyLimit < 0 &&
                <p style={{ fontSize: 12 }} className="text-warning">Haftaiçi Nöbet Sayısı sıfırdan küçük olamaz.</p>
              }
              <InputGroup className="input-group-alternative mb-3">
                <InputGroupAddon addonType="prepend" style={{ width: "100%" }}>
                  <InputGroupText>Haftasonu Nöbet Sayısı:</InputGroupText>
                  <Input name="defaultWeekEndDutyLimit" type="number" min={0} value={this.state.defaultWeekEndDutyLimit} onChange={(event) => this.inputChangeHandle(event)} />
                </InputGroupAddon>
              </InputGroup>
              {submitted && !defaultWeekEndDutyLimit &&
                <p style={{ fontSize: 12 }} className="text-warning">Haftasonu Nöbet Sayısı gerekli.</p>
              }
              {submitted && defaultWeekEndDutyLimit && defaultWeekEndDutyLimit < 0 &&
                <p style={{ fontSize: 12 }} className="text-warning">Haftasonu Nöbet Sayısı sıfırdan küçük olamaz.</p>
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
          <h5 className="modal-title" id="deleteModalLabel">Kıdem Kaldır</h5>
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


      <Container style={{ marginTop: "-12rem" }} fluid className="groupSettings">
        <Row>

          <Col className="order-xl-1" xl="12">
            <Card className="bg-secondary shadow">
              <CardHeader className="bg-white border-0">
                <Row className="align-items-center">
                  <Col xl="9" lg="8" md="8" xs="5" >
                    <h3 className="mb-0">Takvim Ayarları</h3>
                  </Col>
                  <Col className="text-right" xl="3" lg="4" md="4" xs="7">
                    {/* <Button
                      type="button"
                      color="primary"
                      size="sm"
                      onClick={() => this.updateGroupSettings()}
                    >
                      GÜNCELLE
                      </Button> */}
                  </Col>
                </Row>
              </CardHeader>
              <CardBody>

                <div className="pl-lg-4">
                  <Row>
                    <Col lg="6" className="formRow">
                      <Form inline>
                        <Label
                          className="form-control-label mr-sm-2"
                          htmlFor="checkbox-weekday"
                        >
                          Haftaiçi Nöbet Limiti Aktif
                            </Label>
                        <div id="checkbox-weekday" className="pretty p-default p-curve" style={{ marginLeft: "5px", marginBottom: "auto", marginTop: "4px", marginRight: "auto" }} >
                          <input
                            type="checkbox"
                            name="weekday"
                            ref="weekday"
                            onClick={event => this.updateGroupSettings(event)}
                            defaultChecked={this.props.isWeekdayControl}
                          />
                          <div className="state p-success-o">
                            <label></label>
                          </div>
                        </div>
                      </Form>
                    </Col>
                    <Col lg="6">
                      <Form inline>
                        <FormGroup className="mb-2 mr-sm-2 mb-sm-0">

                          <Label
                            className="form-control-label mr-sm-2"
                            htmlFor="checkbox-weekend"
                          >
                            Haftasonu Nöbet Limiti Aktif
                          </Label>
                          <div className="pretty p-default p-curve" style={{ marginLeft: "5px", marginBottom: "auto", marginTop: "4px", marginRight: "auto" }} >
                            <input
                              type="checkbox"
                              name="weekend"
                              ref="weekend"
                              onClick={event => this.updateGroupSettings(event)}
                              defaultChecked={this.props.isWeekendControl}
                            />
                            <div className="state p-success-o">
                              <label></label>
                            </div>
                          </div>

                        </FormGroup>
                      </Form>
                    </Col>

                  </Row>

                  <Row style={{ marginTop: "25px" }}>
                    <Col lg="6" className="formRow">
                      <Form inline>
                        <FormGroup className="mb-2 mr-sm-2 mb-sm-0 ">

                          <Label
                            className="form-control-label mr-sm-2"
                            htmlFor="sequentialOrderLimitCount"
                          >
                            Maksimum Ardışık Nöbet Limiti
                          </Label>
                          <Input id="sequentialOrderLimitCount" className="sequentialOrderLimitCount" bsSize="sm" name="sequentialOrderLimitCount" type="number" min="0" defaultValue={this.props.sequentialOrderLimitCount} onChange={(event) => this.updateGroupSettings(event)} />

                        </FormGroup>
                      </Form>
                    </Col>
                    <Col lg="6">
                      <Form inline>
                        <Label
                          className="form-control-label"
                          htmlFor="checkbox-locationDayLimit"
                        >
                          Maksimum Lokasyon - Gün Limiti
                        </Label>

                        <div id="checkbox-locationDayLimit" className="pretty p-default p-curve" style={{ marginLeft: "5px", marginBottom: "auto", marginTop: "auto", marginRight: "5px" }} >
                          <input
                            type="checkbox"
                            name="locationDayLimit"
                            ref="locationDayLimit"
                            onClick={event => this.updateGroupSettings(event)}
                            defaultChecked={this.props.locationDayLimit}
                          />
                          <div className="state p-success-o">
                            <label></label>
                          </div>
                        </div>
                        <input
                          id="locationDayLimitCount"
                          name="locationDayLimitCount"
                          className="specialInput"
                          type="number"
                          min="0"
                          defaultValue={this.props.locationDayLimitCount}
                          disabled={this.state.locationDayLimit === '' ? !this.props.locationDayLimit : !this.state.locationDayLimit}
                          onChange={(event) => this.updateGroupSettings(event)}
                        />
                      </Form>
                    </Col>
                  </Row>
                </div>
              </CardBody>
            </Card>
          </Col>

        </Row>

        <Row className="mt-4">
          <Col className="order-xl-1" xl="12">
            <Card className="shadow">
              <CardHeader className="border-0">
                <Row className="align-items-center">
                  <Col xl="9" lg="8" md="8" xs="5" >
                    <h3 className="mb-0">Kıdem Ayarları</h3>
                  </Col>
                  <Col className="text-right" xl="3" lg="4" md="4" xs="7">
                    <Button
                      type="button"
                      color="primary"
                      size="sm"
                      onClick={() => this.toggleModal("addModal", undefined)}
                    >
                      Yeni
                    </Button>
                  </Col>
                </Row>
              </CardHeader>
              <Table className="align-items-center table-flush specialTablePrs" >
                <thead className="thead-light" >
                  <tr>
                    <th scope="col">Tanım</th>
                    <th scope="col">Başlangıç (Ay)</th>
                    <th scope="col">Bitiş (Ay)</th>
                    <th scope="col">Haftaiçi Nöbet Sayısı</th>
                    <th scope="col">Haftasonu Nöbet Sayısı</th>
                    <th scope="col" className="text-right">İşlemler</th>
                  </tr>
                </thead>
                <tbody >
                  {seniority}
                  {seniority.length == 0 &&
                    <tr style={{
                      margin: 20,
                      alignSelf: 'center',
                      justifyContent: 'center'
                    }} >
                      <td>
                        <p>Kayıt bulunmamaktadır.</p>
                      </td>
                    </tr>}
                </tbody>
              </Table>
            </Card>
          </Col>
        </Row>
      </Container>

    </>
    );
  };
};

const mapStateToProps = state => {
  return {
    groupSettingsId: state.groupSettings.groupSettingsId,
    isWeekdayControl: state.groupSettings.isWeekdayControl,
    isWeekendControl: state.groupSettings.isWeekendControl,
    seniority: state.groupSettings.seniority,
    sequentialOrderLimitCount: state.groupSettings.sequentialOrderLimitCount,
    locationDayLimit: state.groupSettings.locationDayLimit,
    locationDayLimitCount: state.groupSettings.locationDayLimitCount,
    error: state.groupSettings.error,
    crudSuccess: state.groupSettings.crudSuccess,
    message: state.groupSettings.message,
    statusText: state.groupSettings.statusText
  };
}


const mapDispatchToProps = dispatch => {
  return {
    getGroupSettings: () => dispatch(actions.getGroupSettings()),
    updateGroupSettings: (id, data) => dispatch(actions.updateGroupSettings(id, data)),
    getSeniority: () => dispatch(actions.getSeniority()),
    createSeniority: (data) => dispatch(actions.createSeniority(data)),
    updateSeniority: (id, data) => dispatch(actions.updateSeniority(id, data)),
    deleteGroupSettings: (id) => dispatch(actions.deleteGroupSettings(id)),
    cleanFlagsGroupSettings: () => dispatch(actions.cleanFlagsGroupSettings()),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(GroupSettings);