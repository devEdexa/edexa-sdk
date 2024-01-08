# 📝 Get Batch Balance of Token

## To inquire about the token balance in your account or to view the balance of a specific user, you must provide their userId with the ER1155 API. This can be achieved by utilizing the getBatchBalance method.:

---

```SDK.js
import { ERC1155, Network } from 'edeXa-sdk';

async function batchBalance() {
  const erc1155 = new ERC1155({
      ...settings,
      authorization: `Bearer ${token}`,
    });
  const settings = {
    network: Network.SANDBOX, // or Network.MAINNET for the mainnet network
  };

  const dataToBatchBalance = {
    tokenId(required): 'Enter multiple tokenIds into the array for the tokens you want to retrieve the balance.'
    userId(required): 'Enter the username of the user for whom you want to retrieve the balance.',
    chaincode(optional): 'The name of the smart contract or chaincode managing the tokens',
    channel(optional): 'The name of the channel in the blockchain network'
  }

  try {
    const batchBalanceResponse = await erc1155.getBatchBalance(dataToBatchBalance);
  } catch (error) {
    // Handle the error
  }
}

```

---

- Please ensure that you replace the `token` used in the `Authorization` header with your own `token`, which you will receive in response to the [authentication method](./authenticate.md)
- In this example, the `getBatchBalance` function is an `async` function that uses `await` to pause execution until the `erc1155.getBatchBalance` promise resolves. If the promise resolves successfully, the response for minting the token will be logged. If an error occurs, it will be caught and logged using `console.error`
- Before attempting to fetch the user's balance, make sure that you have transferred some tokens to them.

- Provide the username of the user into the array for whom you wish to fetch the token balance in the `userId` field. You will obtain the username in the response of the [enroll users](./enroll_users.md) or [account Id](./getAccount.md)
- This function is used to get balance of multiple tokens at the same time through a single API or single function call.
---

- Response Description: In response, the following attributes are included—`balance`.

  | Key             | Type   |
  | --------------- | ------ |
  | balance         | array  |
