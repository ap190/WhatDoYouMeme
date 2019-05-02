import React, { Component } from 'react';
import CaptionView from './CaptionView';
import CaptionListHeader from './CaptionListHeader';
import './CaptionList.css';
import CaptionCardFactory from '../web3Contracts/CaptionCardFactory';
import CaptionCard from '../web3Contracts/CaptionCard';
import BondingCurvedToken from '../web3Contracts/BondingCurvedToken';
import web3 from '../web3';
import Spinner from '../components/Spinner';

const DEFAULT_BUY_AMOUNT = 10 ** 8;

class CaptionList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      account: this.props.account,
      pendingTransactions: []
    };
    this.getCaptionCards();
    this.listenForBuy();
    this.listenForSell();
    this.listenForCaptionCardCreated();
  }

  componentDidUpdate() {
    if (this.props.account !== this.state.account) {
      this.setState(
        {data: [], account: this.props.account},
        this.getCaptionCards
      );
    }
  }

  listenForSell() {
    BondingCurvedToken.events.Burned().on("data", function(event) {
      // Remove value from waiting list and reload CaptionList
      var updatedTransacts = this.state.pendingTransactions.filter(addr => addr !== event.address);
      this.setState(
        {data: [], pendingTransactions: updatedTransacts},
        this.getCaptionCards
      );
    }.bind(this)).on("error", console.error);
  }

  listenForBuy() {
    BondingCurvedToken.events.Minted().on("data", function(event) {
      // Remove value from waiting list and reload CaptionList
      var updatedTransacts = this.state.pendingTransactions.filter(addr => addr !== event.address);
      this.setState(
        {data: [], pendingTransactions: updatedTransacts},
        this.getCaptionCards
      );
    }.bind(this)).on("error", console.error);
  }

  listenForCaptionCardCreated() {
    CaptionCardFactory.events.CaptionCardCreated().on("data", function(event) {
      // Force reload
      this.setState(
        {data: []},
        this.getCaptionCards
      );
    }.bind(this)).on("error", console.error);
  }

  async onBuy(addr) {
    CaptionCard.options.address = addr;
    this.state.pendingTransactions.push(addr);
    await this.setState({pendingTransactions: this.state.pendingTransactions});
    const accounts = await web3.eth.getAccounts();
    let price = await CaptionCard.methods.priceToMint(DEFAULT_BUY_AMOUNT).call();
    try {
      await CaptionCard.methods.buy(
        DEFAULT_BUY_AMOUNT, accounts[0]).send(
          {value: price, from: accounts[0]});
    } catch {
      var updatedTransacts = this.state.pendingTransactions.filter(add => add !== addr);
      await this.setState({pendingTransactions: updatedTransacts});
    }
  }

  async onSell(addr) {
    CaptionCard.options.address = addr;
    this.state.pendingTransactions.push(addr);
    await this.setState({pendingTransactions: this.state.pendingTransactions});
    const accounts = await web3.eth.getAccounts();
    try {
      await CaptionCard.methods.sell(
      DEFAULT_BUY_AMOUNT).send(
        {from: accounts[0]});
    } catch {
      var updatedTransacts = this.state.pendingTransactions.filter(add => add !== addr);
      await this.setState({pendingTransactions: updatedTransacts});
    }
  }

  async getCaptionCards() {
    const account = this.state.account;
    const len = await CaptionCardFactory.methods.getCaptionCardsLength.call().then(result => result.toNumber());
    var data = []
    for (var i = 0; i < len; i++) {
      let addr = await CaptionCardFactory.methods.captionCards(i).call();
      CaptionCard.options.address = addr;
      let caption = await CaptionCard.methods.captionText().call();
      let buyPrice = await CaptionCard.methods.priceToMint(DEFAULT_BUY_AMOUNT).call();
      buyPrice = web3.utils.fromWei(buyPrice.toString(), 'ether');

      let sellPrice = await CaptionCard.methods.calculateSaleReturn(DEFAULT_BUY_AMOUNT).call();
      sellPrice = sellPrice == null ? null : web3.utils.fromWei(sellPrice.toString(), 'ether');

      let balance = await CaptionCard.methods.balanceOf(account).call();
      data.push({id: addr, sellPrice: sellPrice, buyPrice: buyPrice, balance: balance.toNumber() / DEFAULT_BUY_AMOUNT, caption: caption});
    }
    this.setState({
      data: data
    });
  }

  render() {
    /* Sort in order of descending price. */
    const sortedData = this.state.data.sort(function(a, b){
      return b.buyPrice - a.buyPrice
    });
    /* Winner is the current card with highest price. */
    const winner = sortedData[0];
    const numWiners = sortedData.filter(item => item.buyPrice === winner.buyPrice).length;

    const captions = sortedData.map((data) => {
      return <CaptionView
        id={data.id}
        key={data.id}
        caption={data.caption}
        balance={data.balance}
        price={data.buyPrice}
        sellPrice={data.sellPrice}
        onSell={this.onSell.bind(this)}
        onBuy={this.onBuy.bind(this)}
        hasPendingTransaction={this.state.pendingTransactions.includes(data.id)}
        isWinner={winner.buyPrice === data.buyPrice && numWiners === 1}
        isTied={winner.buyPrice === data.buyPrice && numWiners !== 1}
      />
    });

    return (
      <div className="CaptionList">
        <CaptionListHeader />
        <div className="CaptionListMainContainer">
          {captions.length > 0 ?
           captions
           : <Spinner /> }
        </div>
      </div>
    );
  }
}

export default CaptionList;
