import React from "react";

export default class AlbumCover extends React.Component {
    render() {
        return (
            <div id={this.props.id}>
                <img src={this.props.coverURL} />
            </div>
        );
    }
}
