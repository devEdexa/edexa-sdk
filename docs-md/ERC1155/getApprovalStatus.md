# 📝 Check Approval Status

## To inquire about the approval status for a specific spender with the ERC1155 API, use the getApproveStatus method.:

---

```SDK.js
import { ERC1155, Network } from 'edeXa-sdk';

async function checkApprovalStatus() {
  const erc1155 = new ERC1155({
      ...settings,
      authorization: `Bearer ${token}`,
    });
  const settings = {
    network: Network.SANDBOX, // or Network.MAINNET for the mainnet network
  };

  const dataTocheckApproval = {
    spender(required): 'Enter the username of the user for whom you wish to check the approval status.',
    chaincode(optional): 'The name of the smart contract or chaincode managing the tokens',
    channel(optional): 'The name of the channel in the blockchain network'
  }

  try {
    const checkApprovalResponse = await erc1155.getApproveStatus(dataTocheckApproval);
  } catch (error) {
    // Handle the error
  }
}

```

---

- Please ensure to replace the `token` used in the `Authorization` header with your own unique `token`, which you will obtain in response to the [authentication method](./authenticate.md)

- In this example, the `getApproveStatus` function is an `async` function that utilizes `await` to pause execution until the `erc1155.getApproveStatus` promise resolves. If the promise resolves successfully, the response for check approved spender allowance will be logged. In case of an error, it will be caught and logged using `console.error`.

- Before checking the approval status, ensure that you have granted some allowance to the specific spender. You can approve the allowance to the user using the [approve token access](./approveToken.md) function

- Provide the username of the user for whom you wish to fetch the approved allowance in the `spender` field. You will obtain the username in the response of the [enroll users](./enroll_users.md) or [account Id](./accountId.md)
---

- Response Description: In response, the following attributes are included—`allowanceLimit`,`to`.

  | Key      | Type   |
  | -------- | ------ |
  | status   | boolean|
  | to       | string |

