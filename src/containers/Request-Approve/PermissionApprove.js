import React, { Component } from "react";
import { connect } from 'react-redux';
import * as actions from '../../store/actions';
import Spinner from '../../components/UI/Spinner/Spinner';
import { CalendarTypes, CalendarStatus } from '../../variables/constants';
import 'font-awesome/css/font-awesome.min.css';
import withReactContent from 'sweetalert2-react-content'
// import CommentIcon from '@material-ui/icons/Comment';

// reactstrap components
import {
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
} from "reactstrap";
// core components
import UserHeader from "components/Headers/UserHeader.jsx";
import "./PermissionApprove.scss";
import { helperService } from "../../services";
import Swal from 'sweetalert2'


const MySwal = withReactContent(Swal)

class PermissionApprove extends Component {



    filterOfInitialLoad = {
        filter: {
            where: {
                and: [{
                    groupId: {
                        like: helperService.getGroupId()
                    }
                }, {
                    type: {

                        neq: CalendarTypes.Nobet  //Type göre gruplandırılabilir.
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

    loadPermissions() {
        this.props.fetchPermissionRequest(this.filterOfInitialLoad);
    }

    componentDidMount() {
        this.loadPermissions();
    }


    showSwal(filter,data,item) {
        MySwal.fire({
            title: 'Lütfen red nedenini giriniz',
            input: 'text',
            inputAttributes: {
                autocapitalize: 'off'
            },
           
            confirmButtonText: 'Kaydet',
            cancelButtonText:'iptal',
            showCancelButton: true,
            showLoaderOnConfirm: true,
            allowOutsideClick: () => !Swal.isLoading()
        }).then((result) => {
            if (result.value) {
               this.props.patchPermisson(filter,data,this.filterOfInitialLoad)
            }
        })
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

        this.props.patchPermisson(filter, data, this.initialPageLoadFilter);
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

        this.showSwal(filter,data,item);

        //this.props.patchPermisson(filter, data, this.filterOfGetPermission);

    }





    render() {

        let result = [];
        if (this.props.reminders) {

            console.log('1', this.props);
            let list = this.props.reminders.filter(cal => {
                return (cal.status &&  cal.calendarGroupId)
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

                        {/* <td className="text-right"> */}

                        {/* <Button onClick={() => this.rejectPermission(item)} size="sm" color="warning" disabled={this.props.loading}>

                                {this.props.loading && (
                                    <i
                                        className="fa fa-refresh fa-spin"
                                        style={{ marginRight: "5px" }}
                                    />
                                )}

                                {this.props.loading && <span>...</span>}
                                {!this.props.loading && <span>REDDET</span>}
                            </Button>

                            <Button onClick={() => this.approvePermisson(item)} size="sm" color="primary" disabled={this.props.loading}>

                                {this.props.loading && (
                                    <i
                                        className="fa fa-refresh fa-spin"
                                        style={{ marginRight: "5px" }}
                                    />
                                )}

                                {this.props.loading && <span>...</span>}
                                {!this.props.loading && <span>ONAYLA</span>}
                            </Button>

                        </td> */}


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
                                ONAYLA
                      </Button>

                        </td>
                    </tr>
                ));
            }

        }

        // if (this.props.errorFromPatch) {
        //     console.log('asdasdasd', this.props.errorFromPatch);

        // }









        return (

            <>

                {/* {this.props.loading ?<Spinner />:null} */}


                <UserHeader fullName='' />

                <Container className="mt--7" fluid>
                    {/* Table */}
                    <Row>
                        <div className="col">
                            <Card className="shadow">
                                <CardHeader className="border-0">
                                    <div className="row">
                                        <div className="col-md-10">
                                            {/* <h3 className="mb-0">İzin Onay</h3> */}
                                        </div>
                                        {/* <div className="col-md-2">
                                            <Button color="primary" type="submit" >
            
                                                <span className="btn-inner--text">Tümünü Onayla</span>
                                            </Button>
                                        </div> */}
                                    </div>

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
                                        {result.length==0 && <div style={{
                                            margin:20,
                                        alignSelf:'center',
                                        justifyContent:'center'}} >
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
                        </div>
                    </Row>
                </Container>


            </>


        )

    }


}

const mapStateToProps = state => {
    return {
        reminders: state.reminders.reminders,
        loading: state.reminders.loading,
        errorFromFeth: state.reminders.errorObj,
        errorFromPatch: state.reminders.errorObjBulk



    };
};

const mapDispatchToProps = dispatch => {
    return {
        fetchPermissionRequest: (filterData) => dispatch(actions.getReminders(filterData)),
        patchPermisson: (filter, data, filterOfGetPermission) => dispatch(actions.updateBulkReminder(filter, data, filterOfGetPermission)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(PermissionApprove);






