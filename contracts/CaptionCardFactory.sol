pragma solidity ^0.5.0;

import "./CaptionCard.sol";

/**
 * @title Caption Card Factory
 * @dev A facotry contract that is used to create and deploy CaptionCard tokens
 * and is used for storing the child CaptionCard contract's addresses so that
 * they can be accessed whenever necessary.
 *
 * Loosely inspired by dirict0x
 * https://github.com/district0x/memefactory
 */
contract CaptionCardFactory {

  event CaptionCardCreated(CaptionCard card);

  /* A mapping of all the hashed byte32 captionTexts to if they already exist. */
  mapping (bytes32 => bool) public existingCards;

  /* Keeps track of all caption cards that have been created so far. */
  address[] public captionCards;

  /* A helper function to get a unique key for each cpationText. */
  function getCaptionTextUID(string memory _captionText)
    private returns (bytes32 _captionHash) {
      return keccak256(bytes(_captionText));
  }

  modifier cardDoesNotExist(string memory _captionText) {
    require(!existingCards[getCaptionTextUID(_captionText)]);
    _;
  }

  function addCaptionCard(string memory _captionText)
    public
    cardDoesNotExist(_captionText) {
     CaptionCard captionCard = new CaptionCard(
       _captionText,
       msg.sender
     );

     captionCards.push(address(captionCard));

     existingCards[getCaptionTextUID(_captionText)] = true;
     emit CaptionCardCreated(captionCard);
  }

  function getCaptionCardsLength() public returns(uint256) {
    return captionCards.length;
  }
}
