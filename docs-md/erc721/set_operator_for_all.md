# 📝 Set operator for all tokens
## To set operator for all token with the ERC721 API, utilize the setOperatorForAll method:

---

```SDK.js
import { ERC721, Network } from 'edeXa-sdk';

async function setOperatorForAll() {
  const erc721 = new ERC721({
      ...settings,
      authorization: `Bearer ${token}`,
    });
  const settings = {
    network: Network.SANDBOX, // or Network.MAINNET for the mainnet network
  };

  const dataToSetOperatorForAll = {
    operator(required): 'Enter the username of the user for whom you want to set operator for all tokens.',
    approve(required): 'Pass a boolean value 'true' to authorize setting an operator for all tokens.',
    chaincode(optional): 'The name of the smart contract or chaincode managing the tokens',
    channel(optional): 'The name of the channel in the blockchain network'
  }

  try {
    const setOperatorForAllResponse = await erc721.setOperatorForAll(dataToSetOperatorForAll);
  } catch (error) {
    // Handle the error
  }
}

```

---

- Please ensure that you replace the `token` used in the `Authorization` header with your own `token`, which you will receive in response to the [authentication method](./authenticate.md)
- In this example, the `setOperatorForAll` function is an `async` function that uses `await` to pause execution until the `erc721.setOperatorForAll` promise resolves. If the promise resolves successfully, the response for setting the operator for  all tokens will be logged. If an error occurs, it will be caught and logged using `console.error`

- To set an operator for all tokens, input the username of the user in the `operator` field. You can obtain this username from the response of either the [enroll users](./) or [account Id](./account.md).

- In this context, an "operator" refers to someone authorized to spend all tokens on behalf of a token owner.

---

- Response Description: In response, the following attributes are included—`operator`, `owner`, `approve`;

  | Key             | Type   |
  | --------------- | ------ |
  | operator        | String |
  | owner           | String |
  | approve         | Boolean|
