# 📝 Set operator for token
## To set operator for token with the ERC721 API, utilize the setOperator method:

---

```SDK.js
import { ERC721, Network } from 'edeXa-sdk';

async function setOperator() {
  const erc721 = new ERC721({
      ...settings,
      authorization: `Bearer ${token}`,
    });
  const settings = {
    network: Network.SANDBOX, // or Network.MAINNET for the mainnet network
  };

  const dataToSetOperator = {
    operator(required): 'Enter the username of user to whom you want to set operator for tokens.
    tokenId(required): 'Enter the tokenId to approve for spending',
    chaincode(optional): 'The name of the smart contract or chaincode managing the tokens',
    channel(optional): 'The name of the channel in the blockchain network'
  }

  try {
    const setOperatorResponse = await erc721.setOperator(dataToSetOperator);
  } catch (error) {
    // Handle the error
  }
}

```

---

- Please ensure that you replace the `token` used in the `Authorization` header with your own `token`, which you will receive in response to the [authentication method](./authenticate.md)
- In this example, the `setOperator` function is an `async` function that uses `await` to pause execution until the `erc721.setOperator` promise resolves. If the promise resolves successfully, the response for setting the operator for tokens will be logged. If an error occurs, it will be caught and logged using `console.error`

- To set an operator for a token, input the username of the user in the `operator` field. You can obtain this username from the response of either the [enroll users](./) or [account Id](./account_Id.md).

- Additionally, provide the `tokenId` in the `tokenId` field to allow the operator to spend the `tokenUrl` on behalf of the token owner. You can get the `tokenId` from the response of the [mint Token](./mint_token.md).

- In this context, an "operator" refers to someone authorized to spend a specified `tokenUrl` on behalf of a token owner.

---

- Response Description: In response, the following attributes are included—`operator`, `owner`, `tokenId`;

  | Key             | Type   |
  | --------------- | ------ |
  | operator        | String |
  | owner           | String |
  | tokenId         | String |
