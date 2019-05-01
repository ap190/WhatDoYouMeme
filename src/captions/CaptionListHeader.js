import React, { Component } from 'react';
import {
  Link
} from "react-router-dom";
import './CaptionListHeader.css';

class CaptionListHeader extends Component {
  render() {
    return (
        <div className="CreateCaptionCardButton">
          <Link style={{display: 'block', height: '100%'}} to='/create-card'>Create Caption Card</Link>
        </div>
    );
  }
}

export default CaptionListHeader;
