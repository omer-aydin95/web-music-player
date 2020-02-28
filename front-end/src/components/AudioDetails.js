import React from "react";

export default class AudioDetails extends React.Component {
    constructor(props) {
        super(props);

        this.onClick = this.onClick.bind(this);
        this.onContextMenu = this.onContextMenu.bind(this);
    }

    onClick(event) {
        this.props.changeAudio(this.props.audio, true);
    }

    onContextMenu(event) {
        event.preventDefault(); 

        this.props.onOffContextMenuForAudio(true, event.clientX, event.clientY, this.props.audio._id);
    }

    render() {
        let cssClasses = "audio-details";

        if(this.props.currentAudioID == this.props.audio._id) {
            cssClasses += " active";
        }

        return (
            <div className={cssClasses} onClick={this.onClick} onContextMenu={this.onContextMenu}>
                <span>{this.props.audio.title}</span>
                <span>{this.props.audio.artist}</span>
                <span>{this.props.audio.album}</span>
                <span>{this.props.audio.duration}</span>
            </div>
        );
    }
}

