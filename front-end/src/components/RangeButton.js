import React from "react";

export default class RangeButton extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            sliderTop: 50
        };

        this.onMouseDown = this.onMouseDown.bind(this);

        window.onmouseup = (event) => window.onmousemove = null;
    }

    onMouseDown(eventElement) {
        let diff = 0;

        if(this.props.orientation == "vertical") {
            diff = eventElement.clientY - this.sliderContainerTop - this.state.sliderTop;
        }

        window.onmousemove = (eventWindow) => {
            if(this.props.orientation == "vertical") {
                if((eventWindow.clientY > this.sliderContainerTop && eventWindow.clientY < (this.sliderContainerTop + this.sliderContainerHeight)) ||
                    (this.state.sliderTop > 0 && this.state.sliderTop < this.sliderContainerHeight)) {
                        this.setState({
                            sliderTop: (eventWindow.clientY - this.sliderContainerTop - diff)
                        });
                }

                if(this.state.sliderTop < 0) {
                    this.setState({
                        sliderTop: 0
                    });
                }

                if(this.state.sliderTop > this.sliderContainerHeight) {
                    this.setState({
                        sliderTop: this.sliderContainerHeight
                    });
                }
            }
        }
    }

    onMouseUp(event) {
        window.onmousemove = null;
    }

    componentDidUpdate() {
        if(this.props.orientation == "vertical") {
            if(this.state.sliderTop < 0) {
                this.setState({
                    sliderTop: 0
                });

                this.props.setVolume(0);
            }
    
            if(this.state.sliderTop > this.sliderContainerHeight) {
                this.setState({
                    sliderTop: this.sliderContainerHeight
                });

                this.props.setVolume(100);
            }

            this.props.setVolume((100 - this.state.sliderTop) / 100);
        }
    }

    componentDidMount() {
        if(this.props.orientation == "vertical") {
            this.sliderContainerTop = parseInt(
                window.getComputedStyle(
                    document.getElementById(this.props.playerID)
                ).getPropertyValue("top"), 10
            ) + 25;
    
            this.sliderContainerHeight = parseInt(
                window.getComputedStyle(
                    document.getElementById(this.props.id)
                ).getPropertyValue("height"), 10
            );
        }
    }

    render() {
        if(this.props.orientation == "vertical") {
            return (
                <div id={this.props.id} className="slider-container" style={{width: "10px", height: "100px"}}>
                    <div onMouseDown={this.onMouseDown} onMouseUp={this.onMouseUp}
                    className="player-buttons slider" 
                    style={{top: this.state.sliderTop + "px"}}>
                        {this.props.children}
                    </div>
                </div>
            );
        } else {
            return (
                <div id={this.props.id} className="slider-container" style={{width: "100%", height: "10px"}}>
                    <div className="player-buttons slider">
                        {this.props.children}
                    </div>
                </div>
            );
        }
    }
}
