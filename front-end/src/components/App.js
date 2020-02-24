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
        };

        this.myObj = {name: "xlr"};

        this.changeAudio = this.changeAudio.bind(this);
        this.changeCurrentPlayList = this.changeCurrentPlayList.bind(this);
        this.nextOrPrevAudio = this.nextOrPrevAudio.bind(this);
    }

    changeAudio(audio, playNow) {
        this.setState({
            currentAudio: audio,
            currentCoverURL: audio.coverURL,
            playNow: playNow
        });

        this.currentPlayList.audios.forEach(
            (item, index) => {
                if(item._id == audio._id) {
                    this.currentAudioIndex = index;

                    return;
                }            
            }
        );
    }

    changeCurrentPlayList(playList) {
        this.currentPlayList = playList;
        this.currentAudioIndex = -1;
    }

    nextOrPrevAudio(playNext = true) {
        if(playNext) {
            this.currentAudioIndex++;
        } else {
            this.currentAudioIndex--;

            if(this.currentAudioIndex < 0) {
                this.currentAudioIndex = this.currentPlayList.audios.length - 1;
            }
        }

        const nextAudioIndex = (this.currentAudioIndex % this.currentPlayList.audios.length);
        const nextAudio = this.currentPlayList.audios[nextAudioIndex];

        this.setState({
            currentAudio: nextAudio,
            currentCoverURL: nextAudio.coverURL,
            playNow: true
        });

        this.currentAudioIndex = nextAudioIndex;
    }

    render() {
        return (
            <>
                <MainGrid id="main-grid" changeAudio={this.changeAudio} 
                currentAudioID={this.state.currentAudio && this.state.currentAudio._id}
                changeCurrentPlayList={this.changeCurrentPlayList} />

                <AlbumCover id="album-cover" coverURL={this.state.currentCoverURL} />

                <Player id="player" audio={this.state.currentAudio} playNow={this.state.playNow}
                nextOrPrevAudio={this.nextOrPrevAudio} />
            </>
        );
    }
}
