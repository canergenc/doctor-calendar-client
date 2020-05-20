import React, { Component } from "react";
import { Button, Card, Table, CardHeader, Input, Alert, CardFooter, Row, Col } from "reactstrap";
import { connect } from 'react-redux';
import * as actions from '../../store/actions/index';
import { CalendarStatus, constants } from '../../variables/constants';
import 'font-awesome/css/font-awesome.min.css';
import withReactContent from 'sweetalert2-react-content'
import { helperService } from "../../services/helper";
import Swal from 'sweetalert2'
import moment from 'moment/moment';
import { permissionHelper } from "./PermissionHelper";
import CustomPagination from "../../components/Paginations/CustomPagination";
// import ToastServive from 'react-material-toast';

// const toast = ToastServive.new({
//     place: 'topRight',
//     duration: 3,
//     maxCount: 10,
//     closable: false
// })

const MySwal = withReactContent(Swal)
class Approved extends Component {
    constructor(props) {
        super(props);
        this.state = {
            currentIndex: 0,
            listOfPermission: [],
            searchParam: "",
            searchSubmitted: false,
            isShowPagination: true
        }
        permissionHelper.getApprovedFilter = permissionHelper.getApprovedFilter.bind(this);
        this.onChangePaginationItem = this.onChangePaginationItem.bind(this);
        this.getPermissionsBySearch = this.getPermissionsBySearch.bind(this);
        this.inputChangeHandle = this.inputChangeHandle.bind(this);
        this.refreshPermissions = this.refreshPermissions.bind(this);
        this.keyPress = this.keyPress.bind(this);


    }



    inputChangeHandle(event) {
        const target = event.target;
        if (target.name === "searchPermission") {
            this.setState({ searchParam: event.target.value });
        }
    }

    loadPermissions() {
        this.props.getApprovedPermissions(permissionHelper.getApprovedFilter(this.state.currentIndex));
        this.props.getCalendarsCount(permissionHelper.getApprovedCountFilter())
    }

    componentDidMount() {
        this.loadPermissions();
    }


    onChangePaginationItem(index) {
        this.setState({ currentIndex: index });
        this.props.getCalendarsCount(permissionHelper.getApprovedCountFilter());
        this.props.getApprovedPermissions(permissionHelper.getApprovedFilter(index));
    }


    revokePermission(item) {
        const filterOfWaitingFor = permissionHelper.getWaitingForApproveFilter(0);
        const filterOfApproved = permissionHelper.getApprovedFilter(0);
        const data = {
            status: CalendarStatus.WaitingForApprove
        }

        this.props.updatePermission(item.id, data, filterOfWaitingFor, filterOfApproved)
    }


    getPermissionsBySearch() {
        if (this.state.searchParam) {
            this.props.getApprovedPermissions(permissionHelper.getApprovedSearchFilter(this.state.searchParam));
            this.setState({ isShowPagination: false, currentIndex: 0,searchSubmitted:true })
        } else {
            this.refreshPermissions();
            this.setState({ isShowPagination: true, currentIndex: 0,searchSubmitted:false })
        }
    }

    keyPress(e) {
        console.log(e.keyCode);
        if (e.keyCode == 13) {
            if (e.target.value) {
                this.props.getApprovedPermissions(permissionHelper.getApprovedSearchFilter(e.target.value));
                this.setState({ isShowPagination: false, currentIndex: 0,searchSubmitted:true })
            } else {
                this.refreshPermissions();
                this.setState({ isShowPagination: true, currentIndex: 0,searchSubmitted:false })

            }
        }
    }


    refreshPermissions() {
        this.setState({ searchParam: "" });
        this.props.getApprovedPermissions(permissionHelper.getApprovedFilter(0));


    }

    render() {




        if (this.props.approvedPermissions) {
            console.log(this.props.approvedPermissions);
            
            this.state.listOfPermission = this.props.approvedPermissions;
            this.state.listOfPermission = this.state.listOfPermission.map((p) => (
                <tr key={p.id}>
                    <td>{p.user.fullName}</td>
                    <td>{p.user.email}</td>
                    <td>{moment(p.startDate).format('DD/MM/YYYY')}</td>
                    <td>{moment(p.endDate).format('DD/MM/YYYY')}</td>
                    <td>{p.description ? p.description : "Açıklama girilmedi."}</td>
                    <td className="text-right">
                        <Button
                            color="warning"
                            onClick={() => this.revokePermission(p)}
                            size="sm"
                        >
                            ONAYI İPTAL ET
                            </Button>

                    </td>
                </tr>
            ));
        }



        return (
            <Card className="shadow">



                <CardHeader style={{ paddingLeft: '0.5rem' }} className="border-0">
                    <Row className="align-items-center">
                        <Col xl="12" lg="12" md="12" sm="12"  xs="12">
                            <Input name="searchPermission" className="searchPermission" style={{ display: "inline-block" }} onKeyDown={this.keyPress} value={this.state.searchParam} placeholder="Bir şeyler yazın ..." onChange={(event) => this.inputChangeHandle(event)}></Input>
                            <Button
                                color="secondary"
                                onClick={e => this.getPermissionsBySearch()}
                                size="lg"
                                style={{ display: "inline-block" }}
                            >
                                <i className="fas fa-search fa-lg"></i>
                            </Button>

                            <Button
                                color="secondary"

                                onClick={e => this.refreshPermissions()}
                                size="lg"
                                style={{ display: "inline-block" }}
                            >
                                <i className="fas fa-sync-alt fa-lg"></i>
                            </Button>
                        </Col>

                    </Row>
                </CardHeader>



                <Table className="align-items-center table-flush specialTable" >
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
                        {this.state.listOfPermission}
                        {this.state.listOfPermission.length == 0 && <div style={{
                            margin: 20,
                            alignSelf: 'center',
                            justifyContent: 'center'
                        }} >
                            <p>
                                Onaylanan kayıt bulunmamaktadır.
                        </p>
                        </div>}
                    </tbody>
                </Table>
                <CardFooter className="py-4">
                    {this.props.permissionCount > 0 ?
                        <nav style={{ float: "right" }}>

                            <div style={{ float: "left", margin: "6px 18px" }}>

                                Toplam : {this.props.permissionCount}
                            </div>
                            {
                                this.state.isShowPagination && <CustomPagination
                                    paginationItemCount={helperService.getPaginationItemCount(this.props.permissionCount, constants.PAGESIZE_INPERMISSION_PAGE)}
                                    paginationItemClick={(index) => this.onChangePaginationItem(index)}
                                    currentIndex={this.state.currentIndex}
                                />
                            }

                        </nav>
                        : null}
                </CardFooter>
            </Card>

        )
    }
};



const mapStateToProps = state => {
    return {
        getApprovedPermissionReqLoading: state.permission.getApprovedPermissionReqLoading,
        approvedPermissions: state.permission.responseOnGetApprovedPermission,
        errorMessageAtGet: state.permission.statusTexAtGet,
        permissionCount: state.reminders.calendarsCount,
        statusTexAtGetApproved: state.permission.statusTexAtGetApproved,
    }
}

const mapDispatchToProps = dispatch => {
    return {
        updatePermission: (id, data, filterOfWaitingFor, filterOfApproved) => dispatch(actions.permission.updatePermission(id, data, filterOfWaitingFor, filterOfApproved)),
        getCalendarsCount: (filterData) => dispatch(actions.getRemindersCount(filterData)),
        getApprovedPermissions: (params) => dispatch(actions.permission.getApprovedPermissions(params)),
        patchPermisson: (filter, data, waitingForApproveFilter, approvedFilter) => dispatch(actions.updateBulkReminder(filter, data, waitingForApproveFilter, approvedFilter)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Approved);