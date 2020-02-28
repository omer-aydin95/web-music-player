import React from "react";
import AudioDetails from "./AudioDetails";

export default class PlayList extends React.Component {
    render() {
        return (
            <div>
                <div>
                    <span>Title</span>
                    <span>Artist</span>
                    <span>Album</span>
                    <span>Duration</span>
                </div>
                
                {
                    this.props.audios.map(
                        audio => <AudioDetails key={audio._id} audio={audio} changeAudio={this.props.changeAudio}
                        currentAudioID={this.props.currentAudioID} onOffContextMenuForAudio={this.props.onOffContextMenuForAudio} />
                    )
                }
            </div>
        );
    }
}
