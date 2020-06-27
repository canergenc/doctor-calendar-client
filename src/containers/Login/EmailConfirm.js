import React from "react";
import { connect } from 'react-redux';
import * as actions from '../../store/actions/index';
import 'font-awesome/css/font-awesome.min.css';
import withReactContent from 'sweetalert2-react-content';
import history from "../../hoc/Config/history"
import Swal from 'sweetalert2'

const MySwal = withReactContent(Swal)

import {
    Alert,
    Card,
    CardBody,
    Badge,
    Button,
    Row
} from "reactstrap";

class EmailConfirmPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isConfirmation: false,
            responseData: null,
            email: ''
        };
    }

    handleInputChange = (event) => {
        if (target.name === 'email')
            this.setState({ email: event.target.value });
    }

    componentDidMount() {
        const { key } = this.props.match.params;

        const { email } = this.props.match.params;

        this.setState({ email: email });

        this.props.confirmEmail(key);
    }

    componentDidUpdate() {
        if (this.props.response) {

            MySwal.fire({
                icon: 'success',
                title: 'SÜPER!',
                text: 'Hesabınız doğrulandı.',
                confirmButtonText: 'Tamam'
            });
            
            this.backLogin();
        }
    }

    backLogin() {
        history.push('/auth/login');
    }

    sendLink = async () => {

        this.props.reConfirmEmail(this.state.email);
    }


    render() {

        return (
            <>
                <Card className="bg-secondary shadow border-0">

                    <CardBody className="px-lg-5 py-lg-5">

                        <div className="text-center text-muted mb-4">
                            <h1> <Badge color="light">Hesap Doğrulama</Badge></h1>
                        </div>

                        {this.props.statusText ?
                            <Alert color="danger">
                                Hata:  {this.props.statusText}
                            </Alert>
                            : ''}

                        {this.props.reConfirmStatusText ?
                            <Alert color="danger">
                                Hata:  {this.props.reConfirmStatusText}
                            </Alert>
                            : ''}

                        <Row style={{ justifyContent: 'center' }}>

                            {/* <InputGroup className="input-group-alternative mb-3">
                                <InputGroupAddon addonType="prepend">
                                    <InputGroupText>
                                        <i className="ni ni-email-83" />
                                    </InputGroupText>
                                </InputGroupAddon>
                                <Input name="email" placeholder="Email" type="text" value={this.state.email} onChange={this.handleInputChange} />
                            </InputGroup> */}

                            {
                                this.props.statusCode == 409 &&

                                <Button onClick={this.sendLink} color="primary" color="primary" >
                                    Tekrar Link Gönder
                                </Button>
                            }

                            {
                                this.props.statusCode == 401 &&

                                <Button onClick={this.sendLink} color="primary" color="primary" >
                                    Tekrar Link Gönder
                                </Button>
                            }

                        </Row>
                    </CardBody>
                </Card>
            </>
        );
    }
}

const mapStateToProps = state => {
    return {
        loading: state.confirmEmail.loading,
        statusText: state.confirmEmail.statusText,
        response: state.confirmEmail.response,

        reConfirmLoading: state.confirmEmail.reConfirmLoading,
        reConfirmStatusText: state.confirmEmail.reConfirmStatusText,
        reConfirmResponse: state.confirmEmail.reConfirmResponse,

        reConfirmStatusCode: state.confirmEmail.reConfirmStatusCode,
        statusCode: state.confirmEmail.statusCode,
        confirmSuccess: state.confirmEmail.confirmSuccess
    };
}

const mapDispatchToProps = dispatch => {
    return {
        resetState: () => dispatch(actions.confirmEmailAction.resetState()),
        confirmEmail: (key) => dispatch(actions.confirmEmailAction.confirmEmail(key)),
        reConfirmEmail: (email) => dispatch(actions.confirmEmailAction.reConfirmEmail(email))
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(EmailConfirmPage);