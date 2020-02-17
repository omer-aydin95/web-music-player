import React from "react";
import PlayerButton from "./PlayerButton";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faPlay, faRandom, faSyncAlt, faChevronLeft, faChevronRight} from "@fortawesome/free-solid-svg-icons";

export default class Player extends React.Component {
    render() {
        return (
            <div id="player">
                <div id="buttons-container">
                    <div>
                        <PlayerButton buttonID="prev-button">
                            <FontAwesomeIcon icon={faChevronLeft} />
                        </PlayerButton>
                    </div>

                    <div>
                        <div>
                            <PlayerButton buttonID="play-button">
                                <FontAwesomeIcon icon={faPlay} />
                            </PlayerButton>
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

                <div id="volume-container">volume</div>

                <div id="seek-container">seek</div>
            </div>
        );
    }
}
