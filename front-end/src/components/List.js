import React from "react";

export default class List extends React.Component {
    constructor(props) {
        super(props);

        this.onClick = this.onClick.bind(this);
    }

    onClick(event) {
        this.props.changePlayList(this.props.playList);
    }

    render() {
        let cssClasses = "list";

        if(this.props.currentPlayListID == this.props.playList._id) {
            cssClasses += " active";
        }

        return (
            <div className={cssClasses} onClick={this.onClick}>{this.props.playList.listName}</div>
        );
    }
}
