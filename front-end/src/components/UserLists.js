import React from "react";
import List from "./List";

export default class UserLists extends React.Component {
    render() {
        return (
            <div>
                <div>User Lists</div>

                <List listName="Default List" />
                <List listName="My Fav Mix" />
            </div>
        );
    }
}
