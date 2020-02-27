import React from "react";

export default class CreatePlayDialog extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            inputValue: ""
        };

        this.onChange = this.onChange.bind(this);
        this.onClickCreate = this.onClickCreate.bind(this);
    }

    onChange(event) {
        this.setState({
            inputValue: event.target.value
        });
    }

    onClickCreate() {
        const playListName = this.state.inputValue;

        this.props.closeDialog();

        this.setState({
            inputValue: ""
        });

        this.props.createPlayList(playListName);
    }

    render() {
        return (
            <div id={this.props.id} style={{display: this.props.display}}>
                <h1>Create Play List</h1>

                <input type="text" value={this.state.inputValue} onChange={this.onChange} />

                <div>
                    <button onClick={this.onClickCreate}>
                        Create
                    </button>

                    <button onClick={() => {this.props.closeDialog(); this.setState({inputValue: ""})}}>
                        Cancel
                    </button>
                </div>
            </div>
        );
    }
}
