# 📝 Batch Mint Token

## For minting the token with the ERC1155 API, utilize the batchMint method:

---

```SDK.js
import { ERC1155, Network } from 'edeXa-sdk';

async function batchMintToken() {
  const erc1155 = new ERC1155({
      ...settings,
      authorization: `Bearer ${token}`,
    });
  const settings = {
    network: Network.SANDBOX, // or Network.MAINNET for the mainnet network
  };

  const dataToBatchMintToken = {
    value(required): 'Enter the total amount of tokens you wish to mint in a single API or function call.',
    chaincode(optional): 'The name of the smart contract or chaincode managing the tokens',
    channel(optional): 'The name of the channel in the blockchain network'
  }

  try {
    const batchMintTokenResponse = await erc1155.batchMint(dataToMintToken);
  } catch (error) {
    // Handle the error
  }
}

```

---

- Please ensure that you replace the `token` used in the `Authorization` header with your own `token`, which you will receive in response to the [authentication method](./authenticate.md)
- In this example, the `batchMint` function is an `async` function that uses `await` to pause execution until the `erc1155.batchMint` promise resolves. If the promise resolves successfully, the response for minting the token will be logged. If an error occurs, it will be caught and logged using `console.error`
- This function is used to mint multiple tokens at the same time through a single API or single function call.
- Provide the amount of multiple tokens you want to mint in the `value` field, respectively.
- Enter an array containing the amounts of multiple tokens you wish to mint in a single API or single function call.
---

- Response Description: In response, the following attributes are included—`tokenId`, `minter`.

  | Key             | Type   |
  | --------------- | ------ |
  | tokenId         | array  |
  | minter          | string |
