import { connect } from 'react-redux';
import { helperService } from '../../services/helper'
import React from "react";
import * as actions from '../../store/actions/index';
import "../Locations/Locations.scss"

// reactstrap components
import {
    Button,
    Container,
    Label,
    ListGroup,
    ListGroupItem,
    Input,
    InputGroupAddon,
    InputGroupText,
    InputGroup,
    Row,
    Col
} from "reactstrap";

class LocationSplash extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            groupId: '',
            locationInput: '',
            colorCode: '',
            currentIndex: 0,
            listOfLocation: []
        };

        // this.removeItem=this.removeItem.bind(this)
        this.inputChangeHandle = this.inputChangeHandle.bind(this);
        this.saveChanges = this.saveChanges.bind(this);

    }

    addItemToLocationList() {
        let lists = this.state.listOfLocation;
        let currentIndex = this.state.currentIndex;


        if (this.state.locationInput && this.state.locationInput.length > 0) {

            lists.push({ id: lists.length, context: this.state.locationInput, modifier: helperService.getColorName(currentIndex), sortOrder:currentIndex + 1 });
            this.setState({ listOfLocation: lists, locationInput: '', currentIndex: currentIndex + 1 });

        }
    }

    inputChangeHandle(event) {
        const target = event.target;
        if (target.name === 'locationInput')
            this.setState({ locationInput: event.target.value });
        if (target.name === 'colorCode')
            this.setState({ colorCode: event.target.value });
    };


    removeItem(item) {
        let lists = this.state.listOfLocation;
        let currentIndex = this.state.currentIndex;
        const index = lists.indexOf(item);
        if (index > -1) {
            lists.splice(index, 1);
            this.setState({ listOfLocation: lists, locationInput: '' });
        }
    }

    saveChanges() {

        let result = [];
        let list = this.state.listOfLocation;
        list.forEach(loc => {
            let locModel = {
                name: loc.context,
                colorCode: loc.modifier,
                groupId: this.state.groupId
            }
            result.push(locModel);
        });

        this.props.createBulkLocation(result);


    }

    componentDidMount() {
        if (this.props.location.state && this.props.location.state.groupId) {
            this.setState({ groupId: this.props.location.state.groupId });
        }
    }


    render() {

        return (
            <>
                <Container style={{ marginLeft: '30%', marginRight: '30%' }}>
                    <Row>
                        <Col >
                            <Label >Lütfen en az bir lokasyon giriniz</Label>
                        </Col>
                    </Row>
                    <Row >

                        <Col xs="9">
                            <InputGroup className="input-group-alternative">
                                <InputGroupAddon addonType="prepend">
                                    <InputGroupText>
                                        <i className="ni ni-lock-circle-open" />
                                    </InputGroupText>
                                </InputGroupAddon>
                                <Input placeholder="Lokasyon" name='locationInput' type="text" value={this.state.locationInput} onChange={this.inputChangeHandle} />

                            </InputGroup>
                        </Col>
                        <Col xs="3" >
                            <Button onClick={() => this.addItemToLocationList()} style={{ marginRight: '5%' }} color="primary"> EKLE</Button>{' '}
                        </Col>
                    </Row>

                    <Row style={{ marginTop: 5 }}>

                        <Col xs="9">
                            <ListGroup >

                                {this.state.listOfLocation.length > 0 && this.state.listOfLocation.map(listitem => (
                                    <ListGroupItem key={listitem.id} >   {listitem.context}
                                        <Button onClick={() => this.removeItem(listitem)} type="button" close aria-label="Cancel">
                                            <span aria-hidden>&ndash;</span>
                                        </Button>
                                        <div style={{ float: "left" }} >
                                            <label className="radioLabelList" style={{ margin: "0px 10px" }} type="radioLabel" title={listitem.modifier} htmlFor={listitem.modifier}><span type="radioSpan" className={"radioSpanList " + listitem.modifier} ></span></label>
                                        </div>
                                    </ListGroupItem>

                                ))}
                            </ListGroup>
                        </Col>

                        <Col xs="3">
                        </Col>
                    </Row>

                    <Row>
                        <Col xs="9">

                            {this.state.listOfLocation.length > 0 &&


                                <Button disabled={this.props.isRegistiring} className="mt-4 ml-0" onClick={this.saveChanges} type='button'
                                    style={{ height: '45px' }} block

                                    color="primary" >

                                    {this.props.createBulkLocationReqLoading && (
                                        <i
                                            className="fa fa-refresh fa-spin"
                                            style={{ marginRight: "5px" }}
                                        />
                                    )}

                                    {this.props.createBulkLocationReqLoading && <span>Lütfen bekleyin...</span>}
                                    {!this.props.createBulkLocationReqLoading && <span> KAYDET</span>}
                                </Button>


                            }

                        </Col>

                        <Col xs="3">
                        </Col>
                    </Row>
                </Container>
            </>
        );
    }
}

const mapStateToProps = state => {
    return {
        createBulkLocationReqLoading: state.bulkLocation.createBulkLocationReqLoading,
        statusTextAtCreateBulkLocation: state.bulkLocation.statusTextAtCreateBulkLocation,
        responseOnCreateBulkLocation: state.bulkLocation.responseOnCreateBulkLocation,

    };
}


const mapDispatchToProps = dispatch => {
    return {
        createBulkLocation: (listOfLocation) => dispatch(actions.createBulkLocation(listOfLocation)),
    };
}


export default connect(mapStateToProps, mapDispatchToProps)(LocationSplash);






