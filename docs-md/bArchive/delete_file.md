# 📝 Delete File

## Delete file with the edeXa API, use the deleteFile method:

---

```SDK.js
import { Barchive, Network } from 'edeXa-sdk';

async function updateFileExpireTime() {
  const barchive = new Barchive({
      ...settings,
      authorization: `Bearer ${token}`,
    });
  const settings = {
    network: Network.SANDBOX, // or Network.MAINNET for the mainnet network
  };

  const dataToDeleteFile = {
    id: FILE_ID,
  }

  try {
    const deleteFileResponse = await barchive.deleteFile(dataToDeleteFile);
    console.log('Success: ', deleteFileResponse);
  } catch (error) {
    console.error('Failure: ', error);
  }
}

```

---

- Make sure to replace `token` used in `Authorization` with your `token`, which you will get in response of [authentication method](./authenticate.md)
- In this example, the `deleteFile` function is an `async` function that uses `await` to wait for the `barchive.deleteFile` promise to resolve. If the promise resolves successfully, the updating file response is logged. If an error occurs, it is caught and logged using `console.error`.
- Make sure to replace `FILE_ID` with your actual file id which are receive on `addFile`.

---

- Response Description: In resposne `status`, `message`

  | Key     | Type   |
  | ------- | ------ |
  | status  | number |
  | message | String |

