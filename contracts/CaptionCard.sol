pragma solidity ^0.5.0;

import "./BondingCurvedToken.sol";

/**
 * @title Caption Card
 * @dev A token that represents a caption card in the game, it is backed by
 * a bonding curve.
 * Loosely inspired by dirict0x
 * https://github.com/district0x/memefactory
 */
contract CaptionCard is BondingCurvedToken {

  address public creator;
  string public captionText;

  /**
   * Exponent of 1 for the bonding curve means that it uses a linear function.
   * This puts price increase at the same magnitude of token supply increase:
   * i.e. 10,000 token issuance would necessarily lead to a 10,000X gain in price
   * Chose this because the project will likely not grow to a large scale and I
   * want to increase quickly enough to make the game interesting:
   * https://medium.com/thoughtchains/on-single-bonding-curves-for-continuous-token-models-a167f5ffef89
  */
  uint8 constant private exponent = 1;

  /**
   * @dev Constructor for this contract.
   *
   * @param _captionText The caption that is on the card.
   * @param _creator The address of the account that created the card.
   */
  constructor(
    string memory _captionText,
    address _creator
  ) BondingCurvedToken(_captionText, "", 18, exponent) public {
    captionText = _captionText;
    creator = _creator;
  }
}
