import React from "react";
import UserLists from "./UserLists";
import PlayList from "./PlayList";
import * as AudiosAPI from "../api-endpoints/AudiosAPI";

export default class MainGrid extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            currentPlayList: "all",
            currentAudios: []
        };
    }

    componentDidMount() {
        fetch(AudiosAPI.GET_ALL_AUDIOS).then(
            (res) => res.json()
        ).then(
            (data) => {
                this.setState({
                    currentAudios: data
                });

                this.props.changeAudio(data[0], false);
            }
        ).catch(
            (err) => {
                console.error(`Error while fetching data: ${err}`);
            }
        );
    }

    render() {
        return (
            <div id={this.props.id}>
                <UserLists />

                <PlayList audios={this.state.currentAudios} changeAudio={this.props.changeAudio} />
            </div>
        );
    }
}
