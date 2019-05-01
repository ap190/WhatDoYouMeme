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

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoggedIn: false,
      hasMetamask: false,
      isOnRopsten: false,
      account: ""
    }
    if (web3 !== "undefined") {
      this.isMetamaskInstalled()
      this.listenForAccountChange()
    }
  }

  async isMetamaskInstalled() {
    const accounts = await web3.eth.getAccounts();
    var networkId = await web3.eth.net.getId();
    this.setState({
      hasMetamask: true,
      isLoggedIn: accounts.length > 0,
      isOnRopsten: networkId === 3,
      account: accounts[0]
    });
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
    console.log("here")
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
