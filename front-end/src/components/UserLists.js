import React from "react";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faPlus} from "@fortawesome/free-solid-svg-icons";
import List from "./List";

export default class UserLists extends React.Component {
    render() {
        return (
            <div>
                <div>
                    User Lists

                    <button onClick={() => {this.props.showDialog()}}>
                        <FontAwesomeIcon icon={faPlus} />
                    </button>
                </div>

                {
                    this.props.playLists.map(
                        (playList) => <List key={playList._id} playList={playList} 
                        changePlayList={this.props.changePlayList} 
                        currentPlayListID={this.props.currentPlayListID}
                        onOffContextMenuForPlayList={this.props.onOffContextMenuForPlayList} />
                    )
                }
            </div>
        );
    }
}
