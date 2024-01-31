# 📝 Mint Tokens
## For minting the ERC721 token with the ERC721 API, use the mintToken method:

---

```SDK.js
import { ERC721, Network } from 'edeXa-sdk';

async function mintToken() {
  const erc721 = new ERC721({
      ...settings,
      authorization: `Bearer ${token}`,
    });
  const settings = {
    network: Network.SANDBOX, // or Network.MAINNET for the mainnet network
  };

  const dataToMintToken = {
    tokenUrl(required): 'Enter the token url',
    chaincode(optional): 'The name of the smart contract or chaincode managing the tokens',
    channel(optional): 'The name of the channel in the blockchain network'
  }

  try {
    const mintTokenResponse = await erc721.mintToken(dataToMintToken);
  } catch (error) {
    // Handle the error
  }
}

```

---

- Please ensure that you replace the `token` used in the `Authorization` header with your own `token`, which you will receive in response to the [authentication method](./authenticate.md)
- In this example, the `mintToken` function is an `async` function that uses `await` to pause execution until the `erc721.mintToken` promise resolves. If the promise resolves successfully, the response for minting the token  will be logged. If an error occurs, it will be caught and logged using `console.error`

- Provide the url for minting the token  in the `tokenUrl` field, respectively.


---

- Response Description: In response, the following attributes are included—`tokenId`, `tokenURI`, `minter`;

  | Key             | Type   |
  | --------------- | ------ |
  | tokenId         | String |
  | tokenURI        | String |
  | minter          | String |
