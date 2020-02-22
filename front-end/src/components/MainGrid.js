import React from "react";
import UserLists from "./UserLists";
import PlayList from "./PlayList";

export default class MainGrid extends React.Component {
    render() {
        return (
            <div id={this.props.id}>
                <UserLists />

                <PlayList />
            </div>
        );
    }
}
