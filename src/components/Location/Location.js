import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../../store/actions/index';
import PropTypes from "prop-types";
import ScrollMenu from "react-horizontal-scrolling-menu";
import moment from "moment";

import './Location.css';

import { Button } from "reactstrap";
import { helperService } from '../../services';

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
        alignCenter: true,
        clickWhenDrag: false,
        dragging: true,
        hideArrows: true,
        hideSingleArrow: true,
        scrollToSelected: false,
        translate: 0,
        transition: 0.6,
        wheel: true
    }

    createMenu = (list, selected) => {
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


    onUpdate = ({ translate }) => {
        
        this.setState({ translate });
      };


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
        const startOfMonth = moment(this.props.curMonth).startOf('month').format("YYYY-MM-DD[T]hh:mm:ss.sss[Z]");
        const endOfMonth = moment(this.props.curMonth).endOf('month').format("YYYY-MM-DD[T]hh:mm:ss.sss[Z]");

        const filterData = {
            filter: {
                where: {
                    date: {
                        between: [
                            startOfMonth,
                            endOfMonth
                        ]
                    },
                    locationId: {
                        like: locationId
                    },
                    groupId: {
                        like: helperService.getGroupId()
                    }
                },
                include: [
                    {
                        relation: "group"
                    },
                    {
                        relation: "user"
                    },
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

        let scrollMenu = this.props.error ? "Servisler yüklenemedi" : "Servisler yükleniyor...";
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
                onUpdate={this.onUpdate}
                scrollToSelected={scrollToSelected}
                transition={+transition}
                translate={translate}
                wheel={wheel}
            />
        }

        return (
            <div className="location sticky">
                {scrollMenu}
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        locations: state.locations.locations,
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
        getReminders: (filterData) => dispatch(actions.getReminders(filterData))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Location);