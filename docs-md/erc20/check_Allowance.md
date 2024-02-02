# 📝 Spender Allowance Limit

## To inquire about the approved spending limit for a specific spender with the ER20 API. utilize the checkAllowanceLimit method.:

---

```SDK.js
import { ERC20, Network } from 'edeXa-sdk';

async function checkAllowanceLimit() {
  const erc20 = new ERC20({
      ...settings,
      authorization: `Bearer ${token}`,
    });
  const settings = {
    network: Network.SANDBOX, // or Network.MAINNET for the mainnet network
  };

  const dataTocheckAllowance = {
    spender(required): 'Enter the username of the user for whom you want to check the approved allowance limit.',
    chaincode(optional): 'The name of the smart contract or chaincode managing the tokens',
    channel(optional): 'The name of the channel in the blockchain network'
  }

  try {
    const checkAllowanceResponse = await erc20.checkAllowanceLimit(dataTocheckAllowance);
  } catch (error) {
    // Handle the error
  }
}

```

---

- Please ensure to replace the `token` used in the `Authorization` header with your own unique `token`, which you will obtain in response to the [authentication method](./authenticate.md)

- In this example, the `checkAllowanceLimit` function is an `async` function that utilizes `await` to pause execution until the `erc20.checkAllowanceLimit` promise resolves. If the promise resolves successfully, the response for check approved spender allowance will be logged. In case of an error, it will be caught and logged using `console.error`.

- Before attempting to fetch the spender allowance, make sure that you have approved some allowance to that particular spender.You will approve the allowance to user using this set operator function (set operator)[./set_operator.md]

- Provide the username of the user for whom you wish to fetch the approved allowance in the `spender` field. You will obtain the username in the response of the [enroll users](./enroll_users.md) or [account Id](./accountId.md)
---

- Response Description: In response, the following attributes are included—`allowanceLimit`,`to`.

  | Key             | Type   |
  | --------------- | ------ |
  | allowanceLimit  | number |
  | to              | string |

