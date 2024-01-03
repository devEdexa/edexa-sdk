# 📝 Delete File

## Delete file with the Barchive API, use the deleteFile method:

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
  } catch (error) {
    // Handle the error
  }
}

```

---

- Make sure to replace `token` used in `Authorization` with your `token`, which you will get in response of [authentication method](./authenticate.md)
- In this example, the `deleteFile` function is an `async` function that uses `await` to pause execution until the `barchive.deleteFile` promise resolves. If the promise resolves successfully, the response for updating the file will be logged. If an error occurs, it will be caught and logged using `console.error`.
- Please make sure to replace `FILE_ID` with the actual file ID received when using the `addFile` method.

---

- Response Description: In resposne `status`, `message`

  | Key     | Type   |
  | ------- | ------ |
  | status  | number |
  | message | String |

