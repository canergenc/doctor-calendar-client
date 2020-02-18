import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../../store/actions/index';

// reactstrap components
import {
    DropdownMenu,
    DropdownItem,
    UncontrolledDropdown,
    DropdownToggle,
    Media
} from "reactstrap";


class Location extends Component {

    componentDidMount() {
        this.props.onInitLocations();
    }

    changeActiveLocation(e){

    }

    render() {
        
        let locations = <DropdownItem className="noti-title" key="nothing"></DropdownItem>;
        let activeLocationName = this.props.error ? "Lokasyonlar yüklenemedi" : "Lokasyonlar yükleniyor...";
        if (this.props.locations) {

            locations = this.props.locations.map((location) => (
                <DropdownItem className="noti-title" key={location.id} onClick={this.changeActiveLocation}>
                    {location.name}
                </DropdownItem>
            ));
        }

        if (this.props.activeLocationName) {
            activeLocationName = this.props.activeLocationName;
        }

        return (
            <UncontrolledDropdown nav>
                <DropdownToggle className="pr-0" nav>
                    <Media className="align-items-center">
                        <span className="mb-0 text-md font-weight-bold">
                            {activeLocationName}
                        </span>
                    </Media>
                </DropdownToggle>
                <DropdownMenu className="dropdown-menu-arrow" right>
                    {locations}
                </DropdownMenu>
            </UncontrolledDropdown>
        );
    }
}


const mapStateToProps = state => {
    return {
        locations: state.locations.locations,
        activeLocationName: state.locations.activeLocationName,
        error: state.locations.error
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onInitLocations: () => dispatch(actions.initLocations())
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(Location);