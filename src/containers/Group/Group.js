import React from "react";
import { connect } from 'react-redux';
import * as actions from '../../store/actions/index';

// reactstrap components
import {
    Modal,
    Button,
    Card,
    CardHeader,
    CardBody,
    FormGroup,
    Form,
    Input,
    InputGroup,
    InputGroupAddon,
    InputGroupText,
    Container,
    Row,
    Col
} from "reactstrap";
import withReactContent from 'sweetalert2-react-content';
import Swal from 'sweetalert2';

import UserHeader from "components/Headers/UserHeader.jsx";
import { helperService } from "../../services";

const MySwal = withReactContent(Swal)

class GroupSettings extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            editModal: false,
            email: this.props.email,
            fullName: "",
            deviceId: "",
            password: "",
            newPassword: "",
            newPasswordAgain: ""
        };
    }


    render() {
        return (<>
            <UserHeader />
        </>
        );
    };
};

export default GroupSettings;