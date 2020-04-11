import React, { Component, useState } from "react";
import 'font-awesome/css/font-awesome.min.css';
import {
    TabContent, TabPane, Nav, NavItem, NavLink
} from "reactstrap";
import UserHeader from "components/Headers/UserHeader.jsx";
import "./Permission.scss";
import WaitingForApprove from "../../components/Permission/WaitingForApprove";
import Approved from "../../components/Permission/Approved";

class Permission extends Component {
    constructor(props) {
        super(props)
        this.state = {
            activeTab: "1"
        }
    }

    toggle(tab) {
        if (this.state.activeTab != tab) this.setState({ activeTab: tab })
    }

    render() {
        return (
            <>
                <UserHeader fullName='' />
                <Nav tabs>
                    <NavItem style={{ fontSize: 18 }} >
                        <NavLink className={this.state.activeTab == '1' ? 'active' : ''} onClick={() => { this.toggle('1'); }} >
                            Yeni Talepler
                            </NavLink>
                    </NavItem>
                    <NavItem style={{ fontSize: 18 }} >
                        <NavLink className={this.state.activeTab == '2' ? 'active' : ''} onClick={() => { this.toggle('2'); }}>
                            Onaylananlar
                            </NavLink>
                    </NavItem>
                </Nav>

                <TabContent activeTab={this.state.activeTab}>
                    <TabPane tabId="1">
                        <WaitingForApprove/>
                    </TabPane>
                    <TabPane tabId="2">
                        <Approved />
                    </TabPane>
                </TabContent>
            </>
        )
    }
}

export default Permission






