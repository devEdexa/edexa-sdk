# 📝 Enroll Users

## To enroll users using the ERC20 API, utilize the enrollUser method:

---

```SDK.js
import { ERC20, Network } from 'edeXa-sdk';

async function enrollUser() {
  const erc20 = new ERC20({
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
    phone(required): 'The phone number of user',
    role(required): 'The role you want to give to user(`role` should be [admin,user])',
    countryCode(required): 'The countryCode of user',
    serviceName(required): 'erc20'
  }

  try {
    const enrollUserResponse = await erc20.enrollUser(dataToEnrollUser);
  } catch (error) {
    // Handle the error
  }
}

```

---

- Please ensure that you replace the `token` used in the `Authorization` header with your own `token`, which you will receive in response to the [authentication method](./authenticate.md)
- In this example, the `enrollUser` function is an `async` function that uses `await` to pause execution until the `erc20.enrollUser` promise resolves. If the promise resolves successfully, the response for enroll users will be logged. If an error occurs, it will be caught and logged using `console.error`
- Provide the valid email in the `email` field, respectively.

---

- Response Description: In response, the following attributes are included— `id`,`firstName`,`lastName`,`username`,`uuid`,`phone`,`role`,`status`,`email`,`chaincode`,`channel`,`profilePic`,`_id`,`createdAt`,`updatedAt`,`loginType`,`clientId`.

  | Key     | Type   |
  | ------- | ------ |
  | firstName | number |
  | lastName  | string |
  | username  | string |
  | uuid      | string |
  | phone     | string |
  | role      | string |
  | status    | string |
  | email     | string |
  | chaincode | string |
  | channel   | string |
  | profilePic| string |
  | _id       | string |
  | createdAt | string |
  | updatedAt |  null  |
  | loginType | string |
  | clientId  | string |
  

