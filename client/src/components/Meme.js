import React, { Component } from 'react';
import Timer from './Timer';
import './Meme.css';

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
  }

  startNewRound() {
    console.log("heree")
    this.fetchImage();
  }

  fetchImage() {
    fetch('/api/getMeme')
    .then((res) => res.json())
    .then(data => {
      this.setState({
        didFetchImage: true,
        imageName: data.image,
        remainingTime: data.timestamp
      });
    });
  }


  render() {
    console.log(this.state.remainingTime)
    if (this.state.remainingTime !== 0) {
      return (
        <div className="MemeContainer">
          <img alt="meme" className="MemePhoto" src={this.state.imageName}/>

          <h5 className="TimeCaption"> Time Remaining in Round </h5>
          <Timer timeInterval={this.state.remainingTime}
          startNewRound={this.startNewRound.bind(this)}/>
        </div>
      );
    } else {
      return null;
    }

  }
}

export default Meme;
