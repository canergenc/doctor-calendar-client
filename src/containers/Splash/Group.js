import { connect } from 'react-redux';
import { helperService } from '../../services/helper'
import React from "react";
import history from "../../hoc/Config/history";
// reactstrap components
import {
    Button,
    Card,
    Badge,
    CardBody,
    FormGroup,
    Form,
    Input,
    InputGroupAddon,
    InputGroupText,
    InputGroup,
    Col
} from "reactstrap";
import * as actions from '../../store/actions/index';
import withReactContent from 'sweetalert2-react-content';
import Swal from 'sweetalert2';
const MySwal = withReactContent(Swal);



class GroupSplash extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            groupName: helperService.generateRndStr(10),
            
        };
        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    handleInputChange(event) {
        const target = event.target;
        if (target.name === 'groupName') {
            this.setState({ groupName: event.target.value });
        }
    }
    handleSubmit(event) {

       
        const { groupName } = this.state;
        if (groupName) {
            this.props.createGroup(groupName);
        } else {
            this.props.createGroup(null);
        }
        event.preventDefault();

    }


    handleCanceled = () => {
        console.log("opps");
        this.props.createGroup(null);
    }

    componentDidMount() {
        console.log(this.props);
    }


    showSwal() {
        MySwal.fire({
            icon: 'error',
            title: 'Hay aksi,',
            text: this.props.statusTextAtCreateUserGroup,

            confirmButtonText: 'Tamam',
            showLoaderOnConfirm: true,
            allowOutsideClick: () => !Swal.isLoading()
        }).then((result) => {
            console.log(result);
            this.setState({ submitted: false });

        })
    }



    render() {

       


        return (
            <>
                <Col lg="6" md="8">
                    <Card className="bg-secondary shadow border-0">

                        <CardBody >
                            <div className="text-center text-muted mb-4">
                                <h2> <Badge color="light" style={{ textTransform: 'none' }} >Grup adını düzenleyebilirsiniz,Örn: Pediatri Grubu</Badge></h2>
                            </div>


                            <Form role="form" onSubmit={this.handleSubmit}>
                                <FormGroup>
                                    <InputGroup className="input-group-alternative mb-3">
                                        <InputGroupAddon addonType="prepend">
                                            <InputGroupText>
                                                <i className="chart-pie-35" />
                                            </InputGroupText>
                                        </InputGroupAddon>
                                        <Input placeholder="Grup Adı" name="groupName" type="text" value={this.state.groupName} onChange={this.handleInputChange} />
                                    </InputGroup>

                                </FormGroup>
                                <div className="modal-footer">


                                    <Button disabled={this.props.isRegistiring} onClick={this.handleSubmit} type='button' color="primary" >

                                        {this.props.createUserGroupReqLoading && (
                                            <i
                                                className="fa fa-refresh fa-spin"
                                                style={{ marginRight: "5px" }}
                                            />
                                        )}

                                        {this.props.createUserGroupReqLoading && <span>Lütfen bekleyin...</span>}
                                        {!this.props.createUserGroupReqLoading && <span>DEVAM ET</span>}
                                    </Button>

                                    {/* <Button color="primary" type="submit" onClick={this.handleSubmit}> DEVAM ET</Button> */}
                                </div>
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
        responseOnCreateUserGroup: state.userGroups.responseOnCreateUserGroup,
        statusTextAtCreateUserGroup: state.userGroups.statusTextAtCreateUserGroup,
        createUserGroupReqLoading: state.userGroups.createUserGroupReqLoading,
        token: state.auth.token,
        groupId: state.userGroups.groupId
    };
}
const mapDispatchToProps = dispatch => {
    return {
        createGroup: (groupName) => dispatch(actions.userGroupActions.createUserGroup(groupName)),
    };
}
export default connect(mapStateToProps, mapDispatchToProps)(GroupSplash);


