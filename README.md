# Legaci Smart Contracts
This repository contains code powering the Legaci NFT's.

### Contracts
The `contracts` folder contains the core smart contract files detailing Flow resources and capabilities.

We can deploy smart contracts with the given configuration in our `flow.json` with the following command:
```
flow project deploy
```

Updating a contract once deployed can be done via:
```
flow accounts update-contract LegaciCollectible ./contracts/LegaciCollectible.cdc 
```

Note, import statements must be adjusted if smart contracts are deployed to the blockchain or not.

### Scripts
The `scripts` folder contains Flow blockchain code used to read data from Legaci blockchain resources.

Call a script with the following syntax:
```
flow scripts execute ./scripts/get_brand_ids.cdc
```

Read more [here](https://docs.onflow.org/flow-cli/execute-scripts).

### Transactions
The `transactions` folder contains Flow blockchain code used to manipulate data from Legaci blockchain resources.

Call a transaction with the following syntax:
```
flow transactions send ./transactions/create_brand.cdc \
    --args-json '[{"type": "String", "value": "7d8ceef0-b481-45c8-973b-2846f288388e"}]' \
    --signer emulator-account
```

Read more [https://docs.onflow.org/flow-cli/send-transactions](https://docs.onflow.org/flow-cli/send-transactions).