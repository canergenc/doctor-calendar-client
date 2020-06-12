import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../../../store/actions/index';
import PropTypes from "prop-types";
import ScrollMenu from "react-horizontal-scrolling-menu";

import '../Locations.scss';

import { Button } from "reactstrap";
import { helperService } from '../../../services';

const Arrow = ({ text, className }) => {
    return <div className={className}>{text}</div>;
};

Arrow.propTypes = {
    text: PropTypes.string,
    className: PropTypes.string
};

export const ArrowLeft = Arrow({ text: "<", className: "arrow-prev" });
export const ArrowRight = Arrow({ text: ">", className: "arrow-next" });

class Location extends Component {

    state = {
        selectedLocations: [],
        locationId: null,
        alignCenter: false,
        clickWhenDrag: false,
        dragging: true,
        hideArrows: true,
        hideSingleArrow: true,
        scrollToSelected: false,
        translate: 0,
        transition: 0.6,
        wheel: true
    }

    createMenu = (list, selectedLocations) => {
        let menu = list.map((el) => (
            <Button
                outline
                key={el.id}
                color={el.colorCode}
                className={`${selectedLocations.includes(el.id) ? "active" : ""}`}
            > {el.name}
            </Button>
        ));

        return menu;
    }


    onUpdate = ({ translate }) => {
        this.setState({ translate });
    };


    onSelect = key => {

        let selectedLocationsArray = [...this.props.selectedLocations];

        if (selectedLocationsArray.includes(key)) {

            var index = selectedLocationsArray.indexOf(key);
            if (index !== -1) {
                selectedLocationsArray.splice(index, 1);
            }
        }
        else {

            selectedLocationsArray = [
                ...selectedLocationsArray,
                key
            ];
        }

        if (selectedLocationsArray) {
            if (selectedLocationsArray.length === 1) {
                this.props.setActiveLocationId(selectedLocationsArray[0]);
            }
            else {
                this.props.setActiveLocationId("");
            }
        }
        else {
            this.props.setActiveLocationId("");
        }

        this.props.getReminders(selectedLocationsArray, this.props.selectedUsers, this.props.curMonth);

    };

    componentDidMount() {
        const filterData = {
            filter: {
                where: {
                    groupId: {
                        like: helperService.getGroupId()
                    }
                }
            }
        }
        this.props.onInitLocations(filterData);
    }

    render() {
        const {
            alignCenter,
            clickWhenDrag,
            hideArrows,
            dragging,
            hideSingleArrow,
            scrollToSelected,
            translate,
            transition,
            wheel
        } = this.state;

        let scrollMenu = this.props.error ? "Lokasyonlar yüklenemedi" : "Lokasyonlar yükleniyor...";
        if (this.props.locations) {
            let menu = this.createMenu(this.props.locations, this.props.selectedLocations);
            scrollMenu = <ScrollMenu
                alignCenter={alignCenter}
                arrowLeft={ArrowLeft}
                arrowRight={ArrowRight}
                clickWhenDrag={clickWhenDrag}
                data={menu}
                dragging={dragging}
                hideArrows={hideArrows}
                hideSingleArrow={hideSingleArrow}
                onSelect={this.onSelect}
                onUpdate={this.onUpdate}
                scrollToSelected={scrollToSelected}
                transition={transition}
                translate={translate}
                wheel={wheel}
            />
        }

        return (
            <div className="location">
                {scrollMenu}
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        locations: state.locations.locations,
        selectedLocations: state.reminders.selectedLocations,
        selectedUsers: state.reminders.selectedUsers,
        activeLocationId: state.locations.activeLocationId,
        curMonth: state.calendar.curMonth,
        groupId: state.auth.groupId,
        error: state.locations.error
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onInitLocations: (filterData) => dispatch(actions.initLocations(filterData)),
        setActiveLocationId: (locationId) => dispatch(actions.setActiveLocationId(locationId)),
        getReminders: (selectedLocations, selectedUsers, curMonth) => dispatch(actions.getReminders(selectedLocations, selectedUsers, curMonth))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Location);