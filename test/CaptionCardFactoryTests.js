const CaptionCardFactory = artifacts.require("CaptionCardFactory");
const CaptionCard = artifacts.require("CaptionCard");

contract('CaptionCardFactoryTests', async function (accounts) {
  beforeEach('Make fresh contract', async function () {
    factory = await CaptionCardFactory.new(
      {from: accounts[7]}
    )
  });

  it("CaptionCard with same caption is not duplicated", async function() {
    await factory.addCaptionCard("yo", {from: accounts[1]});

    let didThrow = false;
    try {
      await factory.addCaptionCard(
        "yo",
        {from: accounts[1]});
    } catch (e) {
      didThrow = true;
    }
    assert.isTrue(didThrow);
  });

  it("Gets correct number of caption cards", async function() {
    let length = await factory.getCaptionCardsLength.call();
    assert.equal(length.toNumber(), 0, "Initial caption card length is correct");

    await factory.addCaptionCard("card 1", {from: accounts[1]});
    length = await factory.getCaptionCardsLength.call();
    assert.equal(length.toNumber(), 1, "Properly updates length");

    await factory.addCaptionCard("card 2", {from: accounts[2]});
    await factory.addCaptionCard("card 3", {from: accounts[3]});
    await factory.addCaptionCard("card 4", {from: accounts[4]});
    length = await factory.getCaptionCardsLength.call();
    assert.equal(length.toNumber(), 4, "Properly updates length");
  });


  it("CaptionCard bought is actually owned by buyer not sender", async function() {
    await factory.addCaptionCard("test", {from: accounts[1]});
    const newCardAddress = await factory.captionCards.call(0);
    const captionCard = await CaptionCard.at(newCardAddress);
    const priceToMint = await captionCard.priceToMint.call(50);
    await captionCard.buy(50, accounts[1], {
      value: priceToMint,
      from: accounts[1]
    });

    let balance = await captionCard.balanceOf(accounts[7]);
    assert.equal(
      balance.toNumber(),
      0,
      "Account 7 should have no captionCard1"
    );

    balance = await captionCard.balanceOf(accounts[1]);
    assert.equal(
      balance.toNumber(),
      50,
      "Account 1 should have 50 captionCard1"
    );

    await factory.addCaptionCard("test2", {from: accounts[3]});

    const newCardAddress2 = await factory.captionCards.call(1);
    const captionCard2 = await CaptionCard.at(newCardAddress2);
    const priceToMint2 = await captionCard2.priceToMint.call(20);
    await captionCard2.buy(20, accounts[3], {
      value: priceToMint2,
      from: accounts[3]
    });

    let balance2 = await captionCard2.balanceOf(accounts[7]);
    assert.equal(
      balance2.toNumber(),
      0,
      "Account 7 should have no captionCard2");

    balance2 = await captionCard2.balanceOf(accounts[3]);
    assert.equal(
      balance2.toNumber(),
      20,
      "Account 3 should have 20 of captionCard2"
    );

    balance2 = await captionCard2.balanceOf(accounts[1]);
    assert.equal(
      balance2.toNumber(),
      0,
      "Account 1 should have 0 of captionCard2"
    );
  });

  it("Test caption collision", async function() {
    let cap1 = "000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000"
    let cap2 = "0000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000"
    await factory.addCaptionCard(
      cap1, {from: accounts[1]});
    await factory.addCaptionCard(
      cap2, {from: accounts[1]});
  });
})
