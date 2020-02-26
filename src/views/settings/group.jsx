import React, { Component } from "react";
// Omitted
import Api from '../../api';
// reactstrap components
import {
    Badge,
    Card,
    CardHeader,
    CardFooter,
    DropdownMenu,
    DropdownItem,
    UncontrolledDropdown,
    DropdownToggle,
    Media,
    Pagination,
    PaginationItem,
    PaginationLink,
    Progress,
    Table,
    Container,
    Row,
    UncontrolledTooltip
} from "reactstrap";
// core components
import UserHeader from "components/Headers/UserHeader.jsx";


class Group extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: [],
        };
        //this.renderTableData = this.renderTableData.bind(this);
    }
    renderTableData() {
        Api.get('groups').then(res => {
            this.setState({
                data: res.data
            });
            console.log(this.state.data);
            return res.data.map((item, index) => {
                return (
                    <tr key={item.id}>
                        <td>{item.name}</td>
                        <td>***</td>
                    </tr>
                )
            });
        }).catch(ex => {
            alert(ex);
        })
    }
    render() {
        return (
            <>
                <UserHeader />
                {/* Page content */}
                <Container className="mt--7" fluid>
                    {/* Table */}
                    <Row>
                        <div className="col">
                            <Card className="shadow">
                                <CardHeader className="border-0">
                                    <h3 className="mb-0">Grup Listesi</h3>
                                </CardHeader>
                                <Table className="align-items-center table-flush" responsive >
                                    <thead className="thead-light">
                                        <tr>
                                            <th scope="col">Adı</th>
                                            <th scope="col">Bağlı Olduğu Grup</th>
                                            <th scope="col" />
                                        </tr>
                                    </thead>
                                    <tbody>

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
        );
    }
}

export default Group;
