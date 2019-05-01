import React, { Component } from 'react';
import Timer from './Timer';
import './Meme.css';

const ROUND_TIME = 1.8 * Math.pow(10,7);

class Meme extends Component {

  constructor(props) {
    super(props);
    this.state = {
      didFetchImage: false
    };
  }

  componentDidMount() {
    this.fetchImage();
  }

  fetchImage() {
    fetch('/api/getMeme')
    .then((res) => res.text())
    .then(imageName => {
      console.log(imageName)
      this.setState({
        didFetchImage: true,
        imageName: imageName
      });
    });
  }

  startNewRound() {
    console.log("new round");
  }

  render() {
    return (
      <div className="MemeContainer">
        <img className="MemePhoto" src={this.state.imageName}/>

        <h5 className="TimeCaption"> Time Remaining in Round </h5>
        <Timer timeInterval={ROUND_TIME}/>
      </div>
    );
  }
}

export default Meme;
