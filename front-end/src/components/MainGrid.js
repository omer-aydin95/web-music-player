import React from "react";
import UserLists from "./UserLists";
import PlayList from "./PlayList";
import * as playListAPI from "../api-endpoints/PlayListAPI";
import responseConstants from "../constants/ResponseConstants";

export default class MainGrid extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            playLists: [],
            currentPlayList: null,
            currentAudios: []
        };

        this.changePlayList = this.changePlayList.bind(this);
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

    render() {
        return (
            <div id={this.props.id}>
                <UserLists playLists={this.state.playLists} changePlayList={this.changePlayList}
                currentPlayListID={this.state.currentPlayList && this.state.currentPlayList._id}
                showDialog={this.props.showDialog} />

                <PlayList audios={this.state.currentAudios} changeAudio={this.props.changeAudio}
                currentAudioID={this.props.currentAudioID} />
            </div>
        );
    }
}
