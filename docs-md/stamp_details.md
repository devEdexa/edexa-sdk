# 📝 Get Stamped file details

## To get details of stamped file, stamped by user

---

```SDK.js
import { Bstamp, Network } from 'edeXa-sdk';

async function getStampDetail() {
  const bStamp = new Bstamp({
      ...settings,
      authorization: `Bearer ${token}`,
    });
  const settings = {
    network: Network.SANDBOX, // or Network.MAINNET for the mainnet network
  };

  const stampedFileId = {
    id: 'STAMPED_FILE_ID'
  }

  const version = {
    version: API_VERSION.VERSION_1 // or API_VERSION.VERSION_2 for version 2
  }

  try {
    const stampDetails = await bstamp.getStampDetail(stampedFileId, version);
    console.log('Success: ', stampDetails);
  } catch (error) {
    console.error('Failure: ', error);
  }
}

```

---

- Make sure to replace `token` used in `Authorization` with your `token`, which you will get in response of [authentication method](./authenticate.md)

---

- In this example, the `getStampDetail` function is an `async` function that uses `await` to wait for the `bstamp.getStampDetail` promise to resolve. If the promise resolves successfully, the stamped response is logged. If an error occurs, it is caught and logged using `console.error`.

---

- Make sure to replace `STAMPED_FILE_ID` with your actual `id` of stamped file.
- The `STAMPED_FILE_ID`, can be retrieved from :
  1. [Add Stamp](./stamp.md) : In success response of `add stamp` method you can get `id` of stamped file.
  2. [Stamps List](./stamps_list.md) : In success of `stamp list` method, you can also get `id` of stamped file.
