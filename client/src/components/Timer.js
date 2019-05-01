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

  componentDidUpdate() {
    const { setTime, start} = this.props.timer;
    if (this.props.timeInterval !== this.state.timeInterval) {
      this.setState({
        timeInterval: this.props.timeInterval
      }, function redo(){
        setTime(this.state.timeInterval);
        start();
      })
    }
  }

  componentDidMount() {
    const { setCheckpoints, setTime} = this.props.timer;
    setTime(this.state.timeInterval);
    setCheckpoints([
      {
        time: 0,
        callback: () => {
          this.props.startNewRound();
        }
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
    startImmediately: true
  })(CustomTimer);

  export default TimerHOC;
