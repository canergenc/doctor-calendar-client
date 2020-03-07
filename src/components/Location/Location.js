import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../../store/actions/index';
import PropTypes from "prop-types";
import ScrollMenu from "react-horizontal-scrolling-menu";

import './Location.css';

import { Button } from "reactstrap";

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
        locationId: null,
        alignCenter: false,
        clickWhenDrag: false,
        dragging: true,
        hideArrows: false,
        hideSingleArrow: true,
        scrollToSelected: false,
        translate: 0,
        transition: 0.3,
        wheel: false
    }

    createMenu = (list, selected) => {
        console.log("create menu");
        let menu = list.map((el, index) => (
            <Button
                outline
                key={el.id}
                color={el.colorCode}
                className={` ${selected === el.id && this.props.activeLocationId !== "" ? "active" : ""}`}
            > {el.name}
            </Button>
        ));
        return menu;
    }

    onSelect = key => {

        console.log(`onSelect: ${key}`);

        this.props.setActiveLocationId(key);
        let locationId = "";

        if (this.state.selected !== key) {
            locationId = key;
            this.setState({
                selected: key
            });
            this.props.setActiveLocationId(key);
        }
        else {
            this.props.setActiveLocationId("");
            locationId = "";
            this.setState({
                selected: ""
            });
        }

        const filterData = {
            filter: {
                where: {
                    locationId: {
                        like: locationId
                    }
                },
                include: [
                    {
                        relation: "location"
                    }
                ]
            }
        }

        this.props.getReminders(filterData);
        console.log("activeLocationId:" + this.props.activeLocationId);
        var myCheckbox = document.getElementsByName("radio");
        Array.prototype.forEach.call(myCheckbox, function (el) {
            el.checked = false;
        });
    };

    componentDidMount() {
        console.log("[Location] componentDidMount");
        this.props.onInitLocations();
    }

    render() {
        console.log("Locations render");
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

        let scrollMenu = this.props.error ? "Gruplar yüklenemedi" : "Gruplar yükleniyor...";
        if (this.props.locations) {
            let menu = this.createMenu(this.props.locations, this.state.selected);
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
                scrollToSelected={scrollToSelected}
                transition={+transition}
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
        activeLocationId: state.locations.activeLocationId,
        error: state.locations.error
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onInitLocations: () => dispatch(actions.initLocations()),
        setActiveLocationId: (locationId) => dispatch(actions.setActiveLocationId(locationId)),
        getReminders: (filterData) => dispatch(actions.getReminders(filterData))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Location);