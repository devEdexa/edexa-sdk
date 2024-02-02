# 📝 Enroll Users

## To enroll users using the ERC1155 API, utilize the enrollUser method:

---

```SDK.js
import { ERC1155, Network } from 'edeXa-sdk';

async function enrollUser() {
  const erc1155 = new ERC1155({
      ...settings,
      authorization: `Bearer ${token}`,
    });
  const settings = {
    network: Network.SANDBOX, // or Network.MAINNET for the mainnet network
  };

  const dataToEnrollUser = {
    email(required): 'The email of user',
    firstName(required): 'The firstName of user',
    lastName(required): 'The lastName of user',
  }

  try {
    const enrollUserResponse = await erc1155.enrollUser(dataToEnrollUser);
  } catch (error) {
    // Handle the error
  }
}

```

---

- Please ensure that you replace the `token` used in the `Authorization` header with your own `token`, which you will receive in response to the [authentication method](./authenticate.md)
- In this example, the `enrollUser` function is an `async` function that uses `await` to pause execution until the `erc1155.enrollUser` promise resolves. If the promise resolves successfully, the response for enroll users will be logged. If an error occurs, it will be caught and logged using `console.error`
- Provide the valid email in the `email` field, respectively.

---

- Response Description: In response, the following attributes are included— `id`,`firstName`,`lastName`,`username`,`uuid`,`status`,`email`,`chaincode`,`channel`,`_id`,`createdAt`,`updatedAt`,`clientId`.

  | Key       | Type   |
  | --------- | ------ |
  | firstName | number |
  | lastName  | string |
  | username  | string |
  | uuid      | string |
  | status    | string |
  | email     | string |
  | chaincode | string |
  | channel   | string |
  | _id       | string |
  | createdAt | string |
  | updatedAt |  null  |
  | clientId  | string |
  

