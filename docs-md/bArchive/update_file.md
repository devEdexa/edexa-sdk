# 📝 Update File Expire Time

## Update file expire time with the edeXa API, use the updateFile method:

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
    console.log('Success: ', addedFileResponse);
  } catch (error) {
    console.error('Failure: ', error);
  }
}

```

---

- Make sure to replace `token` used in `Authorization` with your `token`, which you will get in response of [authentication method](./authenticate.md)
- In this example, the `updateFile` function is an `async` function that uses `await` to wait for the `barchive.updateFile` promise to resolve. If the promise resolves successfully, the updating file response is logged. If an error occurs, it is caught and logged using `console.error`.
- Make sure to replace `FILE_ID` with your actual file id which are receive on `addFile`.
- Make sure to replace `EXPIRE_TIME` with actual file expire time whatever you want to update.

---

- Response Description: In resposne `status`, `message`

  | Key     | Type   |
  | ------- | ------ |
  | status  | number |
  | message | String |

