
// File: openzeppelin-solidity/contracts/token/ERC20/IERC20.sol

pragma solidity ^0.5;

/**
 * @title ERC20 interface
 * @dev see https://eips.ethereum.org/EIPS/eip-20
 */
interface IERC20 {
    function transfer(address to, uint256 value) external returns (bool);

    function approve(address spender, uint256 value) external returns (bool);

    function transferFrom(address from, address to, uint256 value) external returns (bool);

    function totalSupply() external view returns (uint256);

    function balanceOf(address who) external view returns (uint256);

    function allowance(address owner, address spender) external view returns (uint256);

    event Transfer(address indexed from, address indexed to, uint256 value);

    event Approval(address indexed owner, address indexed spender, uint256 value);
}

// File: openzeppelin-solidity/contracts/token/ERC20/ERC20Detailed.sol



/**
 * @title ERC20Detailed token
 * @dev The decimals are only for visualization purposes.
 * All the operations are done using the smallest and indivisible token unit,
 * just as on Ethereum all the operations are done in wei.
 */
contract ERC20Detailed is IERC20 {
    string private _name;
    string private _symbol;
    uint8 private _decimals;

    constructor (string memory name, string memory symbol, uint8 decimals) public {
        _name = name;
        _symbol = symbol;
        _decimals = decimals;
    }

    /**
     * @return the name of the token.
     */
    function name() public view returns (string memory) {
        return _name;
    }

    /**
     * @return the symbol of the token.
     */
    function symbol() public view returns (string memory) {
        return _symbol;
    }

    /**
     * @return the number of decimals of the token.
     */
    function decimals() public view returns (uint8) {
        return _decimals;
    }
}

// File: openzeppelin-solidity/contracts/math/SafeMath.sol

/**
 * @title SafeMath
 * @dev Unsigned math operations with safety checks that revert on error
 */
library SafeMath {
    /**
     * @dev Multiplies two unsigned integers, reverts on overflow.
     */
    function mul(uint256 a, uint256 b) internal pure returns (uint256) {
        // Gas optimization: this is cheaper than requiring 'a' not being zero, but the
        // benefit is lost if 'b' is also tested.
        // See: https://github.com/OpenZeppelin/openzeppelin-solidity/pull/522
        if (a == 0) {
            return 0;
        }

        uint256 c = a * b;
        require(c / a == b);

        return c;
    }

    /**
     * @dev Integer division of two unsigned integers truncating the quotient, reverts on division by zero.
     */
    function div(uint256 a, uint256 b) internal pure returns (uint256) {
        // Solidity only automatically asserts when dividing by 0
        require(b > 0);
        uint256 c = a / b;
        // assert(a == b * c + a % b); // There is no case in which this doesn't hold

        return c;
    }

    /**
     * @dev Subtracts two unsigned integers, reverts on overflow (i.e. if subtrahend is greater than minuend).
     */
    function sub(uint256 a, uint256 b) internal pure returns (uint256) {
        require(b <= a);
        uint256 c = a - b;

        return c;
    }

    /**
     * @dev Adds two unsigned integers, reverts on overflow.
     */
    function add(uint256 a, uint256 b) internal pure returns (uint256) {
        uint256 c = a + b;
        require(c >= a);

        return c;
    }

    /**
     * @dev Divides two unsigned integers and returns the remainder (unsigned integer modulo),
     * reverts when dividing by zero.
     */
    function mod(uint256 a, uint256 b) internal pure returns (uint256) {
        require(b != 0);
        return a % b;
    }
}

// File: openzeppelin-solidity/contracts/token/ERC20/ERC20.sol


/**
 * @title Standard ERC20 token
 *
 * @dev Implementation of the basic standard token.
 * https://eips.ethereum.org/EIPS/eip-20
 * Originally based on code by FirstBlood:
 * https://github.com/Firstbloodio/token/blob/master/smart_contract/FirstBloodToken.sol
 *
 * This implementation emits additional Approval events, allowing applications to reconstruct the allowance status for
 * all accounts just by listening to said events. Note that this isn't required by the specification, and other
 * compliant implementations may not do it.
 */
contract ERC20 is IERC20 {
    using SafeMath for uint256;

    mapping (address => uint256) private _balances;

    mapping (address => mapping (address => uint256)) private _allowed;

    uint256 private _totalSupply;

    /**
     * @dev Total number of tokens in existence
     */
    function totalSupply() public view returns (uint256) {
        return _totalSupply;
    }

    /**
     * @dev Gets the balance of the specified address.
     * @param owner The address to query the balance of.
     * @return A uint256 representing the amount owned by the passed address.
     */
    function balanceOf(address owner) public view returns (uint256) {
        return _balances[owner];
    }

    /**
     * @dev Function to check the amount of tokens that an owner allowed to a spender.
     * @param owner address The address which owns the funds.
     * @param spender address The address which will spend the funds.
     * @return A uint256 specifying the amount of tokens still available for the spender.
     */
    function allowance(address owner, address spender) public view returns (uint256) {
        return _allowed[owner][spender];
    }

    /**
     * @dev Transfer token to a specified address
     * @param to The address to transfer to.
     * @param value The amount to be transferred.
     */
    function transfer(address to, uint256 value) public returns (bool) {
        _transfer(msg.sender, to, value);
        return true;
    }

    /**
     * @dev Approve the passed address to spend the specified amount of tokens on behalf of msg.sender.
     * Beware that changing an allowance with this method brings the risk that someone may use both the old
     * and the new allowance by unfortunate transaction ordering. One possible solution to mitigate this
     * race condition is to first reduce the spender's allowance to 0 and set the desired value afterwards:
     * https://github.com/ethereum/EIPs/issues/20#issuecomment-263524729
     * @param spender The address which will spend the funds.
     * @param value The amount of tokens to be spent.
     */
    function approve(address spender, uint256 value) public returns (bool) {
        _approve(msg.sender, spender, value);
        return true;
    }

    /**
     * @dev Transfer tokens from one address to another.
     * Note that while this function emits an Approval event, this is not required as per the specification,
     * and other compliant implementations may not emit the event.
     * @param from address The address which you want to send tokens from
     * @param to address The address which you want to transfer to
     * @param value uint256 the amount of tokens to be transferred
     */
    function transferFrom(address from, address to, uint256 value) public returns (bool) {
        _transfer(from, to, value);
        _approve(from, msg.sender, _allowed[from][msg.sender].sub(value));
        return true;
    }

    /**
     * @dev Increase the amount of tokens that an owner allowed to a spender.
     * approve should be called when _allowed[msg.sender][spender] == 0. To increment
     * allowed value is better to use this function to avoid 2 calls (and wait until
     * the first transaction is mined)
     * From MonolithDAO Token.sol
     * Emits an Approval event.
     * @param spender The address which will spend the funds.
     * @param addedValue The amount of tokens to increase the allowance by.
     */
    function increaseAllowance(address spender, uint256 addedValue) public returns (bool) {
        _approve(msg.sender, spender, _allowed[msg.sender][spender].add(addedValue));
        return true;
    }

    /**
     * @dev Decrease the amount of tokens that an owner allowed to a spender.
     * approve should be called when _allowed[msg.sender][spender] == 0. To decrement
     * allowed value is better to use this function to avoid 2 calls (and wait until
     * the first transaction is mined)
     * From MonolithDAO Token.sol
     * Emits an Approval event.
     * @param spender The address which will spend the funds.
     * @param subtractedValue The amount of tokens to decrease the allowance by.
     */
    function decreaseAllowance(address spender, uint256 subtractedValue) public returns (bool) {
        _approve(msg.sender, spender, _allowed[msg.sender][spender].sub(subtractedValue));
        return true;
    }

    /**
     * @dev Transfer token for a specified addresses
     * @param from The address to transfer from.
     * @param to The address to transfer to.
     * @param value The amount to be transferred.
     */
    function _transfer(address from, address to, uint256 value) internal {
        require(to != address(0));

        _balances[from] = _balances[from].sub(value);
        _balances[to] = _balances[to].add(value);
        emit Transfer(from, to, value);
    }

    /**
     * @dev Internal function that mints an amount of the token and assigns it to
     * an account. This encapsulates the modification of balances such that the
     * proper events are emitted.
     * @param account The account that will receive the created tokens.
     * @param value The amount that will be created.
     */
    function _mint(address account, uint256 value) internal {
        require(account != address(0));

        _totalSupply = _totalSupply.add(value);
        _balances[account] = _balances[account].add(value);
        emit Transfer(address(0), account, value);
    }

    /**
     * @dev Internal function that burns an amount of the token of a given
     * account.
     * @param account The account whose tokens will be burnt.
     * @param value The amount that will be burnt.
     */
    function _burn(address account, uint256 value) internal {
        require(account != address(0));

        _totalSupply = _totalSupply.sub(value);
        _balances[account] = _balances[account].sub(value);
        emit Transfer(account, address(0), value);
    }

    /**
     * @dev Approve an address to spend another addresses' tokens.
     * @param owner The address that owns the tokens.
     * @param spender The address that will spend the tokens.
     * @param value The number of tokens that can be spent.
     */
    function _approve(address owner, address spender, uint256 value) internal {
        require(spender != address(0));
        require(owner != address(0));

        _allowed[owner][spender] = value;
        emit Approval(owner, spender, value);
    }

    /**
     * @dev Internal function that burns an amount of the token of a given
     * account, deducting from the sender's allowance for said account. Uses the
     * internal burn function.
     * Emits an Approval event (reflecting the reduced allowance).
     * @param account The account whose tokens will be burnt.
     * @param value The amount that will be burnt.
     */
    function _burnFrom(address account, uint256 value) internal {
        _burn(account, value);
        _approve(account, msg.sender, _allowed[account][msg.sender].sub(value));
    }
}

// File: openzeppelin-solidity/contracts/ownership/Ownable.sol

/**
 * @title Ownable
 * @dev The Ownable contract has an owner address, and provides basic authorization control
 * functions, this simplifies the implementation of "user permissions".
 */
contract Ownable {
    address private _owner;

    event OwnershipTransferred(address indexed previousOwner, address indexed newOwner);

    /**
     * @dev The Ownable constructor sets the original `owner` of the contract to the sender
     * account.
     */
    constructor () internal {
        _owner = msg.sender;
        emit OwnershipTransferred(address(0), _owner);
    }

    /**
     * @return the address of the owner.
     */
    function owner() public view returns (address) {
        return _owner;
    }

    /**
     * @dev Throws if called by any account other than the owner.
     */
    modifier onlyOwner() {
        require(isOwner());
        _;
    }

    /**
     * @return true if `msg.sender` is the owner of the contract.
     */
    function isOwner() public view returns (bool) {
        return msg.sender == _owner;
    }

    /**
     * @dev Allows the current owner to relinquish control of the contract.
     * It will not be possible to call the functions with the `onlyOwner`
     * modifier anymore.
     * @notice Renouncing ownership will leave the contract without an owner,
     * thereby removing any functionality that is only available to the owner.
     */
    function renounceOwnership() public onlyOwner {
        emit OwnershipTransferred(_owner, address(0));
        _owner = address(0);
    }

    /**
     * @dev Allows the current owner to transfer control of the contract to a newOwner.
     * @param newOwner The address to transfer ownership to.
     */
    function transferOwnership(address newOwner) public onlyOwner {
        _transferOwnership(newOwner);
    }

    /**
     * @dev Transfers control of the contract to a newOwner.
     * @param newOwner The address to transfer ownership to.
     */
    function _transferOwnership(address newOwner) internal {
        require(newOwner != address(0));
        emit OwnershipTransferred(_owner, newOwner);
        _owner = newOwner;
    }
}

// File: contracts/BondingCurvedToken.sol






/**
 * @title Bonding Curve
 * @dev Bonding curve contract based on polynomial curve that is backed by ether
 * inspired by bancor protocol, oed, simondlr
 * https://github.com/bancorprotocol/contracts
 * https://github.com/oed/bonding-curves/blob/master/contracts/EthBondingCurvedToken.sol
 * https://github.com/ConsenSys/curationmarkets/blob/master/CurationMarkets.sol
 */
contract BondingCurvedToken is ERC20Detailed, ERC20, Ownable {

  event Minted(uint256 amount, uint256 totalCost);
  event Burned(uint256 amount, uint256 reward);

  uint256 constant private PRECISION = 10000000000;

  /**
   * @dev Available balance of reserve token in contract.
   */
  uint256 public poolBalance;

  /**
   * @dev The exponent of the polynomial bonding curve.
   */
  uint8 public exponent;

  /// @dev constructor    Initializes the bonding curve
  /// @param _name         The name of the token
  /// @param _decimals     The number of decimals to use
  /// @param _symbol       The symbol of the token
  /// @param _exponent        The exponent of the curve
  constructor(
    string memory _name,
    string memory _symbol,
    uint8 _decimals,
    uint8 _exponent
  ) ERC20Detailed(_name, _symbol, _decimals) public {
    exponent = _exponent;
  }

  /// @dev        Calculate the integral from 0 to t
  /// @param t    The number to integrate to
  function curveIntegral(uint256 t) internal returns (uint256) {
    uint256 nexp = exponent + 1;
    // Calculate integral of t^exponent
    return PRECISION.div(nexp).mul(t ** nexp).div(PRECISION);
  }

  function priceToMint(uint256 numTokens) public returns(uint256) {
    uint256 totalSupply = totalSupply();
    return curveIntegral(totalSupply.add(numTokens)).sub(poolBalance);
  }

  /**
   * Calculates the amount of reserve tokens (ETH) one receives in exchange for
   * a given number of
   * continuous tokens
   */
  function calculateSaleReturn(uint256 numTokens) public returns(uint256) {
    uint256 totalSupply = totalSupply();
    return poolBalance.sub(curveIntegral(totalSupply.sub(numTokens)));
  }

  /**
   * @dev Buy tokens by minting them
   * @param numTokens The number of tokens you want to mint/buy
   * TODO implement maxAmount that helps prevent miner front-running
   */
  function buy(uint256 numTokens, address account) public payable {
    uint256 priceForTokens = priceToMint(numTokens);
    require(msg.value >= priceForTokens);

    poolBalance = poolBalance.add(msg.value);
    _mint(account, numTokens);

    // Send back refund.
    if (msg.value > priceForTokens) {
      msg.sender.transfer(msg.value - priceForTokens);
    }

    emit Minted(numTokens, priceForTokens);
  }

  /**
   * @dev Sell tokens by burning them to receive ether
   * @param sellAmount Amount of tokens you want to sell
   */
  function sell(uint256 sellAmount) public {
    require(sellAmount > 0 && balanceOf(msg.sender) >= sellAmount);

    /* The amount of ETH to return.

    */
    uint256 ethAmount = calculateSaleReturn(sellAmount);

    poolBalance = poolBalance.sub(ethAmount);
    _burn(msg.sender, sellAmount);

    msg.sender.transfer(ethAmount);

    emit Burned(sellAmount, ethAmount);
  }
}

// File: contracts/CaptionCard.sol

pragma solidity ^0.5.0;


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

// File: contracts/CaptionCardFactory.sol

pragma solidity ^0.5.0;


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
