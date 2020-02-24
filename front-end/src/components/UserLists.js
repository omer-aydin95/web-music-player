import React from "react";
import List from "./List";

export default class UserLists extends React.Component {
    render() {
        return (
            <div>
                <div>User Lists</div>

                {
                    this.props.playLists.map(
                        (playList) => <List key={playList._id} playList={playList} 
                        changePlayList={this.props.changePlayList} 
                        currentPlayListID={this.props.currentPlayListID} />
                    )
                }
            </div>
        );
    }
}
