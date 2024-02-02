# 📝Account Id of user

## For retriving the getAccount of user with the ERC1155 API, utilize the getAccount method:

---

```SDK.js
import { ERC1155, Network } from 'edeXa-sdk';

async function getAccount() {
  const erc1155 = new ERC1155({
      ...settings,
      authorization: `Bearer ${token}`,
    });
  const settings = {
    network: Network.SANDBOX, // or Network.MAINNET for the mainnet network
  };

  const dataToGetAccountId = {
    userId(optional): 'Enter the `uuid` of user for whom you want to retrieve the getAccount',
    chaincode(optional): 'The name of the smart contract or chaincode managing the tokens',
    channel(optional): 'The name of the channel in the blockchain network'
  }

  try {
    const accountIdResponse = await erc1155.getAccount(dataToGetAccountId);
  } catch (error) {
    // Handle the error
  }
}

```

---

- Please ensure that you replace the `token` used in the `Authorization` header with your own `token`, which you will receive in response to the [authentication method](./authenticate.md)
- In this example, the `getAccount` function is an `async` function that uses `await` to pause execution until the `erc1155.getAccount` promise resolves. If the promise resolves successfully, the response for account Id of user will be logged. If an error occurs, it will be caught and logged using `console.error`

- Before attempting to retrieve the account ID of a user, ensure that you have enrolled users.

- Provide the `uuid` of the user for whom you intend to fetch the account ID in the userId field. You will obtain the `uuid` in the response of the [enroll users](./enroll_users.md).

- The account ID (username) received in the response is utilized for transferring tokens to that specific account of the user.
---

- Response Description: In response, the following attributes are included—`username`.

  | Key             | Type   |
  | --------------- | ------ |
  | username        | string |
