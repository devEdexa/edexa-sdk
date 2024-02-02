# 📝 Get Balance of tokens
## To inquire about the token balance in your account or to view the balance of a specific user, you must provide their userId with the ERC721 API. This can be achieved by utilizing the balanceOf method:

---

```SDK.js
import { ERC721, Network } from 'edeXa-sdk';

async function getBalance() {
  const erc721 = new ERC721({
      ...settings,
      authorization: `Bearer ${token}`,
    });
  const settings = {
    network: Network.SANDBOX, // or Network.MAINNET for the mainnet network
  };

  const dataToGetBalance = {
    userId: 'Enter the username of user to whom you want to retrive the balance',
  }

  try {
    const getBalanceResponse = await erc721.getBalance(dataToGetBalance);
  } catch (error) {
    // Handle the error
  }
}

```

---

- Please ensure that you replace the `token` used in the `Authorization` header with your own `token`, which you will receive in response to the [authentication method](./authenticate.md)

- In this example, the `getBalance` function is an `async` function that uses `await` to pause execution until the `erc721.getBalance` promise resolves. If the promise resolves successfully, the response for minting the token  will be logged. If an error occurs, it will be caught and logged using `console.error`

- Before attempting to fetch the balance of your account, make sure that the ERC721 tokens have been minted. The minting process should be implemented using the specific minting function [Mint Tokens](./mint_token.md)

- Before attempting to fetch the user's balance, make sure that you have transferred some tokens to them.

- Provide the username of the user for whom you wish to fetch the token balance in the `userId` field. You will obtain the username in the response of the [enroll users](./) or [account Id](./account_Id.md)


---

- Response Description: In response, the following attributes are included—`balance`;

  | Key             | Type   |
  | --------------- | ------ |
  | balance         | number |

