import React from "react";

export default class ContextMenu extends React.Component {
    render() {
        return (
            <div id={this.props.id} style={this.props.cssStyle}>
                {this.props.children}
            </div>
        );
    }
}
