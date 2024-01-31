# 📝Transfer Token to users
## For transferring the tokens to users with the ERC1155 API, utilize the tokenTransfer method:

---

```SDK.js
import {ERC1155, Network } from 'edeXa-sdk';

async function transferToken() {
  const erc1155 = new ERC1155({
      ...settings,
      authorization: `Bearer ${token}`,
    });
  const settings = {
    network: Network.SANDBOX, // or Network.MAINNET for the mainnet network
  };

  const dataToTransferToken = {
    to(required): 'Enter the username of user to whom you want to transfer the tokens',
    tokenId(required): 'Enter the tokenId of Token which are transfer tokens to the user',
    value(required): 'The amount of tokens to transfer'
    chaincode(optional): 'The name of the smart contract or chaincode managing the tokens',
    channel(optional): 'The name of the channel in the blockchain network'
  }

  try {
    const transferTokenResponse = await erc1155.tokenTransfer(dataToTransferToken);
  } catch (error) {
    // Handle the error
  }
}

```

---

- Please ensure that you replace the `token` used in the `Authorization` header with your own `token`, which you will receive in response to the [authentication method](./authenticate.md)
- In this example, the `tokenTransfer` function is an `async` function that uses `await` to pause execution until the `erc1155.tokenTransfer` promise resolves. If the promise resolves successfully, the response for transfer token will be logged. If an error occurs, it will be caught and logged using `console.error`

- Provide the username of the user to whom you want to transfer the tokens in the `to` field. You will obtain the username in the response of the [enroll users](./enroll_users.md) or [account Id](./accountId.md)
- Enter the tokenId of the token being transferred to the user in the `tokenId` field.
---

- Response Description: In response, the following attributes are included—`to`,`from`.

  | Key             | Type   |
  | --------------- | ------ |
  | to              | string |
  | from            | string |