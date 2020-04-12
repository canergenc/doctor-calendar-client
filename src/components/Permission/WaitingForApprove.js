import React, { Component, useState } from "react";
import { Button, Card, Table, CardHeader, Input, Row, Col, Modal, Form, Label, FormGroup, InputGroup } from "reactstrap";
import { connect } from 'react-redux';
import * as actions from '../../store/actions/index';
import { CalendarTypes, CalendarStatus } from '../../variables/constants';

import moment from "moment";
import { extendMoment } from 'moment-range';

import 'font-awesome/css/font-awesome.min.css';
import withReactContent from 'sweetalert2-react-content'
import { helperService } from "../../services/helper";
import Swal from 'sweetalert2'
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import tr from "date-fns/locale/tr";
import { registerLocale, setDefaultLocale } from "react-datepicker";
registerLocale("tr", tr);





const MySwal = withReactContent(Swal)



class WaitingForApproved extends Component {


    constructor(props) {
        super(props);
        this.state = {
            isOpenCreateModal: false,
            startDate: new Date(),
            permissionType: CalendarTypes.OzelDurum,
            endDate: new Date(),
            description: ''
        }

        this.inputChangeHandle = this.inputChangeHandle.bind(this);
        this.createPermission = this.createPermission.bind(this);

    }

    waitingForApproveFilter = {
        filter: {
            where: {
                and: [{
                    groupId: {
                        like: helperService.getGroupId()
                    }
                }, {
                    type: {
                        neq: CalendarTypes.Nobet
                    },
                    status: CalendarStatus.WaitingForApprove
                }]
            },
            include: [
                {
                    relation: "group"
                },
                {
                    relation: "user"
                },
                {
                    relation: "location"
                }
            ]
        }
    }

    approvedFilter = {
        filter: {
            where: {
                and: [{
                    groupId: {
                        like: helperService.getGroupId()
                    }
                }, {
                    type: {
                        neq: CalendarTypes.Nobet
                    },
                    status: CalendarStatus.Approve
                }]
            },
            include: [
                {
                    relation: "group"
                },
                {
                    relation: "user"
                },
                {
                    relation: "location"
                }
            ]
        }
    }

    loadPermissions() {
        this.props.fetchPermissionRequest(this.waitingForApproveFilter);
    }

    componentDidMount() {
        this.loadPermissions();

    }

    getUniqGroupIds(list) {
        const uniqueTags = [];
        list.map(cal => {
            if (uniqueTags.indexOf(cal.calendarGroupId) === -1) {
                uniqueTags.push(cal.calendarGroupId)
            }
        });

        console.log(uniqueTags);

        return uniqueTags;
    }

    showSwal(filter, data, item) {
        MySwal.fire({
            title: 'Lütfen ret nedenini giriniz',
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
                this.props.patchPermisson(filter, data, this.waitingForApproveFilter, this.approvedFilter)
            }
        })
    }

    approvePermisson(item) {
        const filter = {
            where: {
                calendarGroupId: {
                    like: item.calendarGroupId
                }
            }
        }
        const data = {
            status: CalendarStatus.Approve
        }

        this.props.patchPermisson(filter, data, this.waitingForApproveFilter, this.approvedFilter);
    }

    rejectPermission(item) {
        const filter = {
            where: {
                calendarGroupId: {
                    like: item.calendarGroupId
                }
            }
        }
        const data = {
            status: CalendarStatus.Reject
        }

        this.showSwal(filter, data, item);

        //this.props.patchPermisson(filter, data, this.filterOfGetPermission);

    }

    openCreateModal() {

        this.setState({
            isOpenCreateModal: true
        });

    }

    closeCreateModal() {

        this.setState({
            isOpenCreateModal: false
        });

    }

    createPermission() {

        console.log(this.state);

        const start = moment(this.state.startDate).format("YYYY-MM-DD[T]12:00:00.000[Z]");
        const end = moment(this.state.endDate).format("YYYY-MM-DD[T]12:00:00.000[Z]");
        const userId = this.props.userId;
        const groupId = this.props.groupId;
        const type = this.state.permissionType;
        const description=this.state.description;
        const status = CalendarStatus.WaitingForApprove;

        const guid = (
            helperService.GUID4() +
            helperService.GUID4() +
            helperService.GUID4() +
            helperService.GUID4() +
            helperService.GUID4() +
            helperService.GUID4()
        ).toLowerCase();

        
        const momentRange = extendMoment(moment);
        const range = momentRange.range(start, end);

     

        console.log(range);
        
        const leaveDays = [];
        for (let date of range.by("day")) {
            leaveDays.push({
                userId,
                groupId,
                status,
                date: date.format("YYYY-MM-DD[T]12:00:00.000[Z]"),
                description:description,
                type: type,
                calendarGroupId: guid,
            });

            console.log(leaveDays);

        }
    }


    inputChangeHandle(event) {
        const target = event.target;
        console.log(target.value);
        if (target.name === 'permissionType') {
            this.setState({ permissionType: event.target.value });
        } else if (target.name === "description") {
            this.setState({ description: event.target.value });
        }
    }

    setEndDate(date) {
        console.log(date);
        this.setState({ endDate: date })
    }

    setStartDate(date) {
        console.log(date);
        this.setState({ startDate: date })
    }







    render() {



        let result = [];
        if (this.props.reminders) {

            console.log('1', this.props);
            let list = this.props.reminders.filter(cal => {
                return (cal.status && cal.calendarGroupId)
            })
            let listOfCalGroupIds = this.getUniqGroupIds(list);
            for (let index = 0; index < listOfCalGroupIds.length; index++) {
                const calGroupId = listOfCalGroupIds[index];
                let listOfFiltered = [];
                listOfFiltered = list.filter((i) => {
                    return i.calendarGroupId === calGroupId;
                })
                let startDate = "";
                let endDate = "";

                let numberOfDay = 0
                let email = "";
                let name = "";
                listOfFiltered.map((cal) => (
                    cal.date = new Date(cal.date).toLocaleDateString(),
                    cal.modifiedDate = new Date(cal.date)
                ));
                listOfFiltered.sort((a, b) => (a.modifiedDate > b.modifiedDate) ? 1 : -1);
                startDate = listOfFiltered[0].date;
                endDate = listOfFiltered[listOfFiltered.length - 1].date;

                numberOfDay = listOfFiltered.length;
                email = listOfFiltered[0].user.email;
                name = listOfFiltered[0].user.fullName;

                result.push({ id: index, calendarGroupId: calGroupId, list: listOfFiltered, startDate: startDate, endDate: endDate, numberOfDay: numberOfDay, name: name, email: email });

            }
            console.log(result);
            if (result.length > 0) {
                result = result.map((item) => (
                    <tr key={item.id}>
                        <td>{item.name}</td>
                        <td>{item.email}</td>
                        <td>{item.startDate}</td>
                        <td>{item.endDate}</td>
                        <td>{item.numberOfDay}</td>



                        <td className="text-right">
                            <Button
                                color="warning"
                                onClick={() => this.rejectPermission(item)}
                                size="sm"
                            >
                                İPTAL
                            </Button>
                            <Button
                                color="primary"
                                onClick={() => this.approvePermisson(item)}
                                size="sm"
                            >
                                AKTAR
                      </Button>

                        </td>
                    </tr>
                ));
            }

        }

        return (

            <>

                <Modal
                    className="modal-dialog-centered"
                    isOpen={this.state.isOpenCreateModal}
                    toggle={() => this.toggleModal()}>
                    <div className="modal-header">
                        <h5 className="modal-title" id="addModalLabel">Yeni İzin Girişi</h5>
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
                            <FormGroup>
                                <InputGroup className="input-group-alternative mb-3">

                                    <Label for="exampleEmail" sm={4}>Başalngıç Tarihi</Label>


                                    <Col sm={8}>
                                        <DatePicker
                                            showPopperArrow={false}
                                            name="startDate"
                                            dateFormat="dd/MM/yyyy"
                                            minDate={new Date()}
                                            selected={this.state.startDate}
                                            locale="tr"
                                            onChange={date => this.setStartDate(date)}

                                        />
                                    </Col>



                                </InputGroup>
                                <InputGroup className="input-group-alternative mb-3">

                                    <Label for="exampleEmail" sm={4}>Bitiş Tarihi</Label>

                                    <Col sm={8}>
                                        <DatePicker
                                            showPopperArrow={false}
                                            dateFormat="dd/MM/yyyy"
                                            name="endDate"
                                            minDate={new Date()}
                                            selected={this.state.endDate}
                                            locale="tr"
                                            onChange={date => this.setEndDate(date)}

                                        />
                                    </Col>



                                </InputGroup>
                                <InputGroup className="input-group-alternative mb-3">


                                    <Label for="exampleEmail" sm={4}>İzin Tipi</Label>

                                    <Col sm={8}>
                                        <Input type="select" name="permissionType" value={this.state.permissionType} onChange={this.inputChangeHandle} >
                                            <option value={CalendarTypes.OzelDurum}>Özel Durum</option>
                                            <option value={CalendarTypes.Gebelik}>Gebelik</option>
                                            <option value={CalendarTypes.IdariIzin}>İdari İzin</option>
                                            <option value={CalendarTypes.Rapor}>Rapor</option>

                                        </Input>
                                    </Col>




                                </InputGroup>

                                <InputGroup className="input-group-alternative mb-3">


                                    <Label for="exampleEmail" sm={4}>Açıklama</Label>

                                    <Col sm={8}>
                                        <Input type="text" name="description" value={this.state.description} onChange={this.inputChangeHandle} >

                                        </Input>
                                    </Col>


                                </InputGroup>

                            </FormGroup>

                        </Form>
                    </div>
                    <div className="modal-footer">
                        <Button
                            color="secondary"
                            data-dismiss="modal"
                            type="button"
                            onClick={() => this.closeCreateModal()}>Kapat
                        </Button>
                        <Button color="primary" type="button" onClick={this.createPermission} >Kaydet</Button>
                    </div>
                </Modal>

                <Card className="shadow">
                    <CardHeader className="bg-white border-0">
                        <Row className="align-items-center">
                            <Col xs="9">
                                <Input id="userSearch" placeholder="Ara" onChange={(ev) => this.searchUser(ev.target.value)}></Input>

                            </Col>


                            <Col className="text-right" xs="3">
                                <Button
                                    color="primary"
                                    href="#pablo"
                                    onClick={e => this.openCreateModal()}
                                    size="sm"
                                >
                                    YENİ İZİN OLUŞTUR
                      </Button>
                            </Col>




                        </Row>


                    </CardHeader>

                    <Table className="align-items-center table-flush" responsive>

                        <thead className="thead-light">
                            <tr>
                                <th scope="col">İsim Soyisim</th>
                                <th scope="col">E-Mail</th>
                                <th scope="col">Başlangıç Tarihi</th>
                                <th scope="col">Bitiş Tarihi</th>
                                <th scope="col">Gün Sayısı</th>
                                <th scope="col" />
                            </tr>
                        </thead>
                        <tbody>
                            {result}
                            {result.length == 0 && <div style={{
                                margin: 20,
                                alignSelf: 'center',
                                justifyContent: 'center'
                            }} >
                                <p>
                                    Onay bekleyen kayıt bulunmamaktadır.
                        </p>
                            </div>}
                        </tbody>
                    </Table>
                </Card>
            </>

        )
    }
};

const mapStateToProps = state => {
    return {
        userId: state.auth.userId,
        groupId: state.userInfo.groupId,
        reminders: state.reminders.waitingForApproveReminders,
        loading: state.reminders.waitingForApproveReqLoading,
        errorTextAtFetch: state.reminders.statusTextAtWaitingForApprove,
        errorTextAtPatch: state.reminders.statusTextAtBulkUpdate
    }
}

const mapDispatchToProps = dispatch => {
    return {
        fetchPermissionRequest: (filterData) => dispatch(actions.fetchWaitingForApproveReminders(filterData)),
        patchPermisson: (filter, data, waitingForApproveFilter, approvedFilter) => dispatch(actions.updateBulkReminder(filter, data, waitingForApproveFilter, approvedFilter)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(WaitingForApproved);