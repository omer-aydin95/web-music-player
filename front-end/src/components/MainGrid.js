import React from "react";
import UserLists from "./UserLists";
import PlayList from "./PlayList";
import * as playListAPI from "../api-endpoints/PlayListAPI";
import responseConstants from "../constants/ResponseConstants";
import ContextMenu from "./ContextMenu";
import MenuItem from "./MenuItem";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faTimes, faPlus, faCheck} from "@fortawesome/free-solid-svg-icons";

export default class MainGrid extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            playLists: [],
            currentPlayList: null,
            currentAudios: [],
            showPlayListCMD: false,
            showAudioCMD: false,
            top: "0px",
            left: "0px",
            playListID: null
        };

        this.changePlayList = this.changePlayList.bind(this);
        this.onOffContextMenuForPlayList = this.onOffContextMenuForPlayList.bind(this);
        this.deletePlayList = this.deletePlayList.bind(this);

        window.onclick = () => {this.onOffContextMenuForPlayList(false)};
    }

    changePlayList(newPlayList) {
        if(newPlayList._id == this.state.currentPlayList._id) {
            return;
        }

        playListAPI.getPlayList(
            newPlayList._id,
            (playListResponse) => {
                if(playListResponse == null || playListResponse.status == responseConstants.FAIL) {
                    return;
                }

                this.setState({
                    currentPlayList: playListResponse.playList,
                    currentAudios: playListResponse.playList.audios
                });
        
                this.props.changeCurrentPlayList(playListResponse.playList);
            }
        );
    }

    componentDidMount() {
        playListAPI.getAllPlayLists(
            (allPlayListsResponse) => {
                if(allPlayListsResponse == null || allPlayListsResponse.status == responseConstants.FAIL) {
                    return;
                }

                playListAPI.getPlayList(
                    allPlayListsResponse.playLists[0]._id,
                    (playListResponse) => {
                        if(playListResponse == null || playListResponse.status == responseConstants.FAIL) {
                            return;
                        }

                        this.setState({
                            playLists: allPlayListsResponse.playLists,
                            currentPlayList: playListResponse.playList,
                            currentAudios: playListResponse.playList.audios
                        });
                
                        this.props.changeCurrentPlayList(playListResponse.playList);
                        this.props.changeAudio(playListResponse.playList.audios[0], false);
                    }
                );
            }
        );
    }

    componentDidUpdate(prevProps) {
        if(prevProps.createListName != this.props.createListName) {
            playListAPI.createPlayList(
                this.props.createListName,
                (playListResponse) => {
                    if(playListResponse == null || playListResponse.status == responseConstants.FAIL) {
                        return;
                    }

                    this.setState(
                        (prevState) => {
                            prevState.playLists.push(playListResponse.playList);

                            return ({
                                playLists: prevState.playLists
                            });
                        }
                    );
                }
            );
        }
    }

    onOffContextMenuForPlayList(show = false, left = 0, top = 0, playListID = null) {
        this.setState({
            showPlayListCMD: show,
            top: top + "px",
            left: left + "px",
            playListID: playListID
        });
    }

    deletePlayList(playListID) {
        if(playListID == null || playListID == "") {
            return;
        }

        playListAPI.deletePlayList(
            playListID,
            (dataResponse) => {
                if(dataResponse.status == responseConstants.SUCCESS) {
                    this.changePlayList(this.state.playLists[0]);

                    this.setState(
                        (prevState) => {
                            prevState.playLists = prevState.playLists.filter(
                                (item) => item._id != playListID
                            );

                            return (
                                {
                                    playLists: prevState.playLists
                                }
                            );
                        }
                    );
                }
            }
        );
    }

    render() {
        return (
            <div id={this.props.id}>
                <UserLists playLists={this.state.playLists} changePlayList={this.changePlayList}
                currentPlayListID={this.state.currentPlayList && this.state.currentPlayList._id}
                showDialog={this.props.showDialog} 
                onOffContextMenuForPlayList={this.onOffContextMenuForPlayList} />

                {
                    this.state.showPlayListCMD && 
                    <ContextMenu id="context-menu" cssStyle={{top: this.state.top, left: this.state.left}}>
                        <MenuItem itemName="Delete the list" playListID={this.state.playListID}
                        deletePlayList={this.deletePlayList}>
                            <FontAwesomeIcon icon={faTimes} />
                        </MenuItem>
                    </ContextMenu>
                }

                <PlayList audios={this.state.currentAudios} changeAudio={this.props.changeAudio}
                currentAudioID={this.props.currentAudioID} />
            </div>
        );
    }
}
