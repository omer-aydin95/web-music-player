import React from "react";
import UserLists from "./UserLists";
import PlayList from "./PlayList";
import * as playListAPI from "../api-endpoints/PlayListAPI";
import * as responseConstants from "../constants/ResponseConstants";
import * as audioContextMenuConstants from "../constants/AudioContextMenuConstants";
import ContextMenu from "./ContextMenu";
import MenuItem from "./MenuItem";
import * as infoStates from "../constants/InfoDialogState";
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
            playListID: null,
            audioID: null
        };

        this.changePlayList = this.changePlayList.bind(this);
        this.onOffContextMenuForPlayList = this.onOffContextMenuForPlayList.bind(this);
        this.deletePlayList = this.deletePlayList.bind(this);
        this.onOffContextMenuForAudio = this.onOffContextMenuForAudio.bind(this);
        this.deleteAudioFromPlayList = this.deleteAudioFromPlayList.bind(this);
        this.addAudioToPlayList = this.addAudioToPlayList.bind(this);

        window.onclick = () => {
            this.onOffContextMenuForPlayList(false);
            this.onOffContextMenuForAudio(false);
        };
    }

    changePlayList(newPlayList) {
        if(newPlayList._id == this.state.currentPlayList._id) {
            return;
        }

        playListAPI.getPlayList(
            newPlayList._id,
            (playListResponse) => {
                if(playListResponse == null) {
                    this.props.showInfoDialog("Cannot connect to service!", infoStates.STATE_ERROR);

                    return;
                }

                if(playListResponse.status == responseConstants.FAIL) {
                    this.props.showInfoDialog("Cannot get the play list from service!", infoStates.STATE_ERROR);

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
                if(allPlayListsResponse == null) {
                    this.props.showInfoDialog("Cannot connect to service!", infoStates.STATE_ERROR);

                    return;
                }

                if(allPlayListsResponse.status == responseConstants.FAIL) {
                    this.props.showInfoDialog("Cannot get play lists from service!", infoStates.STATE_ERROR);

                    return;
                }

                playListAPI.getPlayList(
                    allPlayListsResponse.playLists[0]._id,
                    (playListResponse) => {
                        if(playListResponse == null) {
                            this.props.showInfoDialog("Cannot connect to service!", infoStates.STATE_ERROR);

                            return;
                        }

                        if(playListResponse.status == responseConstants.FAIL) {
                            this.props.showInfoDialog("Cannot get the play list from service!", infoStates.STATE_ERROR);

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
                    if(playListResponse == null) {
                        this.props.showInfoDialog("Cannot connect to service!", infoStates.STATE_ERROR);

                        return;
                    }

                    if(playListResponse.status == responseConstants.FAIL) {
                        this.props.showInfoDialog("Creation of the play list failed!", infoStates.STATE_ERROR);

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

					this.props.showInfoDialog("Play list created successfully.", infoStates.STATE_INFO);
                }
            );
        }
    }

    onOffContextMenuForPlayList(show = false, left = 0, top = 0, playListID = null) {
        this.setState({
            showAudioCMD: false,
            showPlayListCMD: show,
            top: top + "px",
            left: left + "px",
            playListID: playListID
        });
    }

    deletePlayList(playListID) {
        if(playListID == null || playListID == "") {
            this.props.showInfoDialog("Play list ID cannot be left blank!", infoStates.STATE_ERROR);

            return;
        }

        playListAPI.deletePlayList(
            playListID,
            (dataResponse) => {
                if(dataResponse == null) {
                    this.props.showInfoDialog("Cannot connect to service!", infoStates.STATE_ERROR);
                } else if(dataResponse.status == responseConstants.SUCCESS) {
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

                    this.props.showInfoDialog("Play list deleted successfully.", infoStates.STATE_INFO);
                } else {
                    this.props.showInfoDialog("Play list deletion failed!", infoStates.STATE_ERROR);
                }
            }
        );
    }

    onOffContextMenuForAudio(show = false, left = 0, top = 0, audioID = null) {
        this.setState({
            showPlayListCMD: false,
            showAudioCMD: show,
            top: top + "px",
            left: left + "px",
            audioID: audioID
        });
    }

    deleteAudioFromPlayList(playListID, audioID) {
        if(playListID == null || playListID == "" || audioID == null || audioID == "") {
            this.props.showInfoDialog("Play list ID and audio ID cannot be left blank!", infoStates.STATE_ERROR);

            return;
        }

        playListAPI.deleteAudioFromPlayList(
            playListID, 
            audioID,
            (dataResponse) => {
                if(dataResponse == null) {
                    this.props.showInfoDialog("Cannot connect to service!", infoStates.STATE_ERROR);
                } else if(dataResponse.status == responseConstants.SUCCESS) {
                    this.setState(
                        (prevState) => {
                            prevState.currentAudios = prevState.currentAudios.filter(
                                (item) => item._id != audioID
                            );

                            return (
                                {
                                    currentAudios: prevState.currentAudios
                                }
                            );
                        }
                    );

                    this.props.showInfoDialog("Audio deleted from the list successfully.", infoStates.STATE_INFO);
                } else {
                    this.props.showInfoDialog("Deletion audio from list failed!", infoStates.STATE_ERROR);
                }
            }
        );
    }

    addAudioToPlayList(playListID, audioID) {
        if(playListID == null || playListID == "" || audioID == null || audioID == "") {
            this.props.showInfoDialog("Play list ID and audio ID cannot be left blank!", infoStates.STATE_ERROR);

            return;
        }

        playListAPI.addAudioToPlayList(
            playListID, 
            audioID,
            (dataResponse) => {
                if(dataResponse == null) {
                    this.props.showInfoDialog("Cannot connect to service!", infoStates.STATE_ERROR);
                } else if(dataResponse.status == responseConstants.SUCCESS) {
                    this.props.showInfoDialog("Audio added to the list successfully.", infoStates.STATE_INFO);
                } else {
                    this.props.showInfoDialog("Adding audio to list failed!", infoStates.STATE_ERROR);
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

                {
                    this.state.showAudioCMD && 
                    <ContextMenu id="context-menu" cssStyle={{top: this.state.top, left: this.state.left}}>
                        {
                            this.state.currentPlayList._id != "all" && 
                            <MenuItem itemName="Delete from this list" playListID={this.state.currentPlayList._id}
                            audioID={this.state.audioID} deleteAudioFromPlayList={this.deleteAudioFromPlayList}
                            menuAction={audioContextMenuConstants.DELETE_AUDIO_FROM_LIST}>
                                <FontAwesomeIcon icon={faTimes} />
                            </MenuItem>
                        }
                        
                        <MenuItem itemName="Add to list:" cssClass="disabled">
                            <FontAwesomeIcon icon={faPlus} />
                        </MenuItem>
                        <hr />

                        {
                            this.state.playLists.map(
                                (playList) => {
                                    if(playList._id != this.state.currentPlayList._id && playList._id != "all") {
                                        return (
                                            <MenuItem key={playList._id} itemName={playList.listName} 
                                            playListID={playList._id}
                                            playListID={playList._id} audioID={this.state.audioID}
                                            menuAction={audioContextMenuConstants.ADD_AUDIO_TO_LIST}
                                            addAudioToPlayList={this.addAudioToPlayList}>
                                                <FontAwesomeIcon icon={faCheck} />
                                            </MenuItem>
                                        );
                                    }
                                }
                            )
                        }
                    </ContextMenu>
                }

                <PlayList audios={this.state.currentAudios} changeAudio={this.props.changeAudio}
                currentAudioID={this.props.currentAudioID} onOffContextMenuForAudio={this.onOffContextMenuForAudio} />
            </div>
        );
    }
}
