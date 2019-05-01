const CaptionCard = artifacts.require("CaptionCard");

contract('CaptionCardTests', async function (accounts) {
  const precision = 10000000000;
  const amountToSend = precision/ 2 * (50 ** 2) / precision;

  before('Make fresh contract', async function () {
    captionCard = await CaptionCard.new(
      "test hash",
      accounts[5]
    )
  });

  // Validate that the contract has been initialized properly.
  it("Is initiated correcly", async () => {
    const poolBalance = await captionCard.poolBalance.call();
    assert.equal(poolBalance, 0);
    const totalSupply = await captionCard.totalSupply.call();
    assert.equal(totalSupply, 0);
    const exponent = await captionCard.exponent.call();
    assert.equal(exponent, 1);
    const caption = await captionCard.captionText.call();
    assert.equal(caption, "test hash");
    const creator = await captionCard.creator.call();
    assert.equal(creator, accounts[5]);
  });

  it("CaptionCard Can Be Bought", async function() {
    let balance = await captionCard.balanceOf(accounts[1]);
    assert.equal(balance.toNumber(), 0);

    const priceToMint1 = await captionCard.priceToMint.call(50);

    assert.equal(
      priceToMint1.toNumber(),
      amountToSend,
      "Price to mint is correct."
    );

    await captionCard.buy(50, accounts[1], {
      value: priceToMint1,
      from: accounts[1]
    });

    balance = await captionCard.balanceOf(accounts[1]);
    const poolBalance1 = await captionCard.poolBalance.call();
    assert.equal(
      poolBalance1.toNumber(),
      priceToMint1.toNumber(),
      "poolBalance should now be the total amount paid for minting so far"
    );

    const totalSupply1 = await captionCard.totalSupply();
    assert.equal(
      balance.toNumber(),
      50,
      "account 1 should have 50 tokens now"
    );

    assert.equal(
      totalSupply1.toNumber(),
      50,
      "the totalSupply of tokens issued so far should be 100"
    );

    // Try to pay less than the new price for tokens, ensure this fails.
    let didThrow = false;
    const priceToMint3 = await captionCard.priceToMint.call(50);
    try {
      await captionCard.buy(50, accounts[2], {
        value: priceToMint3.toNumber() - 1,
        from: accounts[2]
      });
    } catch (e) {
      didThrow = true;
    }
    assert.isTrue(didThrow);

    // Try to pay more than the new price for tokens, ensure this passes.
    let didNotThrow = true;
    const priceToMint4 = await captionCard.priceToMint.call(50);
    try {
      await captionCard.buy(50, accounts[2], {
        value: priceToMint4.toNumber() + 1,
        from: accounts[2]
      });
    } catch (e) {
      didNotThrow = false;
    }
    assert.isTrue(didNotThrow);
  });

  it("CaptionCard can be sold", async () => {
    const poolBalance1 = await captionCard.poolBalance.call();
    const totalSupply1 = await captionCard.totalSupply.call();

    let totalEtherForSale = await captionCard.calculateSaleReturn.call(50);

    await captionCard.sell(50, { from: accounts[1] });

    let balance = await captionCard.balanceOf(accounts[1]);
    assert.equal(
      balance.toNumber(),
      0,
      "User should have no tokens left"
    );

    const poolBalance2 = await captionCard.poolBalance.call();
    assert.equal(
      poolBalance2.toNumber(),
      poolBalance1.toNumber() - totalEtherForSale.toNumber(),
      "The proper amount of ether was transfered back from the pool."
    );

    const totalSupply2 = await captionCard.totalSupply.call();
    assert.equal(
      totalSupply2.toNumber(),
      totalSupply1.toNumber() - 50,
      "Total supply of tokens has been properly burned."
    );
  });

  it("Quantity of 0 CaptionCard can be minted for 0 dollars", async () => {
    const priceToMint = await captionCard.priceToMint.call(0);

    assert.equal(
      priceToMint.toNumber(),
      0,
      "Price to mint is correct."
    );
  });
})
