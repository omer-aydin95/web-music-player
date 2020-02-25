import React from "react";

export default class CreatePlayDialog extends React.Component {
    render() {
        return (
            <div id={this.props.id} style={{display: this.props.display}}>
                <h1>Create Play List</h1>

                <input type="text" />

                <div>
                    <button>Create</button>

                    <button onClick={() => {this.props.closeDialog()}}>Cancel</button>
                </div>
            </div>
        );
    }
}
