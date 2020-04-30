import React, { Component } from 'react';
import moment from "moment";
import { extendMoment } from 'moment-range';
import { constants } from '../../../variables/constants';
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
                <td>{this.props.weekdayCountLimit}</td>
                <td>{this.props.weekendCountLimit}</td>
                <td className="text-right">
                    <UncontrolledDropdown>
                        <DropdownToggle className="text-dark" role="button" onClick={e => e.preventDefault()}>
                            İşlemler
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