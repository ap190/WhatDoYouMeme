import React, { Component } from 'react';
import Timer from "react-compound-timer";
import './Meme.css';

const withTimer = timerProps => WrappedComponent => wrappedComponentProps => (
  <Timer {...timerProps}>
  {timerRenderProps =>
    <WrappedComponent {...wrappedComponentProps} timer={timerRenderProps} />}
    </Timer>
  );


class CustomTimer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      timeInterval: this.props.timeInterval, // in milliseconds
    };
  }

  componentDidMount() {
    const { setCheckpoints, setTime, getTime} = this.props.timer;
    setTime(this.state.timeInterval);
    setCheckpoints([
      {
        time: 0,
        callback: () => setTime(this.state.timeInterval),
      }
    ]);
  }

  render() {
    return (
      <h3 className="TimerCountdown">
        <Timer.Hours />:
        <Timer.Minutes />:
        <Timer.Seconds />
      </h3>
    );
  }
}

  const TimerHOC = withTimer({
    direction: 'backward',
    initialTime: 0,
  })(CustomTimer);

  export default TimerHOC;
