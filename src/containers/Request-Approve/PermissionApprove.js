import React, { Component } from "react";
import { connect } from 'react-redux';
import * as actions from '../../store/actions';

import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import Checkbox from '@material-ui/core/Checkbox';
import IconButton from '@material-ui/core/IconButton';
// import CommentIcon from '@material-ui/icons/Comment';

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
    Col,
    Row,
    DropdownMenu,
    DropdownItem,
    UncontrolledDropdown,
    DropdownToggle,
    Form,
    Input,
    InputGroup,
    FormGroup
} from "reactstrap";
// core components
import UserHeader from "components/Headers/UserHeader.jsx";
import "./PermissionApprove.scss";


class PermissionApprove extends Component {
    constructor(props) {
        super(props)

    }

    componentDidMount() {

        const filterData = {
            filter: {
                where: {
                    groupId: {
                        like: '5e53975e62398900983c869c'
                    }
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
        this.props.fetchPermissionRequest(filterData);

    }

    getUniqGroupIds(list) {
        const uniqueTags = [];
        list.map(cal => {
            if (uniqueTags.indexOf(cal.calendarGroupId) === -1) {
                uniqueTags.push(cal.calendarGroupId)
            }
        });

        return uniqueTags;
    }


    filter = (tag, calendar) => calendar.filter(cal => cal.calendarGroupId === tag);

    render() {
        let result = [];
        if (this.props.reminders) {
            let list = this.props.reminders.filter(cal => {
                return (cal.status && cal.status == 1 && cal.calendarGroupId)
            })
            let listOfCalGroupIds = this.getUniqGroupIds(list);
            for (let index = 0; index < listOfCalGroupIds.length; index++) {
                const calGroupId = listOfCalGroupIds[index];
                let listOfFiltered = [];
                listOfFiltered = list.filter((i) => {
                    return i.calendarGroupId == calGroupId;
                })
                let startDate = "";
                let endDate = "";
                let strOfDate = "";
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
                strOfDate = startDate + '-' + endDate;
                numberOfDay = listOfFiltered.length;
                email = listOfFiltered[0].user.email;
                name = listOfFiltered[0].user.fullName;

                result.push({ id:index,list: listOfFiltered, startDate: startDate, endDate: endDate, numberOfDay: numberOfDay, name: name, email: email });

            }
            console.log(result);
            if (result.length > 0) {
                result = result.map((r) => (
                    <tr key={r.id}>
                        <td>{r.name}</td>
                        <td>{r.email}</td>
                        <td>{r.startDate}</td>
                        <td>{r.endDate}</td>
                        <td>{r.numberOfDay}</td>

                        
                        <td className="text-right">
                            <Button
                                color="warning"
                                onClick={e => e.preventDefault()}
                                size="sm"
                            >
                                İPTAL
                      </Button>

                            <Button
                                color="primary"
                                onClick={e => e.preventDefault()}
                                size="sm"
                            >
                                ONAYLA
                      </Button>

                        </td>
                    </tr>
                ));
            }

        }



        return (

            <>
                <UserHeader fullName=''/>

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
                                        <div className="col-md-2">
                                            <Button color="primary" type="submit" >
                                                {/* <span className="btn-inner--icon">
                                                    <i className="ni ni-fat-add" />
                                                </span> */}
                                                <span className="btn-inner--text">Tümünü Onayla</span>
                                            </Button>
                                        </div>
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

    };
};

const mapDispatchToProps = dispatch => {
    return {
        fetchPermissionRequest: (filterData) => dispatch(actions.getReminders(filterData))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(PermissionApprove);






