import React, { Component } from 'react';
import {Navbar, Nav} from 'react-bootstrap';
import Home from "./Home";
import CreateCaptionCard from "./CreateCaptionCard";
import Rules from "./Rules";
import CaptionCardFactory from './web3Contracts/CaptionCardFactory';
import CaptionCard from './web3Contracts/CaptionCard';
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
      this.listenForCaptionCardCreated()
    }
  }

  async isMetamaskInstalled() {
    const accounts = await window.ethereum.enable();
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

  listenForCaptionCardCreated() {
    CaptionCardFactory.events.CaptionCardCreated().on("data", function(event) {
      alert("New caption card created!");
    }).on("error", console.error);
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
            <Nav.Link className="link" as={Link} to="/rules">Game Rules</Nav.Link>
          </Navbar>
          {this.state.hasMetamask && this.state.isLoggedIn && this.state.isOnRopsten
            ?
            <Switch>
              <Route path="/create-card/" component={CreateCaptionCard}/>
              <Route path="/rules/" component={Rules}/>
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
