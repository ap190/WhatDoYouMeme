import React, { Component } from 'react';
import Timer from './Timer';
import './Meme.css';

const ROUND_TIME = 1.8 * Math.pow(10,7);

class Meme extends Component {
  startNewRound() {
    console.log("new round");
  }

  render() {
    return (
      <div className="MemeContainer">
        <div className="MemePhoto" />
        <h5 className="TimeCaption"> Time Remaining in Round </h5>
        <Timer timeInterval={ROUND_TIME}/>
      </div>
    );
  }
}

export default Meme;
