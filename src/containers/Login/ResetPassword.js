import React from "react";
import { connect } from 'react-redux';
import { Link } from "react-router-dom";
import * as actions from '../../store/actions/index';
import 'font-awesome/css/font-awesome.min.css';
import * as EmailValidator from 'email-validator';
import withReactContent from 'sweetalert2-react-content';
import Swal from 'sweetalert2'
const MySwal = withReactContent(Swal)
import history from "../../hoc/Config/history"
import { helperService } from '../../services/helper'

import {
    Button,
    Card,
    CardBody,
    FormGroup,
    Form,
    Input,
    InputGroupAddon,
    InputGroupText,
    InputGroup,
    Row,
    Badge,
    Label,
    Col,
    Alert
} from "reactstrap";

class ResetPasswordPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            password: '',
            rePassword: '',
            submitted: false,
            token: '',
            email: '',

        };
        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    componentDidMount() {

        const { token } = this.props.match.params;
        const { email } = this.props.match.params;
        console.log(token);
        console.log(email);

        
        this.setState({ token: token, email: email });


    }

    handleInputChange(event) {
        this.setState({ submitted: false });
        const target = event.target;
        if (target.name === 'password') {
            this.setState({ password: event.target.value });
        }
        if (target.name === 'rePassword') {
            this.setState({ rePassword: event.target.value });
        }
    }



    handleSubmit(event) {
        debugger;
        event.preventDefault();
        const { password, rePassword, token, email } = this.state;
        this.setState({ submitted: true });
        if (password.length > 7 && password == rePassword) {
            const token = helperService.getToken();  //TOKEN olmayacak
            this.props.resetPassword(email, password, token);
        }
    }

    backLogin() {
        history.push('/auth/login');
    }


    render() {
        const { password, submitted, rePassword,token,email } = this.state;
        return (
            <>

                

                    <Col lg="5" md="7">
                        <Card className="bg-secondary shadow border-0">

                            <CardBody className="px-lg-5 py-lg-5">
                                <div className="text-center text-muted mb-4">
                                    {/* <small> </small> */}
                                    <h1> <Badge color="light">ŞİFRE DEĞİŞTİR</Badge></h1>
                                </div>



                                <Form role="form" onSubmit={this.handleSubmit}>

                                    <Row style={{ marginBottom: 10 }} >
                                        <Col >
                                            <Label style={{ fontSize: 12 }}>Omnicali hesabınızın şifresini değiştirmek üzeresiniz
                                             </Label>
                                        </Col>
                                    </Row>

                                    {submitted && this.props.statusText && !this.props.loading ?

                                        <Alert color="warning">
                                            {this.props.statusText}
                                        </Alert>
                                        : ''}






                                    <FormGroup>
                                        <InputGroup className="input-group-alternative">
                                            <InputGroupAddon addonType="prepend">
                                                <InputGroupText>
                                                    <i className="ni ni-lock-circle-open" />
                                                </InputGroupText>
                                            </InputGroupAddon>
                                            <Input placeholder="Şifre" type="password" name="password" value={this.state.password} onChange={this.handleInputChange} />
                                        </InputGroup>

                                        {submitted && !password ?
                                            <p style={{ fontSize: 12, marginTop: '1%' }} className="text-warning">Şifre gerekli.</p> : null
                                        }

                                        {submitted && password.length < 8 && password.length > 0 ?
                                            <p style={{ fontSize: 12, marginTop: '1%' }} className="text-warning">Şifre 8 karakter olmalı.</p> : null
                                        }

                                    </FormGroup>


                                    <FormGroup className="mb-3">
                                        <InputGroup className="input-group-alternative">
                                            <InputGroupAddon addonType="prepend">
                                                <InputGroupText>
                                                    <i className="ni ni-lock-circle-open" />
                                                </InputGroupText>
                                            </InputGroupAddon>
                                            <Input placeholder="Şifre tekrar" type="password" name="rePassword" value={this.state.rePassword} onChange={this.handleInputChange} />

                                        </InputGroup>
                                        {/* {submitted && !rePassword ?
                                        <p style={{ fontSize: 12, marginTop: '1%' }} className="text-warning">Şifre gerekli.</p> : null
                                    } */}

                                        {/* {submitted && rePassword.length < 8 && rePassword.length > 0 ?
                                        <p style={{ fontSize: 12, marginTop: '1%' }} className="text-warning">Şifre 8 karakter olmalı.</p> : null
                                    } */}

                                        {submitted && rePassword != password ?
                                            <p style={{ fontSize: 12, marginTop: '1%' }} className="text-warning">Girmiş olduğunuz şifreler aynı değil!</p> : null
                                        }

                                    </FormGroup>



                                    <Row>

                                        <Button type='submit' style={{ height: '45px' }} block color="primary" >

                                            {this.props.loading && (
                                                <i
                                                    className="fa fa-refresh fa-spin"
                                                    style={{ marginRight: "5px" }}
                                                />
                                            )}

                                            {this.props.loading && <span>Lütfen bekleyin...</span>}
                                            {!this.props.loading && <span>Şifre Değiştir</span>}
                                        </Button>

                                    </Row>




                                </Form>
                            </CardBody>
                        </Card>

                    </Col>
                


            </>
        );
    }
}


const mapStateToProps = state => {
    return {
        loading: state.resetPassword.loading,
        statusText: state.resetPassword.statusText,
        response: state.resetPassword.response,

    };
}
const mapDispatchToProps = dispatch => {
    return {
        resetPassword: (email, password, token) => dispatch(actions.resetPasswordAction.resetPassword(email, password, token)),
    };
}



export default connect(mapStateToProps, mapDispatchToProps)(ResetPasswordPage);




