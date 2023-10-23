# 📝 Update File Expire Time

## Update file expire time with the Barchive API, use the updateFile method:

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

  const dataToUpdateFile = {
    id: FILE_ID,
    expireTimeInMinutes: EXPIRE_TIME, // Time should in minutes
  }

  try {
    const addedFileResponse = await barchive.updateFile(dataToUpdateFile);
  } catch (error) {
    // Handle the error
  }
}

```

---

- Make sure to replace `token` used in `Authorization` with your `token`, which you will get in response of [authentication method](./authenticate.md)
- In this example, the `updateFile` function is an `async` function that uses `await` to wait for the `barchive.updateFile` promise to resolve. If the promise resolves successfully, the updating file response is logged. If an error occurs, it is caught and logged using `console.error`.
- Please make sure to replace `FILE_ID` with the actual file ID received when using the `addFile` method.
- Make sure to replace `EXPIRE_TIME` with the actual file expiration time you wish to set

---

- Response Description: In resposne `status`, `message`

  | Key     | Type   |
  | ------- | ------ |
  | status  | Number |
  | message | String |

