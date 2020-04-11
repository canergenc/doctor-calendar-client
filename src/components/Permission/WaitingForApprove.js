import React, { Component } from "react";
import { Button, Card, Table } from "reactstrap";
import { connect } from 'react-redux';
import * as actions from '../../store/actions/index';
import { CalendarTypes, CalendarStatus } from '../../variables/constants';
import 'font-awesome/css/font-awesome.min.css';
import withReactContent from 'sweetalert2-react-content'
import { helperService } from "../../services/helper";
import Swal from 'sweetalert2'


const MySwal = withReactContent(Swal)
class WaitingForApproved extends Component {

  
    constructor(props) {
        super(props);

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
                this.props.patchPermisson(filter, data, this.waitingForApproveFilter,this.approvedFilter)
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

        this.props.patchPermisson(filter, data, this.waitingForApproveFilter,this.approvedFilter);
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
            <Card className="shadow">
                {/* <CardHeader className="border-0">
                <div className="row">
                    <div className="col-md-10">
                    </div>
                    
                </div>

            </CardHeader> */}
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
        )
    }
};

const mapStateToProps = state => {
    return {
        reminders: state.reminders.waitingForApproveReminders,
        loading: state.reminders.waitingForApproveReqLoading,
         errorTextAtFetch: state.reminders.statusTextAtWaitingForApprove,
        errorTextAtPatch: state.reminders.statusTextAtBulkUpdate
    }
}

const mapDispatchToProps = dispatch => {
    return {
        fetchPermissionRequest: (filterData) => dispatch(actions.fetchWaitingForApproveReminders(filterData)),
        patchPermisson: (filter, data, waitingForApproveFilter,approvedFilter) => dispatch(actions.updateBulkReminder(filter, data, waitingForApproveFilter,approvedFilter)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(WaitingForApproved);