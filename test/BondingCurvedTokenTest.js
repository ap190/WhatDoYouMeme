const BondingCurvedToken = artifacts.require("BondingCurvedToken");

contract('BondingCurvedTokenTest', async function (accounts) {

  before('Make fresh contract', async function () {
    newToken = await BondingCurvedToken.new(
      "test curve",
      "MEME",
      18,
      2
    )
  });

  // Validate that the contract has been initialized properly.
  it("Is initiated correcly", async () => {
    const poolBalance = await newToken.poolBalance.call();
    assert.equal(poolBalance, 0);
    const totalSupply = await newToken.totalSupply.call();
    assert.equal(totalSupply, 0);
    const exponent = await newToken.exponent.call();
    assert.equal(exponent, 2);
  });

  it("Allows for the buying of tokens using ether", async function() {
    let balance = await newToken.balanceOf(accounts[1]);
    assert.equal(balance.toNumber(), 0);

    const priceToMint1 = await newToken.priceToMint.call(50);
    await newToken.buy(50, accounts[1], {
      value: priceToMint1,
      from: accounts[1]
    });

    balance = await newToken.balanceOf(accounts[1]);
    const poolBalance1 = await newToken.poolBalance.call();
    assert.equal(
      poolBalance1.toNumber(),
      priceToMint1.toNumber(),
      "poolBalance should now be the total amount paid for minting so far"
    );

    const totalSupply1 = await newToken.totalSupply();
    assert.equal(
      balance.toNumber(),
      totalSupply1.toNumber(),
      "account 1 should have the totalSupply of tokens issued so far"
    );

    assert.equal(
      totalSupply1.toNumber(),
      50,
      "the totalSupply of tokens issued so far should be 50"
    );

    const priceToMint2 = await newToken.priceToMint.call(50);
    assert.isAbove(priceToMint2.toNumber(), priceToMint1.toNumber());
    await newToken.buy(50, accounts[2], { value: priceToMint2, from: accounts[2] });

    const poolBalance2 = await newToken.poolBalance.call();
    assert.equal(
      poolBalance2.toNumber(),
      priceToMint1.toNumber() + priceToMint2.toNumber(),
      "poolBalance is the price paid the total price paid to mint so far"
    );

    const totalSupply2 = await newToken.totalSupply();
    assert.equal(
      totalSupply2.toNumber(),
      100,
      "the totalSupply of tokens issued so far should be 100"
    );

    balance = await newToken.balanceOf(accounts[2]);
    assert.equal(
      balance.toNumber(),
      50,
      "account 2 should have 50 tokens"
    );

    // Try to pay less than the new price for tokens, ensure this fails.
    let didThrow = false;
    const priceToMint3 = await newToken.priceToMint.call(50);
    try {
      await newToken.buy(50, accounts[2], {
        value: priceToMint3.toNumber() - 1,
        from: accounts[2]
      });
    } catch (e) {
      didThrow = true;
    }
    assert.isTrue(didThrow);
  });

  it("Allows for selling of tokens and receiving ether in return", async () => {
    const poolBalance1 = await newToken.poolBalance.call();
    const totalSupply1 = await newToken.totalSupply.call();

    let totalEtherForSale = await newToken.calculateSaleReturn.call(50);

    await newToken.sell(50, { from: accounts[1] });

    let balance = await newToken.balanceOf(accounts[1]);
    assert.equal(
      balance.toNumber(),
      0,
      "User should have no tokens left"
    );

    const poolBalance2 = await newToken.poolBalance.call();
    assert.equal(
      poolBalance2.toNumber(),
      poolBalance1.toNumber() - totalEtherForSale.toNumber(),
      "The proper amount of ether was transfered back from the pool."
    );

    const totalSupply2 = await newToken.totalSupply.call();
    assert.equal(
      totalSupply2.toNumber(),
      totalSupply1.toNumber() - 50,
      "Total supply of tokens has been properly burned."
    );

    let totalEtherForSale2 = await newToken.calculateSaleReturn.call(50);
    await newToken.sell(50, { from: accounts[2] });

    balance = await newToken.balanceOf(accounts[2]);
    assert.equal(
      balance.toNumber(),
      0,
      "User should have no tokens left"
    );
    assert.isBelow(
      totalEtherForSale2.toNumber(),
      totalEtherForSale.toNumber(),
      "Price for later sale should be lower than earlier sale."
    );

    const poolBalance3 = await newToken.poolBalance.call();
    assert.equal(poolBalance3.toNumber(), 0);
    const totalSupply3 = await newToken.totalSupply.call();
    assert.equal(totalSupply3.toNumber(), 0);
  });

})
