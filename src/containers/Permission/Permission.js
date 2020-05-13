import React, { Component } from "react";
import 'font-awesome/css/font-awesome.min.css';
import {
    TabContent, TabPane, Nav, NavItem, NavLink,Container,
    Row,Card
} from "reactstrap";
import UserHeader from "../../components/Headers/UserHeader.jsx";
import WaitingForApprove from "./WaitingForApprove";
import Approved from "./Approved";

class Permission extends Component {
    constructor(props) {
        super(props)
        this.state = {
            activeTab: "1"
        }
    }

    toggle(tab) {
        if (this.state.activeTab !== tab) this.setState({ activeTab: tab })
    }

    render() {
        return (
            <>
                <UserHeader />
                <Container style={{marginTop:"-12rem"}} fluid>
                    {/* Table */}
                    <Row>
                        <div className="col">
                            <Card className="shadow">
                            <div>

                                <Nav  style={{margin:3}} pills>
                                    <NavItem  style={{ fontSize: 16,margin:2 }}  >
                                        <NavLink  style={{ color:this.state.activeTab==='1'?'white':'',cursor:this.state.activeTab==='1'?'default':'pointer' }} className={this.state.activeTab === '1' ? 'active' : ''} onClick={() => { this.toggle('1'); }} >
                                            Yeni Talepler

                                        
                                        </NavLink>
                                    </NavItem>
                                    <NavItem style={{ fontSize: 16 ,margin:2 }} >
                                        <NavLink style={{color:this.state.activeTab==='2'?'white':'',cursor:this.state.activeTab==='2'?'default':'pointer'  }}  className={this.state.activeTab === '2' ? 'active' : ''} onClick={() => { this.toggle('2'); }}>
                                            Onaylananlar
                                            </NavLink>
                                    </NavItem>
                                </Nav>
                            </div>
            
                            <TabContent activeTab={this.state.activeTab}>
                                <TabPane tabId="1">
                                    <WaitingForApprove />
                                </TabPane>
                                <TabPane tabId="2">
                                    <Approved />
                                </TabPane>
                            </TabContent>  
                            </Card>
                        </div>
                    </Row>
                </Container>
            </>
        )
    }
}

export default Permission






