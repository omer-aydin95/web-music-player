import React from "react";

export default class PlayerButton extends React.Component {
    render() {
        return (
            <button id={this.props.buttonID}>
                {this.props.children}
            </button>
        );
    }
}
