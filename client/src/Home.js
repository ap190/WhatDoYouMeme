import React, { Component } from 'react';
import CaptionList from './captions/CaptionList';
import Meme from './components/Meme';

class Home extends Component {
  render() {
    return (
      <div className="App">
        <Meme />
        <CaptionList account={this.props.account}/>
      </div>
    );
  }
}

export default Home;
