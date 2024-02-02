# 📝 Transfer Token to users
## For transferring the tokens to users with the ERC721 API, utilize the tokenTransfer method:

---

```SDK.js
import { ERC721, Network } from 'edeXa-sdk';

async function tokenTransfer() {
  const erc721 = new ERC721({
      ...settings,
      authorization: `Bearer ${token}`,
    });
  const settings = {
    network: Network.SANDBOX, // or Network.MAINNET for the mainnet network
  };

  const dataToTokenTransfer = {
    to(required): 'Enter the username of user to whom you want to transfer the tokens',
    tokenId(required): 'Enter the tokenId to transfer'
    chaincode(optional): 'The name of the smart contract or chaincode managing the tokens',
    channel(optional): 'The name of the channel in the blockchain network'
  }

  try {
    const tokenTransferResponse = await erc721.tokenTransfer(dataToTokenTransfer);
  } catch (error) {
    // Handle the error
  }
}

```

---

- Please ensure that you replace the `token` used in the `Authorization` header with your own `token`, which you will receive in response to the [authentication method](./authenticate.md)
- In this example, the `tokenTransfer` function is an `async` function that uses `await` to pause execution until the `erc721.tokenTransfer` promise resolves. If the promise resolves successfully, the response for transfer the tokens  will be logged. If an error occurs, it will be caught and logged using `console.error`

- Provide the username of the user to whom you want to transfer the tokens in the `to` field. You will obtain the username in the response of the [enroll users](./) or [account Id](./account_Id.md)

- Provide the tokenId for transfer the token  in the `tokenId` field respectively.You will obtain the `tokenId` in the response of the [mint Token](./mint_token.md)

---

- Response Description: In response, the following attributes are included—`from`, `to`, `tokenId`;

  | Key             | Type   |
  | --------------- | ------ |
  | from            | String |
  | to              | String |
  | tokenId         | String |
