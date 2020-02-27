import React from "react";

export default class MenuItem extends React.Component {
    constructor(props) {
        super(props);

        this.onClick = this.onClick.bind(this);
    }

    onClick(event) {
        this.props.deletePlayList(this.props.playListID);
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
