# 📝 Check operator is authorised for all tokens.
## For checking the operator is authorised for all tokens with the ERC721 API, utilize the getApproveStatus method:

---

```SDK.js
import { ERC721, Network } from 'edeXa-sdk';

async function getApproveStatus() {
  const erc721 = new ERC721({
      ...settings,
      authorization: `Bearer ${token}`,
    });
  const settings = {
    network: Network.SANDBOX, // or Network.MAINNET for the mainnet network
  };

  const dataToCheckStatus = {
    operator(required): 'Enter the username of the user for whom you want to check the operator status for all tokens',
    chaincode(optional): 'The name of the smart contract or chaincode managing the tokens',
    channel(optional): 'The name of the channel in the blockchain network'
  }

  try {
    const checkStatusResponse = await erc721.getApproveStatus(dataToCheckStatus);
  } catch (error) {
    // Handle the error
  }
}

```

---

- Please ensure that you replace the `token` used in the `Authorization` header with your own `token`, which you will receive in response to the [authentication method](./authenticate.md)

- In this example, the `getApproveStatus` function is an `async` function that uses `await` to pause execution until the `erc721.getApproveStatus` promise resolves. If the promise resolves successfully, the response for getting the approved sttaus will be logged. If an error occurs, it will be caught and logged using `console.error`

- To get an operator is authorized for all tokens, please ensure that you have previously set the operator for all tokens using the [setOperatorForAll](./set_operator_for_all.md) function.

- Provide the username of the user for whom you want to check the operator status before setting as an operator for all tokens in the `operator` field, respectively.

---

- Response Description: In response, the following attributes are included—`approve`;

  | Key             | Type   |
  | --------------- | ------ |
  | approve         | Boolean|