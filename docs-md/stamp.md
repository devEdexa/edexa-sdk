# 📝 Add Stamp

## To add stamp with the edeXa API, use the addStamp method:

---

```SDK.js
import { Bstamp, Network } from 'bstamp-library';

async function addStamp() {
  const bStamp = new Bstamp({
      ...settings,
      authorization: `Bearer ${token}`,
    });
  const settings = {
    network: Network.SANDBOX, // or Network.MAINNET for the mainnet network
  };

  const dataToStamp = {
    hash: 'HASH',
    isPrivate: 'true' // or false for public network
  }

  const version = {
    version: API_VERSION.VERSION_1 // or API_VERSION.VERSION_2 for version 2
  }

  try {
    const addedStampResponse = await bstamp.addStamp(data, version);
    console.log('Success: ', addedStampResponse);
  } catch (error) {
    console.error('Failure: ', error);
  }
}

```

---

- Make sure to replace `token` used in `Authorization` with your `token`, which you will get in response of [authentication method](./authenticate.md)
- In this example, the `addStamp` function is an `async` function that uses `await` to wait for the `bstamp.addStamp` promise to resolve. If the promise resolves successfully, the stamped response is logged. If an error occurs, it is caught and logged using `console.error`.
- Make sure to replace `HASH` with your actual hash value.
- Make sure to add `true` or `false` in isPrivate flag while adding stamp.
- In `version`, use specific availiable versions of bstamp.

---

- Response Description: In resposne `id`, `txId`, `code`, `hash`, `filename`

  | Key      | Type   |
  | -------- | ------ |
  | id       | String |
  | txId     | String |
  | code     | String |
  | hash     | String |
  | filename | String |
