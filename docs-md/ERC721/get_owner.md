# 📝 Get owner of token
## To fetch the token owner with the ERC721 API, utilize the getOwner method:

---

```SDK.js
import { ERC721, Network } from 'edeXa-sdk';

async function getOwner() {
  const erc721 = new ERC721({
      ...settings,
      authorization: `Bearer ${token}`,
    });
  const settings = {
    network: Network.SANDBOX, // or Network.MAINNET for the mainnet network
  };

  const dataToGetOwner = {
    tokenId(required): 'Enter the particular tokenId to whom you want to see the owner',
    chaincode(optional): 'The name of the smart contract or chaincode managing the tokens',
    channel(optional): 'The name of the channel in the blockchain network'
  }

  try {
    const getOwnerResponse = await erc721.getOwner(dataToGetOwner);
  } catch (error) {
    // Handle the error
  }
}

```

---

- Please ensure that you replace the `token` used in the `Authorization` header with your own `token`, which you will receive in response to the [authentication method](./authenticate.md)
- In this example, the `getOwner` function is an `async` function that uses `await` to pause execution until the `erc721.getOwner` promise resolves. If the promise resolves successfully, the response for getting the owner of token will be logged. If an error occurs, it will be caught and logged using `console.error`

- To get an owner for a token, input the tokenId in the `tokenId` field. You can obtain this tokenId from the response of  [mint Token](./mint_token.md).

---

- Response Description: In response, the following attributes are included—`operator`;

  | Key             | Type   |
  | --------------- | ------ |
  | operator        | String |
