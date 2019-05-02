import React, { Component } from 'react';
import './CreateCaptionCard.css';
import web3 from './web3'
import CaptionCardFactory from './web3Contracts/CaptionCardFactory';

class CreateCaptionCard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: 'Write a funny caption here',
      isSubmitable: true
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    this.setState({
      value: event.target.value,
      isSubmitable: event.target.value.trim().length > 0
    });
  }

  async handleSubmit(event) {
    const accounts = await web3.eth.getAccounts();
    await CaptionCardFactory.methods.addCaptionCard(this.state.value.trim()).send({from: accounts[0]});
    event.preventDefault();
  }

  render() {
    return (
      <div className="CardSubmitContainer">
          <form onSubmit={this.handleSubmit}>
              <textarea className="CardText" value={this.state.value} onChange={this.handleChange} />
          </form>
          {this.state.isSubmitable ?
            <div className="CardSubmitButton" type="submit" onClick={this.handleSubmit.bind(this)}> Create Card</div>
            :   <div className="CardSubmitButtonDisabled"> Create Card</div>
          }
      </div>
    );
  }
}

export default CreateCaptionCard;
