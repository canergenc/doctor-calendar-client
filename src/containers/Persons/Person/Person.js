import React, { Component } from 'react';
import moment from "moment/moment";
import { extendMoment } from 'moment-range';

import {
    DropdownMenu,
    DropdownItem,
    UncontrolledDropdown,
    DropdownToggle
} from "reactstrap";

class Person extends Component {
    render() {
        
        const momentRange = extendMoment(moment);

        const workStartDate = moment(this.props.workStartDate).format('YYYY-MM-DD');
        const today = moment(new Date()).format('YYYY-MM-DD');
        const range = momentRange.range(workStartDate, today);

        const year = range.diff('years');
        const month = range.diff('months');
        const monthText = (month > 12 ? month % 12 : month) + " ay";
        const seniority = year + " yıl " + monthText;

        return (
            <tr key={this.props.id}>
                <td>{this.props.fullName}</td>
                <td>{seniority}</td>
                <td>{this.props.email}</td>
                <td>
                    <div className="pretty p-default p-curve" style={{ marginLeft: "5px", marginBottom: "auto", marginTop: "4px", marginRight: "auto" }} >
                        <input
                            type="checkbox"
                            name="weekend"
                            ref={this.props.userGroupId}
                            onChange={this.props.personDayLimitHandle}
                            checked={this.props.defaultChecked}
                        />
                        <div className="state p-danger-o">
                            <label></label>
                        </div>
                    </div>
                </td>
                <td>{this.props.weekdayCountLimit}</td>
                <td>{this.props.weekendCountLimit}</td>
                <td className="text-right">
                    <UncontrolledDropdown>
                        <DropdownToggle className="btn-icon-only text-light" role="button" onClick={e => e.preventDefault()}>
                            <i className="fas fa-ellipsis-v" />
                        </DropdownToggle>
                        <DropdownMenu className="dropdown-menu-arrow" right>
                            <DropdownItem style={{ marginLeft: "0px" }} onClick={this.props.editClick}>Düzenle</DropdownItem>
                            <DropdownItem style={{ marginLeft: "0px" }} onClick={this.props.deleteClick}>Kaldır</DropdownItem>
                        </DropdownMenu>
                    </UncontrolledDropdown>
                </td>
            </tr>
        );
    }
}

export default Person;