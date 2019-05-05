______    _______  _______  ______   __   __  _______
|    _ |  |       ||   _   ||      | |  |_|  ||       |
|   | ||  |    ___||  |_|  ||  _    ||       ||    ___|
|   |_||_ |   |___ |       || | |   ||       ||   |___
|    __  ||    ___||       || |_|   ||       ||    ___|
|   |  | ||   |___ |   _   ||       || ||_|| ||   |___
|___|  |_||_______||__| |__||______| |_|   |_||_______|

================================================================

Login: ap70

### Project Vision
================================================================
For the purpose of this project, I wanted to implement a fun DApp that would give
me the opportunity to see how we take the contracts we built in something like
the CryptoBears project and turn them into a fully functioning DApp. I wanted to
create a never-ending, public, distributed, blockchain-based game of the card game
What Do You Meme(https://whatdoyoumeme.com/), where participants compete to create
the funniest meme by pairing the best Caption Card with the Photo Card in play.

In the traditional game, a rotating centralized judge is chosen to determine which
Caption Card best completes the Photo (Meme) Card in play. That obviously makes which
card wins very subjective to the judge's sense of humor, rather than that of all the
participants. So in my decentralized version, I wanted all participants to have a
role in deciding which card wins the round. So keeping this in mind, I designed
the Caption Cards in this game to be bonding curve contracts that issue
continuous ERC20 tokens. This provides each caption card with the properties of
limitless supply and instant liquidity- can be bought and sold at any time according
to a price determined by the curve- which make them ideal for this sort of game.
Because the price is based on a bonding curve, it will rise as players buy into it
and fall as they sell it, giving the most popular card the highest price.

In the game, I envisioned that each round would go something like this:
- Each round of the game lasts 24 hours
- A Meme (Photo) Card is chosen at random each round (sadly this is centralized
at this point in time, might eventually look into ways to design this so it can
be decentralized)
- Players can either buy into an existing Caption Card that they think best
completes the current Meme Card in play, or create a new one
- They can also sell cards that they don’t think fit with the current Caption Card
- At the end of the round, the Caption Card with the highest price is the winning card

Essentially, this encourages the curation of good content, and rewards content creators
and those with a good sense of humor who buy into a funny card early on.

I was inspired by the DApp http://www.cryptoagainsthumanity.net/#/home, and hoped
that at the end of the project I'd have a fully functioning fun DApp.

### Project Challenges
================================================================
- At the beginning of this project, I thought that I was going to reference
Crypto Against Humanity's repository and contract design decisions while implementing
my own project. Sadly, as I looked more into that after submitting my proposal,
I found that the code in their repository didn't work and that I didn't agree
with many of their design decisions (they implement their cards such that they
contain a Bonding Curved contract rather then extending one,
how they stored cards, etc). This definitely
made my project a much bigger undertaking than I initially anticipated.

- To begin, it was challenging to make design decisions with regards to the contracts
in the game. I spent a lot of time researching different concepts like Curation Markets,
TCRs, and Bonding curved tokens. I eventually decided to implement the cards as
bonding curved tokens, and created a factory contract to create and store the
Caption Cards.

- I worked off of existing implementations of these contracts that I found on github
and added citations for them at the top of my cod, but adapted them for
my use case and spent time testing them as well. Something that was particularly
difficult here was the fact that the OpenZeppelin library referenced in these contracts
had been updated and significantly changed to the point that the original
functionality in the contracts I was referencing no longer worked. I had to adapt
the bonding curve logic to the new library implementation. It was also challenging
to figure out how to write these tests and how to run them at all.

- Then I struggled to understand how to deploy these contracts (especially because
I wrote them with a lot of inheritance), and where to deploy them to. I did research
and found out about the Ropsten test network which I thought would be a good fit
for my project so that it could be fully tested before being deployed to the Mainnet.
Because my contracts used a lot of inheritance I had to collapse them into a single
file in order to deploy them. I then learned how to use
remix to deploy these contracts and how to check them on etherscan and
interact with them from remix. In the process I also learned about MetaMask-
an extension for accessing Ethereum enabled Dapps in your browser, and set up an
account to deploy my contracts.

- Next I built a react front end with some dummy data.

- The next challenge was understanding how to interact with these contracts from
the front end. I read up about web3.js- a collection of libraries which allow
you to interact with a local or remote Ethereum node. I learned that MetaMask
injects the Ethereum web3 API into every website's javascript context, so that
DApps can read from the blockchain. I set up code to interact with the Contracts
using web3, which was difficult, especially considering the web3 API recently
changed and many tutorials were no longer relevant.

I set up ways to buy and sell cards from the front end, and a way to read the
data from the contract card factory (which Caption Cards exist, what is the
price to buy and sell each one based on the associated bonding curve, how many
of these cards does the current user own, etc.).

- Next I wanted to set up a way to update the UI to reflect the state of the
corresponding transactions (whether a card was being bought or sold, or a new card
was created). I learned about Events and how to listen for them using Web3. I
also added things in react to enable UI feedback (loading states, alerts, etc),
and ensured that the UI updated when a state changing event was received
(buy, sell, new card, etc.).

- Then I also wanted to ensure that the site didn't break if someone without
MetaMask accessed it, so I added code to ensure that the MetaMask was installed
on the browser accessing the site, and that the account referenced was currently
on the ropsten network, and that an account was logged in at all. I added UI
to relay instructions to guide the user to that state.

- Next, I wanted to add a way to allow a user to switch accounts and to have the
the UI update to reflect the balance of the current user, this was also difficult
because Metamask's implementation recently changed so finding updated documentation
of how to do this was difficult.

- Finally, I spent a significant amount of time working on the app itself, in
terms of building a responsive front end in react, building a node server to
handle randomly choosing a meme from assets, handling updating the round time
and keeping it universally the same for all users, and handling various other
additional aspects of building a fully functional web app. I also figured out
how to deploy this app to heroku, which I had never done before this project.

### Project Takeaways
================================================================
All in all, I learned so much building this somewhat distributed DApp, which
is currently deployed on the Ropsten Test Network and can be accessed here:
https://what-do-you-crypto-meme.herokuapp.com/. I'm really
proud of the fact that I was able to build something that is live and seems to
be fully working, based on my testing it and having friends and classmates play
around with it.

While it was definitely a more challenging experience than I expected, I had a lot
of fun building this project, and perhaps got way too into it. Each stage of this
project included a lot of learning by reading medium articles and doing. I learned how
to design, write and test my own contracts. I learned how to deploy them,
how to interact with them from a front end using Web3, how to interact with
MetaMask from the front end, how to update the UI based on transaction state, and
more. I learned about bonding curves, MetaMask, the Ropsten test network, and so much
more.

I feel confident that I can apply these skills in building future DApps,
and perhaps making this one even more decentralized. I also think I have a much
better understanding of how DApps work as a whole and how they should be designed
based on my experience building this project. While in retrospect there are a
few things I would've done differently with regards to the game's contract design
(making the meme selection process decentralized, giving rewards to the winning
Caption Card, etc) I think this was a good first DApp, and I'm looking to building
more in the future.


### Instructions of how to run deliverables
================================================================

### Solidity Contracts and Tests ###

The solidity contracts for this project are in the the contracts folder.
Tests for these contracts are contained within the test folder. In order to run
these tests:

in the top level directory (WhatDoYouMeme)
run 'npm install'

## upgrade the solidity compiler in truffle by running these commands
cd node_modules/truffle
npm install solc@0.5.2

then cd back into WhatDoYouMeme top level directory and run
'export PATH=$(npm bin):$PATH'


## spin up a private blockchain on your computer with ganache
open a new terminal tab and
run 'export PATH=$(npm bin):$PATH'
run the command ‘ganache-cli’

Wait till you see ‘Listening on 127.0.0.1:8545’

## Return to other tab and run tests by:
running the command 'truffle test' and see that all 10 tests pass

### Running the front end and server ###


### Run the server in development mode
run `npm start` in the top level directory (WhatDoYouMeme)

### Then run the front end app in development mode
open another terminal
cd into the client directory
run 'npm install'
run `npm start`

Open [http://localhost:3000](http://localhost:3000) to view it in the browser.
And interact with the site.

### Note: You must have metamask installed, be logged in, grant the app access
to your accounts, and be on the Ropsten Test Network to use the site.
If you login, change network, etc refresh the site to get rid of the pink banner
and access the actual site.
If you have difficulty accessing the site, it is possible that you have privacy mode
enabled, to unlock:
Settings -> security and privacy -> switch off privacy mode

### See the live version of the app deployed at:
https://what-do-you-crypto-meme.herokuapp.com/
