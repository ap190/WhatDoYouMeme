import React, { Component } from 'react';
import './HeaderAlert.css';

class HeaderAlert extends Component {
  render() {
    return (
      <div className="HeaderAlertContainer">
        {this.props.displayMessage}
      </div>
    );
  }
}

export default HeaderAlert;
