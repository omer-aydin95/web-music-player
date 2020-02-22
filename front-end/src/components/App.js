import React from "react";
import Player from "./Player";
import AlbumCover from "./AlbumCover";

export default class App extends React.Component {
    render() {
        return (
            <>
                <AlbumCover id="album-cover" />
                <Player id="player" />
            </>
        );
    }
}
