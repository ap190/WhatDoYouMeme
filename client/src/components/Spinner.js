import React, { Component } from 'react';
import Spinner from 'react-bootstrap/Spinner';
import './Spinner.css';

class CustomSpinner extends Component {
  render() {
    return (
      <Spinner className="Spinner" animation="border" />
    );
  }
}

export default CustomSpinner;
