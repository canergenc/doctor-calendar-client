import React, { Component } from "react";
import { Button, Card, Table, CardFooter, PaginationLink, PaginationItem, Pagination } from "reactstrap";
import { connect } from 'react-redux';
import * as actions from '../../store/actions/index';
import { CalendarTypes, CalendarStatus, constants } from '../../variables/constants';
import 'font-awesome/css/font-awesome.min.css';
import withReactContent from 'sweetalert2-react-content'
import { helperService } from "../../services/helper";
import Swal from 'sweetalert2'
import moment from 'moment';
import { permissionHelper } from "./PermissionHelper";
import CustomPagination from "../Paginations/CustomPagination";


const MySwal = withReactContent(Swal)
class Approved extends Component {
    constructor(props) {
        super(props);
        this.state = {
            currentIndex: 0
        }
        permissionHelper.getApproveFilter = permissionHelper.getApproveFilter.bind(this);
        this.onChangePaginationItem = this.onChangePaginationItem.bind(this);
    }

    loadPermissions() {
        this.props.fetchPermissionRequest(permissionHelper.getApproveFilter(this.state.currentIndex));
        this.props.getCalendarsCount(permissionHelper.getApproveFilter())
    }

    componentDidMount() {
        this.loadPermissions();
    }

    onChangePaginationItem(index) {
        console.log(index);
        this.setState({ currentIndex: index });
        this.props.getCalendarsCount(permissionHelper.getApproveFilter(index));
        this.props.fetchPermissionRequest(permissionHelper.getApproveFilter(index));
    }

    rejectPermission(item) {
        this.props.patchPermisson(permissionHelper.getPermissionRejectFilter(item), permissionHelper.getPermissionRejectData(), permissionHelper.getWaitingForApproveFilter(), permissionHelper.getApproveFilter(this.state.currentIndex));
    }

    render() {

        let result = [];
        if (this.props.reminders) {
            console.log('reminders', this.props.reminders.length);

            console.log('1', this.props);
            let list = this.props.reminders.filter(cal => {
                return (cal.status && cal.calendarGroupId)
            })
            let listOfCalGroupIds = permissionHelper.getUniqGroupIds(list);
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
                startDate = moment(listOfFiltered[0].date).format('DD/MM/YYYY');
                endDate = moment(listOfFiltered[listOfFiltered.length - 1].date).format('DD/MM/YYYY');

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

                        { this.props.calendarsCount > 0 ?
                                <CustomPagination
                                    paginationItemCount={helperService.getPaginationItemCount(4, constants.PAGESIZE_INPERMISSION_PAGE)}
                                    paginationItemClick={(index) => this.onChangePaginationItem(index)}
                                    currentIndex={this.state.currentIndex}
                                /> : null }
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
        errorFromPatch: state.reminders.errorObjBulk,
        calendarsCount: state.reminders.calendarsCount
    }
}

const mapDispatchToProps = dispatch => {
    return {
        getCalendarsCount: (filterData) => dispatch(actions.getRemindersCount(filterData)),
        fetchPermissionRequest: (filterData) => dispatch(actions.fetchApprovedReminders(filterData)),
        patchPermisson: (filter, data, waitingForApproveFilter, approvedFilter) => dispatch(actions.updateBulkReminder(filter, data, waitingForApproveFilter, approvedFilter)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Approved);