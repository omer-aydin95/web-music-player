import React from "react";
import PlayerButton from "./PlayerButton";
import RangeButton from "./RangeButton";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {
    faPlay, faPause, faRandom, faSyncAlt, 
    faChevronLeft, faChevronRight, faVolumeDown
} from "@fortawesome/free-solid-svg-icons";

export default class Player extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            paused: true,
            duration: "0:00",
            currentTime: "0:00"
        }

        this.setPaused = this.setPaused.bind(this);
        this.setVolume = this.setVolume.bind(this);
        this.onLoadedMetadata = this.onLoadedMetadata.bind(this);
        this.onTimeUpdate = this.onTimeUpdate.bind(this);
    }

    setPaused() {
        this.setState(preState => {
            if(!preState.paused) {
                this.audioInPlay.pause();
            } else {
                this.audioInPlay.play();
            }

            return (
                {
                    paused: !preState.paused
                }
            );
        });
    }

    setVolume(newVolume) {
        if(newVolume < 0) {
            newVolume = 0;
        }

        if(newVolume > 1) {
            newVolume = 1;
        }

        this.audioInPlay.volume = newVolume;
    }

    componentDidMount() {
        this.audioInPlay = document.getElementById("audioInPlay");
    }

    formatSeconds(seconds) {
        const h = Math.floor(seconds / 3600);
        const m = Math.floor((seconds % 3600) / 60);
        const s = seconds % 60;

        let result = h > 0 ? (h + ":") : "";
        result += m + ":" + (s.toString().split('.')[0].length == 1 ? ("0" + s.toString().split('.')[0]) : s.toString().split('.')[0]);

        return result;
    }

    onLoadedMetadata(event) {
        this.setState({
            duration: this.formatSeconds(event.target.duration)
        });
    }

    onTimeUpdate(event) {
        this.setState({
            currentTime: this.formatSeconds(event.target.currentTime)
        });
    }

    render() {
        return (
            <div id={this.props.id}>
                <audio id="audioInPlay" onTimeUpdate={this.onTimeUpdate} onLoadedMetadata={this.onLoadedMetadata}>
                    <source src="https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3" />
                </audio>

                <div id="buttons-container">
                    <div>
                        <PlayerButton buttonID="prev-button">
                            <FontAwesomeIcon icon={faChevronLeft} />
                        </PlayerButton>
                    </div>

                    <div>
                        <div>
                            {
                                this.state.paused ? (
                                        <PlayerButton buttonID="play-button" setPaused={this.setPaused}>
                                            <FontAwesomeIcon icon={faPlay} />
                                        </PlayerButton>
                                    ) : (
                                        <PlayerButton buttonID="play-button" setPaused={this.setPaused}>
                                            <FontAwesomeIcon icon={faPause} />
                                        </PlayerButton>
                                    )
                            }
                        </div>

                        <div>
                            <PlayerButton buttonID="shuffle-button">
                                <FontAwesomeIcon icon={faRandom} />
                            </PlayerButton>

                            <PlayerButton buttonID="loop-button">
                                <FontAwesomeIcon icon={faSyncAlt} />
                            </PlayerButton>
                        </div>
                    </div>

                    <div>
                        <PlayerButton buttonID="next-button">
                            <FontAwesomeIcon icon={faChevronRight} />
                        </PlayerButton>
                    </div>
                </div>

                <div id="volume-container">
                    <RangeButton id="volume" playerID={this.props.id} orientation="vertical"
                    setVolume={this.setVolume}>
                        <FontAwesomeIcon icon={faVolumeDown} />
                    </RangeButton>
                </div>

                <div id="seek-container">
                    <div>SoundHelix Song 1</div>

                    <div>
                        <span>{this.state.currentTime}</span>
                        <span>{this.state.duration}</span>
                    </div>
                    
                    <RangeButton id="seek" orientation="horizontal" />
                </div>
            </div>
        );
    }
}
