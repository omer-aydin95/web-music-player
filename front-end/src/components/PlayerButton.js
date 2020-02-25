import React from "react";

export default class PlayerButton extends React.Component {
    constructor(props) {
        super(props);
    }

    shouldComponentUpdate(nextProps, nextState) {
        if(this.props.children.key == nextProps.children.key && 
            this.props.shuffleOn == nextProps.shuffleOn && 
            this.props.loopOn == nextProps.loopOn) {
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
        } else if(this.props.buttonID == "shuffle-button") {
            let cssClasses = this.props.shuffleOn ? "player-buttons button-on" : "player-buttons";

            return (
                <button className={cssClasses} id={this.props.buttonID}
                onClick={() => this.props.onOffShuffle()}>
                    {this.props.children}
                </button>
            );
        } else if(this.props.buttonID == "loop-button") {
            let cssClasses = this.props.loopOn ? "player-buttons button-on" : "player-buttons";

            return (
                <button className={cssClasses} id={this.props.buttonID}
                onClick={() => this.props.onOffLoop()}>
                    {this.props.children}
                </button>
            );
        } else {
            return (
                <button className="player-buttons" id={this.props.buttonID}
                onClick={() => this.props.nextOrPrevAudio(this.props.buttonID == "next-button", true)}>
                    {this.props.children}
                </button>
            );
        }
    }
}
