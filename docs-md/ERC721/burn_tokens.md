# 📝 Burn Tokens
## To burn tokens with the ERC721 API, utilize the burnToken method:

---

```SDK.js
import { ERC721, Network } from 'edeXa-sdk';

async function burnToken() {
  const erc721 = new ERC721({
      ...settings,
      authorization: `Bearer ${token}`,
    });
  const settings = {
    network: Network.SANDBOX, // or Network.MAINNET for the mainnet network
  };

  const dataToBurnToken = {
    tokenId: 'Enter the tokenId you want to burn',
    chaincode(optional): 'The name of the smart contract or chaincode managing the tokens',
    channel(optional): 'The name of the channel in the blockchain network'
  }

  try {
    const burnTokenResponse = await erc721.burnToken(dataToBurnToken);
  } catch (error) {
    // Handle the error
  }
}

```
---

- Please ensure that you replace the `token` used in the `Authorization` header with your own `token`, which you will receive in response to the [authentication method](./authenticate.md)

- In this example, the `burnToken` function is an `async` function that uses `await` to pause execution until the `erc721.burnToken` promise resolves. If the promise resolves successfully, the response for burn tokens will be logged. If an error occurs, it will be caught and logged using `console.error`

- Provide the tokenId you want to burn in the `tokenId` field, respectively.You will get the tokenId in the response of [mint tokens](./mint_token.md)

---

- Response Description: In response, the following attributes are included—`burner`;

  | Key             | Type   |
  | --------------- | ------ |
  | burner          | String |

