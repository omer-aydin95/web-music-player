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
        let cssClasses = "audio-details";

        if(this.props.currentAudioID == this.props.audio._id) {
            cssClasses += " active";
        }

        return (
            <div className={cssClasses} onClick={this.onClick}>
                <span>{this.props.audio.title}</span>
                <span>{this.props.audio.artist}</span>
                <span>{this.props.audio.album}</span>
                <span>{this.props.audio.duration}</span>
            </div>
        );
    }
}

