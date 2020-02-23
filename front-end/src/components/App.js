import React from "react";
import Player from "./Player";
import AlbumCover from "./AlbumCover";
import MainGrid from "./MainGrid";

export default class App extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            currentAudio: null,
            currentCoverURL: null,
            playNow: false
        }

        this.changeAudio = this.changeAudio.bind(this);
    }

    changeAudio(audio, playNow) {
        this.setState({
            currentAudio: audio,
            currentCoverURL: audio.coverURL,
            playNow: playNow
        });
    }

    render() {
        return (
            <>
                <MainGrid id="main-grid" changeAudio={this.changeAudio} />

                <AlbumCover id="album-cover" coverURL={this.state.currentCoverURL} />

                <Player id="player" audio={this.state.currentAudio} playNow={this.state.playNow} />
            </>
        );
    }
}
