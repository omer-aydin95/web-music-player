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
        if(this.props.buttonID == "play-button") {
            return (
                <button className="player-buttons" id={this.props.buttonID}
                onClick={() => this.props.setPaused()}>
                    {this.props.children}
                </button>
            );
        } else {
            return (
                <button className="player-buttons" id={this.props.buttonID}
                onClick={() => this.props.nextOrPrevAudio(this.props.buttonID == "next-button")}>
                    {this.props.children}
                </button>
            );
        }
    }
}
