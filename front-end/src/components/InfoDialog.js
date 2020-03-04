import React from "react";
import * as infoStates from "../constants/InfoDialogState";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faTimes, faCheck} from "@fortawesome/free-solid-svg-icons";

export default class InfoDialog extends React.Component {
    render() {
        return (
            <div id={this.props.id}>
                {
                    this.props.infoState == infoStates.STATE_INFO ?
                    <FontAwesomeIcon style={{color: "#228B22"}} icon={faCheck} /> :
                    <FontAwesomeIcon style={{color: "#DC143C"}} icon={faTimes} />
                }

                <p>{this.props.infoDialogMsg}</p>

                <button onClick={() => {this.props.closeInfoDialog()}}>Close</button>
            </div>
        );
    }
}
