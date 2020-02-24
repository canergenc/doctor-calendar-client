import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../../store/actions/index';
import PropTypes from "prop-types";
import ScrollMenu from "react-horizontal-scrolling-menu";

import './Group.css';

// reactstrap components
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

class Group extends Component {

    state = {
        groupId: null,
        alignCenter: true,
        clickWhenDrag: false,
        dragging: true,
        hideArrows: false,
        hideSingleArrow: true,
        scrollToSelected: false,
        selected: "item1",
        translate: 0,
        transition: 0.3,
        wheel: true,
        colors: [
            "primary",
            "success",
            "info",
            "warning",
            "danger"
        ],
        class: [
            "btn-primary",
            "btn-success",
            "btn-info",
            "btn-warning",
            "btn-danger"
        ]
    }

    createMenu = (list, selected) => {
        console.log("create menu");
        let menu = list.map((el, index) => (
            <Button
                outline
                key={el.id}
                color={this.state.colors[index]}
                className={this.state.class[index] & " " & ` ${selected ? "active" : ""}`}
            > {el.name}
            </Button>
        ));
        return menu;
    }

    onUpdate = ({ translate }) => {
        console.log(`onUpdate: translate: ${translate}`);
        this.setState({ translate });
    };

    onSelect = key => {
        console.log(`onSelect: ${key}`);
        this.props.setActiveGroupId(key);

        this.setState({
            selected: key
        });

        const filterData = {
            params:{
                where:{
                    groupId: key
                }
            }
        };
        this.props.getReminders(filterData);
        console.log("activeGroupId:" + this.props.activeGroupId);
    };

    componentDidMount() {
        console.log("[Group] componentDidMount");
        this.props.onInitGroups();
    }

    render() {
        console.log("Groups render");
        const {
            alignCenter,
            clickWhenDrag,
            hideArrows,
            dragging,
            hideSingleArrow,
            scrollToSelected,
            selected,
            translate,
            transition,
            wheel
        } = this.state;

        let scrollMenu = this.props.error ? "Gruplar yüklenemedi" : "Gruplar yükleniyor...";
        if (this.props.groups) {
            let menu = this.createMenu(this.props.groups, this.state.selected);
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
                selected={selected}
                transition={+transition}
                translate={translate}
                wheel={wheel}
            />
        }


        return (
            <div className="group">
                {scrollMenu}
            </div>
        );
    }
}


const mapStateToProps = state => {
    return {
        groups: state.groups.groups,
        activeGroupId: state.groups.activeGroupId,
        error: state.groups.error
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onInitGroups: () => dispatch(actions.initGroups()),
        setActiveGroupId: (groupId) => dispatch(actions.setActiveGroupId(groupId)),
        getReminders: (filterData) => dispatch(actions.getReminders(filterData))
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(Group);