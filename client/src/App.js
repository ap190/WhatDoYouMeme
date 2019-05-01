import React, { Component } from 'react';
import {Navbar} from 'react-bootstrap';
import Home from "./Home";
import CreateCaptionCard from "./CreateCaptionCard";
import HeaderAlert from './components/HeaderAlert';
import {
  Link, Switch, BrowserRouter as Router, Route
} from "react-router-dom";
import './App.css';
import web3 from './web3'
const account = "0xCd626bc764E1d553e0D75a42f5c4156B91a63F23";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoggedIn: false,
      hasMetamask: false,
      isOnRopsten: false,
      account: ""
    }
    this.isMetamaskInstalled()
    this.listenForAccountChange()
  }

  async isMetamaskInstalled() {
    if (typeof web3 !== 'undefined'){
      const accounts = await web3.eth.getAccounts();
      var networkId = await web3.eth.net.getId();
      this.setState({
        hasMetamask: true,
        isLoggedIn: accounts.length > 0,
        isOnRopsten: networkId === 3,
        account: accounts[0]
      });
   }
   else{
      this.setState({hasMetamask: false});
   }
  }

  listenForAccountChange() {
    window.ethereum.on('accountsChanged', function (accounts) {
      this.setState({account: accounts[0]})
    }.bind(this))
  }

  callback(newAccount) {
    this.setState({account: newAccount})
  }

  renderHeaderAlert() {
    var displayMessage = "";
    if (!this.state.hasMetamask) {
      displayMessage = "Install Metamask to interact with this site.";
    } else if (!this.state.isLoggedIn) {
      displayMessage = "Login to Metamask to interact with this site.";
    } else if (!this.state.isOnRopsten) {
      displayMessage = "Switch to the Ropsten test network to interact with this site.";
    }

    return <HeaderAlert displayMessage={displayMessage}/>;
  }

  render() {
    return (
      <Router>
          <Navbar className="nav" variant="dark" sticky="top">
            <Navbar.Brand as={Link} to="/">
              <span className="blueText">#WhatDo</span>
              <span className="purpleText">You</span>
              <span className="pinkText">CryptoMeme? </span>
            </Navbar.Brand>
          </Navbar>
          {this.state.hasMetamask && this.state.isLoggedIn && this.state.isOnRopsten
            ?
            <Switch>
              <Route path="/create-card/" component={CreateCaptionCard}/>
              <Route
                path="/*"
                render={(props) => <Home {...props} account={this.state.account}/>}
              />
            </Switch>
            :
            this.renderHeaderAlert() }
      </Router>
    );
  }
}

export default App;
