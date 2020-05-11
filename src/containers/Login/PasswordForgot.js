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

class PasswordForgotPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            submitted: false,
        };
        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleInputChange(event) {
        this.setState({ submitted: false });
        const target = event.target;
        if (target.name === 'email') {
            this.setState({ email: event.target.value });
        }
    }

    handleValidation() {
        let formIsValid = true;
        const { email } = this.state;
        if (!email) {
            formIsValid = false;
        }

        if (!EmailValidator.validate(email)) {
            formIsValid = false;
        }

        return formIsValid
    }

    handleSubmit(event) {

        event.preventDefault();
        const { email } = this.state;
        this.setState({ submitted: true });
        if (this.handleValidation()) {
            this.props.forgotPassword(email);
        }
    }

    backLogin() {
        history.push('/auth/login');
    }

    
    render() {
        const { email, submitted } = this.state;
        const isEmailValid = EmailValidator.validate(email);
        // this.props.isAuthenticating ?  <Spinner /> :<p>Lütfen bekleyiniz.</p>  

        console.log(this.props.response);


        return (
            <>
                <Col lg="5" md="7">
                    <Card className="bg-secondary shadow border-0">

                        <CardBody className="px-lg-5 py-lg-5">
                            <div className="text-center text-muted mb-4">
                                {/* <small> </small> */}
                                <h1> <Badge color="light">ŞİFREMİ UNUTTUM</Badge></h1>
                            </div>



                            <Form role="form" onSubmit={this.handleSubmit}>

                                <Row style={{ marginBottom: 10 }} >
                                    <Col >
                                        <Label style={{ fontSize: 12 }}>Yeni şifre belirlemek için kayıtlı e-posta adresinizi yazınız.
                                            <br /> Şifre değiştirme linkini e-posta adresinize göndereceğiz. </Label>
                                    </Col>
                                </Row>

                                {submitted && this.props.statusText && !this.props.loading ?

                                    <Alert color="warning">
                                        {this.props.statusText}
                                    </Alert>
                                    : ''}

                                {submitted && this.props.response && !this.props.loading ?

                                    <Alert color="success">
                                        {`${this.state.email} adresine yenileme linki gönderilecektir.`}
                                    </Alert>
                                    : ''}

                                <FormGroup className="mb-3">
                                    <InputGroup className="input-group-alternative">
                                        <InputGroupAddon addonType="prepend">
                                            <InputGroupText>
                                                <i className="ni ni-email-83" />
                                            </InputGroupText>
                                        </InputGroupAddon>
                                        <Input placeholder="Email" type="text" name="email" value={this.state.email} onChange={this.handleInputChange} />

                                    </InputGroup>
                                    {submitted && !email ?
                                        <p style={{ fontSize: 12, marginTop: '1%' }} className="text-warning">Email gerekli.</p>
                                        : null}

                                    {submitted && email && !isEmailValid ?
                                        <p style={{ fontSize: 12, marginTop: '1%' }} className="text-warning">Email formatı uygun değil.</p>
                                        : null}

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
                                        {!this.props.loading && <span>Gönder</span>}
                                    </Button>

                                </Row>

                                {/* <Row>

                                    <Button onClick={this.backLogin} style={{ height: '45px', marginTop: '5px' }} block outline color="light" >

                                        Geri Dön
                                    </Button>

                                </Row> */}



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
        loading: state.passwordForgot.loading,
        statusText: state.passwordForgot.statusText,
        response: state.passwordForgot.response,

    };
}
const mapDispatchToProps = dispatch => {
    return {
        forgotPassword: (email) => dispatch(actions.passwordForgotAction.passwordForgot(email)),
    };
}



export default connect(mapStateToProps, mapDispatchToProps)(PasswordForgotPage);




