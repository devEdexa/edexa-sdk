# Add Stamp

## To add stamp with the Edexa API, use the addStamp method

---

```SDK.js
import { Bstamp, Network } from 'bstamp-library';

async function enrollUser() {
  const bStamp = new Bstamp({
      ...settings,
      authorization: `Bearer ${token}`,
    });
  const settings = {
    network: Network.SANDBOX, // or Network.MAINNET for the mainnet network
  };

  const dataToEnrollUser = {
    userId: 'USER_ID',
    username: 'USER_NAME',
    email: 'EMAIL'
  }


  try {
    const enrolledUserDetails = await bstamp.enrollUser(dataToEnrollUser);
    console.log('Success: ', enrolledUserDetails);
  } catch (error) {
    console.error('Failure: ', error);
  }
}

```
---
- Make sure to replace `token` used in `Authorization` with your `token`, which you will get in response of [authentication method](./authenticate.md)

---

- In this example, the `enrollUser` function is an `async` function that uses `await` to wait for the `bstamp.enrollUser` promise to resolve. If the promise resolves successfully, the stamped response is logged. If an error occurs, it is caught and logged using `console.error`.
---

- Make sure to replace `USER_ID` with your actual `userId` of user, to whom you want to enroll in system.
- Make sure to replace `USER_NAME` with your actual `username`.
- Make sure to replace `EMAIL` with your actual `email`, which you want to have in system for future communication purpose.