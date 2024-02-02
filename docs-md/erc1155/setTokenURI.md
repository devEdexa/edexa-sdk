# 📝 Set Token URI
## To set Token URI with the ERC1155 API, utilize the setTokenURI method:

---

```SDK.js
import { ERC1155, Network } from 'edeXa-sdk';

async function setTokenURI() {
  const erc1155 = new ERC1155({
      ...settings,
      authorization: `Bearer ${token}`,
    });
  const settings = {
    network: Network.SANDBOX, // or Network.MAINNET for the mainnet network
  };

  const dataToSetTokenURI = {
    tokenId(required): 'Enter the tokenId of the token to add a new URL.',
    URL(required): 'Enter or set the new URL for the given tokenId.'
    chaincode(optional): 'The name of the smart contract or chaincode managing the tokens',
    channel(optional): 'The name of the channel in the blockchain network'
  }

  try {
    const setTokenURIResponse = await erc1155.setTokenURI(dataToSetTokenURI);
  } catch (error) {
    // Handle the error
  }
}

```

---

- Please ensure that you replace the `token` used in the `Authorization` header with your own `token`, which you will receive in response to the [authentication method](./authenticate.md)
- In this example, the `approveTokenAccess` function is an `async` function that uses `await` to pause execution until the `erc1155.approveTokenAccess` promise resolves. If the promise resolves successfully, the response for set operator for token will be logged. If an error occurs, it will be caught and logged using `console.error`

- Provide the tokenId of the token for which you want to set the URI in the `tokenId` field. You will obtain the tokenId in the response of either [Mint Token](./mintToken.md) or [Batch Mint Token](./batchMintToken.md).

---

- Response Description: In response, the following attributes are included—`tokenId`,`URI`.

  | Key       | Type   |
  | --------- | ------ |
  | tokenId   | string |
  | URI       | string |  