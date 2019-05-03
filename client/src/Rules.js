import React, { Component } from "react";
import CaptionPreview from './captions/CaptionPreview';
import './Rules.css';

class Rules extends Component {
  render() {
    return (
      <div className="rulesContainer">
        <h2 className="title">How To Play</h2>
        <h4 className="subtitle">#WhatDoYouCryptoMeme is a never ending game for meme (and blockchain)
        lovers, that allows people to be rewarded for their senses of humor.
        </h4>
        <p className="blurb">This is a blockchain based version of the card game What Do You Meme-
        where the objective is to create the funniest meme by pairing Caption Cards
        with the Photo Card in play.
        Unlike the traditional game, where a rotating, centralized judge is the final
        arbiter in deciding which combination is the best each round, here, in
        the decentralized version, all participants determine which card wins,
        meaning your sense of humor can truly be appreciated.
        </p>
        <h4 className="subtitle">The rules here are simple:</h4>
        <ol className="blurb">
          <li>Each round of the game lasts 24 hours.</li>
          <li>A Meme Card is chosen at random each round.</li>
          <li>Players can either buy into an existing Caption Card that they think best completes the meme,
          or create a new one.
          They can also sell cards that they don’t think fit with the current Caption Card.</li>
          <li>The price of a Caption Card rises as players buy into it, and falls as they sell it.
          </li>
          <li>Thanks to the way Caption Cards are implemented using bonding curves,
            there is a limitless supply of each card and instant liquidity- meaning
            you can ~ALWAYS~ buy and sell a Caption Card at any time in the game.
            This price will be fairly determined using a bonding curve.
           </li>
          <li>At the end of the round, the Caption Card with the highest price is the winning card!</li>
        </ol>
        <h4 className="subtitle">Other things to note:</h4>
        <p className="blurb">The contracts for this DApp are Deployed to the Ropsten test network.
        You must be logged into Metamask
          and on the Ropsten test network to use this app!
        </p>
        <h4 className="subtitle"><span className="colored">So enough about the rules,
        what do you crypto meme? Happy meme creating!</span></h4>
      </div>
    );
  }
}

export default Rules;
