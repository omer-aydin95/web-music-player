import React from "react";

export default class PlayerButton extends React.Component {
    constructor(props) {
        super(props);
    }

    shouldComponentUpdate(nextProps, nextState) {
        if(this.props.children.key == nextProps.children.key) {
            return false;
        }

        return true;
    }

    render() {
        return (
            <button className="player-buttons" id={this.props.buttonID}
            onClick={() => this.props.setPaused()}>
                {this.props.children}
            </button>
        );
    }
}
