import React, { Component } from 'react';
import Timer from './Timer';
import './Meme.css';

const ROUND_TIME = 1.8 * Math.pow(10,7);

class Meme extends Component {

  constructor(props) {
    super(props);
    this.state = {
      didFetchImage: false,
      remainingTime: 0
    };
  }

  componentDidMount() {
    this.fetchImage();
    this.calculateRemainingTime();
  }

  fetchImage() {
    fetch('/api/getMeme')
    .then((res) => res.json())
    .then(data => {
      this.setState({
        didFetchImage: true,
        imageName: data.image,
        remainingTime: this.calculateRemainingTime(data.timestamp)
      });
    });
  }

  startNewRound() {
    console.log("new round");
  }

  calculateRemainingTime() {
    const newDate = new Date();
    return ROUND_TIME - (newDate.getTime() - 1556729616319);
  }

  render() {
    return (
      <div className="MemeContainer">
        <img className="MemePhoto" src={this.state.imageName}/>

        <h5 className="TimeCaption"> Time Remaining in Round </h5>
        <Timer timeInterval={this.state.remainingTime}/>
      </div>
    );
  }
}

export default Meme;
