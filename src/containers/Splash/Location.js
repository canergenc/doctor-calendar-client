import { connect } from 'react-redux';
import { helperService } from '../../services/helper'
import React  from "react";
import * as actions from '../../store/actions/index';

// reactstrap components
import {
    Button,
    Alert,
    Card,
    Badge,
    CardBody,
    FormGroup,
    Form,
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
            locationInput: '',
            listOfLocaiton: [

            ]
        };

        this.handleInputChange = this.handleInputChange.bind(this);
    }

    addItemToLocationList() {
        let lists = this.state.listOfLocaiton;
        lists.push({ id: lists.length + 1, context: this.state.locationInput, modifier: "list-group-item list-group-item-danger" });
        this.setState({ listOfLocaiton: lists });
        this.setState({ locationInput: '' });

    }

    handleInputChange(event) {
        const target = event.target;
        console.log(target);
        this.setState({ locationInput: event.target.value });



    }






    render() {

        return (
            <>





                <div style={{ width: '50%' }}  >


                    
                    <FormGroup>

                        
                        <InputGroup className="input-group-alternative">
                            
                            <InputGroupAddon addonType="prepend">
                                <InputGroupText>
                                    <i className="ni ni-lock-circle-open" />
                                </InputGroupText>
                            </InputGroupAddon>
                            <Input placeholder="Lokasyon" name='locationInput' type="text" value={this.state.locationInput} onChange={this.handleInputChange} />
                            <Button onClick={() => this.addItemToLocationList()} style={{ marginRight: '5%' }} color="primary"> EKLE</Button>{' '}
                        </InputGroup>

                    </FormGroup>

                    <ul className="list-group">
                        {this.state.listOfLocaiton.length > 0 && this.state.listOfLocaiton.map(listitem => (
                            <li key={listitem.id} className={listitem.modifier}>

                                <Row>

                                    <Col xs='8'>
                                        <span className="text-muted">
                                            {listitem.context}
                                        </span>
                                    </Col>

                                    <Col xs='4'>
                                        <Button onClick={(listitem) => this.removeItemToLocationList(listitem)} outline color="danger">SİL</Button>{' '}


                                    </Col>

                                </Row>






                            </li>

                        ))}


                    </ul>



                    {this.state.listOfLocaiton.length > 0 &&

                        <div className="modal-footer">
                            <Button color="primary" type="submit" onClick={this.handleSubmit}> DEVAM ET</Button>
                        </div>


                    }



                </div>



            </>
        );
    }
}

// const mapStateToProps = state => {
//     return {
//         error: state.userGroups.error,



//     };
// }
// const mapDispatchToProps = dispatch => {
//     return {
//         createGroup: (groupName) => dispatch(actions.userGroupActions.createUserGroup(groupName)),
//     };
// }
// export default connect(mapStateToProps, mapDispatchToProps)(LocationSplash);

export default LocationSplash

const textAreaStyles = {
    width: 235,
    margin: 5
};


