# 📝Batch Token Transfer to users
## For transferring the multiple tokens to users with the ERC1155 API, utilize the batchTokenTransfer method:

---

```SDK.js
import {ERC1155, Network } from 'edeXa-sdk';

async function batchTokenTransfer() {
  const erc1155 = new ERC1155({
      ...settings,
      authorization: `Bearer ${token}`,
    });
  const settings = {
    network: Network.SANDBOX, // or Network.MAINNET for the mainnet network
  };

  const dataToBatchTokenTransfer = {
    to(required): 'Enter the username of the user to whom you want to transfer the tokens.',
    tokenId(required): 'Enter multiple tokenIds of the tokens you want to transfer to the user.',
    value(required): 'Enter the respective amounts of tokens to transfer.'
    chaincode(optional): 'The name of the smart contract or chaincode managing the tokens',
    channel(optional): 'The name of the channel in the blockchain network'
  }

  try {
    const transferTokenResponse = await erc1155.batchTokenTransfer(dataToBatchTokenTransfer);
  } catch (error) {
    // Handle the error
  }
}

```

---

- Please ensure that you replace the `token` used in the `Authorization` header with your own `token`, which you will receive in response to the [authentication method](./authenticate.md)
- In this example, the `batchTokenTransfer` function is an `async` function that uses `await` to pause execution until the `erc1155.batchTokenTransfer` promise resolves. If the promise resolves successfully, the response for transfer token will be logged. If an error occurs, it will be caught and logged using `console.error`

- Provide the username of the user to whom you want to transfer the tokens in the `to` field. You will obtain the username in the response of the [enroll users](./enroll_users.md) or [account Id](./accountId.md)
- Enter the multiple tokenIds of the tokens being transferred to the user in the `tokenId` field.
- Enter the respective amounts of tokens being transferred to the user in the `value` field.
---

- Response Description: In response, the following attributes are included—`to`,`from`.

  | Key             | Type   |
  | --------------- | ------ |
  | to              | string |
  | from            | string |