# 📝 Get Token URI.
## To fetch the tokenURI with the ERC721 API. This can be achieved by utilizing the getTokenURI method:

---

```SDK.js
import { ERC721, Network } from 'edeXa-sdk';

async function getTokenURI() {
  const erc721 = new ERC721({
      ...settings,
      authorization: `Bearer ${token}`,
    });
  const settings = {
    network: Network.SANDBOX, // or Network.MAINNET for the mainnet network
  };

  const dataToGetTokenURI = {
    tokenId(required): 'Enter the tokenId to whom you want to get the token Url'
  }

  try {
    const getTokenURIResponse = await erc721.getTokenURI(dataToGetTokenURI);
  } catch (error) {
    // Handle the error
  }
}

```

---

- Please ensure that you replace the `token` used in the `Authorization` header with your own `token`, which you will receive in response to the [authentication method](./authenticate.md)

- In this example, the `getTokenURI` function is an `async` function that uses `await` to pause execution until the `erc721.getTokenURI` promise resolves. If the promise resolves successfully, the response for getting the token Url  will be logged. If an error occurs, it will be caught and logged using `console.error`

- Before attempting to fetch the token Url, make sure that the ERC721 tokens have been minted. The minting process should be implemented using the specific minting function [Mint Tokens](./mint_token.md)

- Provide the tokenId for getting the token Url in the `tokenId` field respectively.You will obtain the `tokenId` in the response of the [mint Token](./mint_token.md)

---

- Response Description: In response, the following attributes are included—`URI`;

  | Key             | Type   |
  | --------------- | ------ |
  | URI             | string |

