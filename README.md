## Flow Blockchain

Legaci leverages the [Flow](https://onflow.org/) blockchain to power our NFT implementation.

### Smart Contract Code

Navigate to `/src/contracts` to view code used to power our Legaci Collectible NFT Smart Contract.

### Scripts and Transactions

Interacting with the Smart Contract is done in scripts (similar to GraphQL queries) and transactions (similar to Graphql mutations). Navigate to `/src/scripts` and `/src/transactions` to view this code.

### Testing
Be sure to have run `yarn` to install all required dependencies.

Testing our flow blockchain code can be done with two commands. Start the Flow blockchain emulator with:

```
yarn flow:emulator
```

Then in a new terminal run the flow blockchain testing code:

```
yarn flow:test
```

The two commands above complete the following:

- Launch the flow emulator
- Deploy the NFT Contract and Legaci Smart Contract to the emulator
- Run `jest` testing for Flow cadence code

More details on the emulator instantiation [here](https://github.com/onflow/flow-js-testing/blob/master/docs/api.md#init).
