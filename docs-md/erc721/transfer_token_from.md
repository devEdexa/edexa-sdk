# 📝 Transfer Token from
## To transfer token from one user to another on behalf of the original token owner with the ERC721 API, utilize the tokenTransferFrom method:

---

```SDK.js
import { ERC721, Network } from 'edeXa-sdk';

async function tokenTransferFrom() {
  const erc721 = new ERC721({
      ...settings,
      authorization: `Bearer ${token}`,
    });
  const settings = {
    network: Network.SANDBOX, // or Network.MAINNET for the mainnet network
  };

  const dataToTokenTransferFrom = {
    to(required): 'Enter the username of recepient to whom you want to transfer the tokens',
    from(required): 'Enter the username of sender, sender has been approved for token transfers',
    tokenId(required): 'The tokenId of token to transfer'
    chaincode(optional): 'The name of the smart contract or chaincode managing the tokens',
    channel(optional): 'The name of the channel in the blockchain network'
  }

  try {
    const tokenTransferFromResponse = await erc721.tokenTransferFrom(dataToTokenTransferFrom);
  } catch (error) {
    // Handle the error
  }
}

```
---

- Please ensure that you replace the `token` used in the `Authorization` header with your own `token`, which you will receive in response to the [authentication method](./authenticate.md)
- In this example, the `tokenTransferFrom` function is an `async` function that uses `await` to pause execution until the `erc721.tokenTransferFrom` promise resolves. If the promise resolves successfully, the response for transfer the tokens from one user to another will be logged. If an error occurs, it will be caught and logged using `console.error`.

- The transferTokenFrom function is designed to facilitate the transfer of tokens from one user to another on behalf of the original token owner. The execution of this function requires prior approval from the token owner, which should be granted using the approve function. For details, refer to [Set operator](./set_operator.md).

- To initiate the token transfer, provide the target user's username in the `to` field. You can obtain this username from the response of of the [enroll users](./) or [Account Id](./account_Id.md)

- Ensure that the username entered in the `from` field has been approved for token transfers. Approval can be granted using the Set operator function [Set operator](./set_operator.md).

---

- Response Description: In response, the following attributes are included—`spender`, `to`, `tokenId`;

  | Key             | Type   |
  | --------------- | ------ |
  | spender         | String |
  | to              | String |
  | tokenId         | String |
