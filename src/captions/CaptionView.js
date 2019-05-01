import React, { Component } from 'react';
import './CaptionView.css';
import CaptionPreview from './CaptionPreview';
import CaptionDetails from './CaptionDetails';
import CaptionActions from './CaptionActions';

class CaptionView extends Component {

  getBanner() {
      if (this.props.isWinner) {
        return (
          <p className="WinnerBanner">
            Winner
          </p>
        );
      } else if (this.props.isTied) {
        return (
          <p className="WinnerBanner">
            Tied
          </p>
        );
      } else {
        return null;
      }
  }

  render() {
    return (
      <div className="CaptionViewMainContainer">
        {this.getBanner()}
        <div className="CaptionViewPreviewDetailsRow">
          <CaptionPreview
            caption={this.props.caption}
          />

          <CaptionDetails
            price={this.props.price}
            sellPrice={this.props.sellPrice}
            balance={this.props.balance}
          />
        </div>

        <div className="CaptionViewActionsRow">
          <CaptionActions
            id={this.props.id}
            onBuy={this.props.onBuy}
            onSell={this.props.onSell}
            isSellActive={this.props.balance > 0 ? true : false}
            hasPendingTransaction={this.props.hasPendingTransaction}
          />
        </div>
      </div>
    );
  }
}

export default CaptionView;
