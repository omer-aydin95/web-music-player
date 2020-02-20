import React from "react";

export default class RangeButton extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            sliderTop: 50
        };

        this.sliderTop = 50;

        this.onMouseDown = this.onMouseDown.bind(this);

        window.onmouseup = (event) => window.onmousemove = null;
    }

    onMouseDown(eventElement) {
        let diff = 0;

        if(this.props.orientation == "vertical") {
            diff = eventElement.clientY - this.sliderContainerTop - this.sliderTop;
        }

        window.onmousemove = (eventWindow) => {
            if(this.props.orientation == "vertical") {
                if((eventWindow.clientY > this.sliderContainerTop && eventWindow.clientY < (this.sliderContainerTop + this.sliderContainerHeight)) ||
                    (this.sliderTop > 0 && this.sliderTop < this.sliderContainerHeight)) {
                        this.setState({
                            sliderTop: (eventWindow.clientY - this.sliderContainerTop - diff)
                        });
                }

                if(this.sliderTop < 0) {
                    this.setState({
                        sliderTop: 0
                    });
                }

                if(this.sliderTop > this.sliderContainerHeight) {
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
            if(this.sliderTop < 0) {
                this.setState({
                    sliderTop: 0
                });
            }
    
            if(this.sliderTop > this.sliderContainerHeight) {
                this.setState({
                    sliderTop: this.sliderContainerHeight
                });
            }
    
            this.sliderTop = this.state.sliderTop;
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
