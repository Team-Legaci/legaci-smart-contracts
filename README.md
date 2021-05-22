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

### Example Usages
```
flow transactions send ./transactions/mint_legaci_collectible.cdc \
    --arg String:"7d8ceef0-b481-45c8-973b-2846f288388e" \
    --arg String:"e66b99d2-6e58-4223-ad71-050d12878f73" \
    --arg String:"78122c79-b472-403d-b631-028d137e276f" \
    --arg Address:0xf8d6e0586b0a20c7 \
    --signer emulator-account
```

```
flow scripts execute ./scripts/get_metadata.cdc \
    --arg Address:0xf8d6e0586b0a20c7 \
    --arg UInt64: 1
```

```
flow scripts execute ./scripts/get_legaci_collectible_ids.cdc \
    --arg Address:0xf8d6e0586b0a20c7
```