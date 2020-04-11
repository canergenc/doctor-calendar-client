import React, { Component } from "react";
import {Button,Card,Table,CardFooter,PaginationLink,PaginationItem,Pagination } from "reactstrap";
import { connect } from 'react-redux';
import * as actions from '../../store/actions/index';
import { CalendarTypes, CalendarStatus } from '../../variables/constants';
import 'font-awesome/css/font-awesome.min.css';
import withReactContent from 'sweetalert2-react-content'
import { helperService } from "../../services/helper";
import Swal from 'sweetalert2'


const MySwal = withReactContent(Swal)
class Approved extends Component {
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
        this.props.fetchPermissionRequest(this.approvedFilter);
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

 

    
    rejectPermission(item) {
        const filter = {
            where: {
                calendarGroupId: {
                    like: item.calendarGroupId
                }
            }
        }
        const data = {
            status: CalendarStatus.WaitingForApprove
        }

        this.props.patchPermisson(filter, data, this.waitingForApproveFilter,this.approvedFilter);
        //this.showSwal(filter, data, item);
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
                                ONAY İPTAL
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

        )
    }
};

const mapStateToProps = state => {
    return {
        reminders: state.reminders.approvedReminders,
        loading: state.reminders.bulkUpdateloading,
        errorFromFeth: state.reminders.errorObj,
        errorFromPatch: state.reminders.errorObjBulk
    }
}

const mapDispatchToProps = dispatch => {
    return {
        fetchPermissionRequest: (filterData) => dispatch(actions.fetchApprovedReminders(filterData)),
        patchPermisson: (filter, data, waitingForApproveFilter,approvedFilter) => dispatch(actions.updateBulkReminder(filter, data, waitingForApproveFilter,approvedFilter)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Approved);