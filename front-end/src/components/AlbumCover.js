import React from "react";

export default class AlbumCover extends React.Component {
    render() {
        return (
            <div id={this.props.id}>
                <img src="https://upload.wikimedia.org/wikipedia/commons/6/6e/No_Copyright_Sounds_logo.jpg" />
            </div>
        );
    }
}
