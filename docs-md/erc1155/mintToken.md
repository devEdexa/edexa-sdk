# 📝 Mint Token

## For minting the token with the ERC1155 API, utilize the mintToken method:

---

```SDK.js
import { ERC1155, Network } from 'edeXa-sdk';

async function mintToken() {
  const erc1155 = new ERC1155({
      ...settings,
      authorization: `Bearer ${token}`,
    });
  const settings = {
    network: Network.SANDBOX, // or Network.MAINNET for the mainnet network
  };

  const dataToMintToken = {
    value(required): 'Enter the amount of tokens to mint',
    chaincode(optional): 'The name of the smart contract or chaincode managing the tokens',
    channel(optional): 'The name of the channel in the blockchain network'
  }

  try {
    const mintTokenResponse = await erc1155.mintToken(dataToMintToken);
  } catch (error) {
    // Handle the error
  }
}

```

---

- Please ensure that you replace the `token` used in the `Authorization` header with your own `token`, which you will receive in response to the [authentication method](./authenticate.md)
- In this example, the `mintToken` function is an `async` function that uses `await` to pause execution until the `erc1155.mintToken` promise resolves. If the promise resolves successfully, the response for minting the token will be logged. If an error occurs, it will be caught and logged using `console.error`
- Provide the amount of tokens you want to mint in the `value` field, respectively.
---

- Response Description: In response, the following attributes are included—`tokenId`, `minter`.

  | Key             | Type   |
  | --------------- | ------ |
  | tokenId         | string |
  | minter          | string |
