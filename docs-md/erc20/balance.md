# 📝 Balance Of tokens

## To inquire about the token balance in your account or to view the balance of a specific user, you must provide their userId with the ER20 API. This can be achieved by utilizing the balanceOf method.:

---

```SDK.js
import { ERC20, Network } from 'edeXa-sdk';

async function balanceOf() {
  const erc20 = new ERC20({
      ...settings,
      authorization: `Bearer ${token}`,
    });
  const settings = {
    network: Network.SANDBOX, // or Network.MAINNET for the mainnet network
  };

  const dataToGetBalance = {
    userId(optional): 'Enter the username of the user for whom you want to retrieve the balance.',
    chaincode(optional): 'The name of the smart contract or chaincode managing the tokens',
    channel(optional): 'The name of the channel in the blockchain network'
  }

  try {
    const balanceOfResponse = await erc20.balanceOf(dataToGetBalance);
  } catch (error) {
    // Handle the error
  }
}

```

---

- Please ensure to replace the `token` used in the `Authorization` header with your own unique `token`, which you will obtain in response to the [authentication method](./authenticate.md)

- In this example, the `balanceOf` function is an `async` function that utilizes `await` to pause execution until the `erc20.balanceOf` promise resolves. If the promise resolves successfully, the response for balanceOf will be logged. In case of an error, it will be caught and logged using `console.error`.

- Before attempting to fetch the user's balance, make sure that you have transferred some tokens to them.

- Provide the username of the user for whom you wish to fetch the token balance in the `userId` field. You will obtain the username in the response of the [enroll users](./enroll_users.md) or [account Id](./accountId.md)
---

- Response Description: In response, the following attributes are included—`balance`.

  | Key             | Type   |
  | --------------- | ------ |
  | balance         | number |
