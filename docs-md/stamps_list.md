# List Stamps

## To add stamp with the Edexa API, use the addStamp method:

---

```SDK.js
import { Bstamp, Network } from 'edeXa-sdk';

async function getAllStamp() {
  const bStamp = new Bstamp({
      ...settings,
      authorization: `Bearer ${token}`,
    });
  const settings = {
    network: Network.SANDBOX, // or Network.MAINNET for the mainnet network
  };

  const dataToStamp = {
    hash: 'HASH',
    isPrivate: true // or false for public network
  }

  const version = {
    version: API_VERSION.VERSION_1 // or API_VERSION.VERSION_2 for version 2
  }

  try {
    const stamps = await bstamp.getAllStamp(data, version);
    console.log('Success: ', stamps);
  } catch (error) {
    console.error('Failure: ', error);
  }
}

```

---

- Make sure to replace `token` used in `Authorization` with your `token`, which you will get in response of [authentication method](./authenticate.md)

---

- In this example, the `getAllStamp` function is an `async` function that uses `await` to wait for the `bstamp.getAllStamp` promise to resolve. If the promise resolves successfully, the stamped response is logged. If an error occurs, it is caught and logged using `console.error`.
- Make sure to replace `HASH` with your actual hash value.
- Make sure to add `true` or `false` in isPrivate flag while getting stamped files.
- In `version`, use specific availiable versions of bstamp.

---

- Response Description :

  - The method resposne will have `count ` and `stamps`.
  - Type of `count` is `Number`.
  - Type of `stamps` is `Array of objects`.

    | Key             | Type    |
    | --------------- | ------- |
    | id              | String  |
    | userId          | String  |
    | clientId        | String  |
    | blockchainId    | String  |
    | name            | String  |
    | txId            | String  |
    | hash            | String  |
    | type            | String  |
    | code            | String  |
    | originalDocHash | String  |
    | isEsign         | Boolean |
    | isPrivateBc     | Boolean |
    | createdAt       | String  |
    | updatedAt       | String  |
