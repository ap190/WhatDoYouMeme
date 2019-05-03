 ______    _______  _______  ______   __   __  _______
|    _ |  |       ||   _   ||      | |  |_|  ||       |
|   | ||  |    ___||  |_|  ||  _    ||       ||    ___|
|   |_||_ |   |___ |       || | |   ||       ||   |___
|    __  ||    ___||       || |_|   ||       ||    ___|
|   |  | ||   |___ |   _   ||       || ||_|| ||   |___
|___|  |_||_______||__| |__||______| |_|   |_||_______|

================================================================

Login: ap70

### Instructions of how to run deliverables
================================================================

### Solidity Contracts and Tests ###

The solidity contracts for this project are in the the contracts folder.
Tests for these contracts are contained within the test folder. In order to run
these tests:

in the top level directory (WhatDoYouMeme)
run npm install

## upgrade the solidity compiler in truffle by running these commands
cd node_modules/truffle
npm install solc@0.5.2

then cd back into WhatDoYouMeme top level directory and run
export PATH=$(npm bin):$PATH


## spin up a private blockchain on your computer with ganache
open a new terminal tab and

run the command ‘ganache-cli’

Wait till you see ‘Listening on 127.0.0.1:8545’

## Return to other tab and run tests by:
running the command 'truffle test' and see that all 10 tests pass

### Running the front end and server ###
