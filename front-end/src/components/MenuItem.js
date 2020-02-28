import React from "react";
import * as audioContextMenuConstants from "../constants/AudioContextMenuConstants";

export default class MenuItem extends React.Component {
    constructor(props) {
        super(props);

        this.onClick = this.onClick.bind(this);
    }
    
    onClick(event) {
        if(this.props.audioID) {
            if(this.props.menuAction == audioContextMenuConstants.DELETE_AUDIO_FROM_LIST) {
                this.props.deleteAudioFromPlayList(this.props.playListID, this.props.audioID);
            } else {
                this.props.addAudioToPlayList(this.props.playListID, this.props.audioID);
            }
        } else {
            this.props.deletePlayList(this.props.playListID);
        }
    }

    render() {
        return (
            <div className={"menu-item " + (this.props.cssClass ? this.props.cssClass : "")}
            onClick={this.onClick}>
                {this.props.children} {this.props.itemName}
            </div>
        );
    }
}
