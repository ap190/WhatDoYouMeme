import React, { Component } from 'react';
import Spinner from 'react-bootstrap/Spinner';
import './CaptionActions.css';

class CaptionActions extends Component {
  render() {
    if (!this.props.hasPendingTransaction) {
      return (
        <div className="CaptionActionsMainContainer">
          <div
            className="CaptionActionsButton CaptionActionsButtonBottomMargin"
            onClick={() => this.props.onBuy(this.props.id)}
          >
            Buy
          </div>
          {this.props.isSellActive ?
          <div
            className="CaptionActionsButton"
            onClick={() => this.props.onSell(this.props.id)}
          >
            Sell
          </div> :
          <div
            className="CaptionActionsButtonDisabled"
          >
            Sell
          </div>
        }
        </div>
      );
    } else {
      return (
        <div className="CaptionActionsMainContainer">
          <div
            className="CaptionActionsButtonDisabled CaptionActionsButtonBottomMargin"
          >
            <Spinner
              as="span"
              animation="grow"
              size="sm"
              role="status"
              aria-hidden="true"
            />
            Pending Transaction
          </div>
          <div
            className="CaptionActionsButtonDisabled"
          >
            <Spinner
              as="span"
              animation="grow"
              size="sm"
              role="status"
              aria-hidden="true"
            />
            Pending Transaction
          </div>
        </div>
      )
    }
  }
}

export default CaptionActions;
