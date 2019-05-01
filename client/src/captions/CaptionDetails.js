import React, { Component } from 'react';
import './CaptionDetails.css';

class CaptionDetails extends Component {
  render() {
    return (
      <div className="CaptionDetailsMainContainer">
        <p className="CaptionDetailsHeader">
          Buy Price:
        </p>

        <p className="CaptionDetailsValue">
          {this.props.price}
        </p>
        {this.props.sellPrice == null ?
          null :
          <p className="CaptionDetailsHeader">
            Sell Price:
          </p>
        }
        {this.props.sellPrice == null ?
          null :
          <p className="CaptionDetailsValue">
            {this.props.sellPrice}
          </p>
        }
        <p className="CaptionDetailsHeader">
          Balance:
        </p>

        <p className="CaptionDetailsValue">
          {this.props.balance}
        </p>
      </div>
    );
  }
}

export default CaptionDetails;
