import React from "react";

export default class List extends React.Component {
    constructor(props) {
        super(props);

        this.onClick = this.onClick.bind(this);
        this.onContextMenu = this.onContextMenu.bind(this);
    }

    onClick(event) {
        this.props.changePlayList(this.props.playList);
    }

    onContextMenu(event) {
        event.preventDefault();

        if(this.props.playList._id != "all") {
            this.props.onOffContextMenuForPlayList(true, event.clientX, event.clientY, this.props.playList._id);
        } else {
            this.props.onOffContextMenuForPlayList(false);
        }
    }

    render() {
        let cssClasses = "list";

        if(this.props.currentPlayListID == this.props.playList._id) {
            cssClasses += " active";
        }

        return (
            <div onContextMenu={this.onContextMenu} 
            className={cssClasses} onClick={this.onClick}>
                {this.props.playList.listName}
            </div>
        );
    }
}
