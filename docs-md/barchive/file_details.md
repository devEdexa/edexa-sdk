# 📝 Get file details

## To get details of adding file, added by user

---

```SDK.js
import { Barchive, Network } from 'edeXa-sdk';

async function getStampDetail() {
  const barchive = new Barchive({
      ...settings,
      authorization: `Bearer ${token}`,
    });
  const settings = {
    network: Network.SANDBOX, // or Network.MAINNET for the mainnet network
  };

  const fileId = {
    id: 'FILE_ID'
  }


  try {
    const fileDetails = await barchive.getFile(fileId);
  } catch (error) {
    // Handle the error
  }
}

```

---

- Make sure to replace `token` used in `Authorization` with your `token`, which you will get in response of [authentication method](./authenticate.md)

---

- In this example, the `getFile` function is an `async` function that uses `await` to wait for the `barchive.getFile` promise to resolve. If the promise resolves successfully, the file details response is logged. If an error occurs, it is caught and logged using `console.error`.

---

- Make sure to replace `FILE_ID` with your actual `id` of adding file.
- The `FILE_ID`, can be retrieved from the following source:
  - [Add File](./file_add.md) : In the success response of the `addFile` method, you can find the `id` of the added file.

---

- Response Description: In response, the following attributes are included—`file`, `fileName`, `fileSize` and `mimeType`.

  | Key             | Type   |
  | --------------- | ------ |
  | file            | String |
  | fileName        | String |
  | fileSize        | Number |
  | mimeType        | String |