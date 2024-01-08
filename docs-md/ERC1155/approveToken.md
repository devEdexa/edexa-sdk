# 📝 Set Approval for token
## To set Approval for token with the ERC1155 API, utilize the approveTokenAccess method:

---

```SDK.js
import { ERC1155, Network } from 'edeXa-sdk';

async function approveTokenAccess() {
  const erc1155 = new ERC1155({
      ...settings,
      authorization: `Bearer ${token}`,
    });
  const settings = {
    network: Network.SANDBOX, // or Network.MAINNET for the mainnet network
  };

  const dataToSetApproval = {
    spender(required): 'Enter the username of user to whom you want to get approval for token access.
    value(required): 'The amount of tokens to approve for spending.'
    chaincode(optional): 'The name of the smart contract or chaincode managing the tokens',
    channel(optional): 'The name of the channel in the blockchain network'
  }

  try {
    const setOperatorResponse = await erc1155.approveTokenAccess(dataToSetApproval);
  } catch (error) {
    // Handle the error
  }
}

```

---

- Please ensure that you replace the `token` used in the `Authorization` header with your own `token`, which you will receive in response to the [authentication method](./authenticate.md)
- In this example, the `approveTokenAccess` function is an `async` function that uses `await` to pause execution until the `erc1155.approveTokenAccess` promise resolves. If the promise resolves successfully, the response for set operator for token will be logged. If an error occurs, it will be caught and logged using `console.error`

- Provide the username of the user to whom you want to set operator for token in the `spender` field. You will obtain the username in the response of the [enroll users](./enroll_users.md) or [account Id](./accountId.md).

- spender means to spend a specified amount of tokens on behalf of a user.',

---

- Response Description: In response, the following attributes are included—`to`,`allowanceAmount`.

  | Key             | Type   |
  | --------------- | ------ |
  | to              | string |
  | allowanceAmount | number |  