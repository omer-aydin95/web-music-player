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
                
                <AudioDetails />
            </div>
        );
    }
}
