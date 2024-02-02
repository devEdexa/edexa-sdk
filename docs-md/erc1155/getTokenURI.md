# 📝 Get Token URI
## To Get Token URI with the ERC1155 API, utilize the getTokenURI method:

---

```SDK.js
import { ERC1155, Network } from 'edeXa-sdk';

async function getTokenURI() {
  const erc1155 = new ERC1155({
      ...settings,
      authorization: `Bearer ${token}`,
    });
  const settings = {
    network: Network.SANDBOX, // or Network.MAINNET for the mainnet network
  };

  const dataToGetTokenURI = {
    tokenId(required): 'Enter the tokenId of the token to retrieve its URL.',
    chaincode(optional): 'The name of the smart contract or chaincode managing the tokens',
    channel(optional): 'The name of the channel in the blockchain network'
  }

  try {
    const getTokenURIResponse = await erc1155.getTokenURI(dataToGetTokenURI);
  } catch (error) {
    // Handle the error
  }
}

```

---

- Please ensure that you replace the `token` used in the `Authorization` header with your own `token`, which you will receive in response to the [authentication method](./authenticate.md)
- In this example, the `getTokenURI` function is an `async` function that uses `await` to pause execution until the `erc1155.getTokenURI` promise resolves. If the promise resolves successfully, the response for set operator for token will be logged. If an error occurs, it will be caught and logged using `console.error`

- Provide the tokenId of the token for which you want to get the URI in the `tokenId` field. You will obtain the tokenId in the response of either [Mint Token](./mintToken.md) or [Batch Mint Token](./batchMintToken.md).

---

- Response Description: In response, the following attributes are included—`URI`.

  | Key       | Type   |
  | --------- | ------ |
  | URI       | string |  