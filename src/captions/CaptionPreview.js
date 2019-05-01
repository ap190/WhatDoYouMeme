import React, { Component } from 'react';
import './CaptionPreview.css';

class CaptionPreview extends Component {
  render() {
    return (
      <div className="CaptionPreviewMainContainer">
            {this.props.caption}
      </div>
    );
  }
}

export default CaptionPreview;
