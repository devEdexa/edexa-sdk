# 📝 Total token owned by user
## To inquire about the total token owned by admin or to view the total token owned by a specific user, you must provide their userId with the ERC721 API. This can be achieved by utilizing the getOwnerDetails method:
---

```SDK.js
import { ERC721, Network } from 'edeXa-sdk';

async function getOwnerDetails() {
  const erc721 = new ERC721({
      ...settings,
      authorization: `Bearer ${token}`,
    });
  const settings = {
    network: Network.SANDBOX, // or Network.MAINNET for the mainnet network
  };

  const dataToGetOwnerDetails = {
    userId(optional): 'Enter the username of user to whom you want to retrive the total tokens owned by that particular user',
  }

  try {
    const getOwnerDetailsResponse = await erc721.getOwnerDetails(dataToGetOwnerDetails);
  } catch (error) {
    // Handle the error
  }
}

```

---

- Please ensure that you replace the `token` used in the `Authorization` header with your own `token`, which you will receive in response to the [authentication method](./authenticate.md)

- In this example, the `getOwnerDetails` function is an `async` function that uses `await` to pause execution until the `erc721.getOwnerDetails` promise resolves. If the promise resolves successfully, the response for total token owned by user will be logged. If an error occurs, it will be caught and logged using `console.error`

- Before attempting to fetch the total token owned by you, make sure that the ERC721 tokens have been minted. The minting process should be implemented using the specific minting function [Mint Tokens](./mint_token.md)

- Additionally, to fetch the user's token owned details, make sure that you have transferred some tokens to them.

- Provide the username of the user for whom you wish to fetch the token details in the `userId` field. You will obtain the username in the response of the [enroll users](./) or [account Id](./account_Id.md)


---

- Response Description: In response, the following attributes are included—`data`;

  | Key             | Type   |
  | --------------- | ------ |
  | data            | Array |

- Response of data Object: In response, the following attributes are included—`tokenUri`, `owner`, `tokenId`

  | Key      | Type   |
  | -------- | ------ |
  | tokenUri | String |
  | owner    | String |
  | tokenId  | String |


