import React from "react";
import UserLists from "./UserLists";
import PlayList from "./PlayList";
import * as playListAPI from "../api-endpoints/PlayListAPI";

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

        fetch(playListAPI.GET_LIST + "?listID=" + newPlayList._id).then(
            (res) => res.json()
        ).then(
            (playList) => {
                this.setState({
                    currentPlayList: playList,
                    currentAudios: playList.audios
                });

                this.props.changeCurrentPlayList(playList);
            }
        ).catch(
            (err) => {
                console.error(`Error while fetching the list: ${err}`);
            }
        );
    }

    componentDidMount() {
        fetch(playListAPI.GET_ALL_LISTS).then(
            (res) => res.json()
        ).then(
            (allPlayLists) => {
                fetch(playListAPI.GET_LIST + "?listID=" + allPlayLists[0]._id).then(
                    (res) => res.json()
                ).then(
                    (playList) => {
                        this.setState({
                            playLists: allPlayLists,
                            currentPlayList: playList,
                            currentAudios: playList.audios
                        });

                        this.props.changeCurrentPlayList(playList);
                        this.props.changeAudio(playList.audios[0], false);
                    }
                ).catch(
                    (err) => {
                        console.error(`Error while fetching the list: ${err}`);
                    }
                );
            }
        ).catch(
            (err) => {
                console.error(`Error while fetching all lists: ${err}`);
            }
        );
    }

    render() {
        return (
            <div id={this.props.id}>
                <UserLists playLists={this.state.playLists} changePlayList={this.changePlayList}
                currentPlayListID={this.state.currentPlayList && this.state.currentPlayList._id} />

                <PlayList audios={this.state.currentAudios} changeAudio={this.props.changeAudio}
                currentAudioID={this.props.currentAudioID} />
            </div>
        );
    }
}
