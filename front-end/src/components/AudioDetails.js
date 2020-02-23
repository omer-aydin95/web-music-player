import React from "react";

export default class AudioDetails extends React.Component {
    constructor(props) {
        super(props);

        this.onClick = this.onClick.bind(this);
    }

    onClick(event) {
        this.props.changeAudio(this.props.audio, true);
    }

    render() {
        return (
            <div className="audio-details" onClick={this.onClick}>
                <span>{this.props.audio.title}</span>
                <span>{this.props.audio.artist}</span>
                <span>{this.props.audio.album}</span>
                <span>{this.props.audio.duration}</span>
            </div>
        );
    }
}

