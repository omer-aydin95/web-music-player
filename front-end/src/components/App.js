import React from "react";
import Player from "./Player";
import AlbumCover from "./AlbumCover";
import MainGrid from "./MainGrid";

export default class App extends React.Component {
    render() {
        return (
            <>
                <MainGrid id="main-grid" />
                <AlbumCover id="album-cover" />
                <Player id="player" />
            </>
        );
    }
}
