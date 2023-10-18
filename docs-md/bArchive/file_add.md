# 📝 Add File

## To add file with the edeXa API, use the addFile method:

---

```SDK.js
import { Barchive, Network } from 'edeXa-sdk';

async function addFile() {
  const barchive = new Barchive({
      ...settings,
      authorization: `Bearer ${token}`,
    });
  const settings = {
    network: Network.SANDBOX, // or Network.MAINNET for the mainnet network
  };

  const dataToAddFile = {
    lat: '72.12',
    long: '72.12',
    expireTimeInMinutes: '2',
    description: 'write description whatever you write',
    attachments: 'IMAGE_URL' // https://picsum.photos/200
  }

  try {
    const addedFileResponse = await barchive.addFile(dataToAddFile);
    console.log('Success: ', addedFileResponse);
  } catch (error) {
    console.error('Failure: ', error);
  }
}

```

---

- Make sure to replace `token` used in `Authorization` with your `token`, which you will get in response of [authentication method](./authenticate.md)
- In this example, the `addFile` function is an `async` function that uses `await` to wait for the `barchive.addFile` promise to resolve. If the promise resolves successfully, the adding file response is logged. If an error occurs, it is caught and logged using `console.error`.
- Make sure to replace `IMAGE_URL` with your actual attachments value and also pass multiple file on attachments field.
- Pass latitude and longitude on `lat` and `long` field.
- Added proper description of file on `description` field.
- Pass file expire time on `expireTimeInMinutes` field.

---

- Response Description: In resposne `status`, `message`, `data`

  | Key     | Type   |
  | ------- | ------ |
  | status  | number |
  | message | String |
  | data    | Array  |

- Response of data object: In resposne `file`, `fileName`, `description`,`lat`,`long`,`transactionId`,`uniqueId`,`expireTime`,`expireTimeStamp`,`id`,`createdAt`,`updatedAt`

  | Key             | Type   |
  | --------------- | ------ |
  | id              | String |
  | file            | Array  |
  | fileName        | String |
  | description     | String |
  | lat             | String |
  | long            | String |
  | transactionId   | String |
  | uniqueId        | String |
  | expireTime      | String |
  | expireTimeStamp | String |
  | createdAt       | String |
  | updatedAt       | String |


- Response of file object: In resposne `fileName`, `fileType`, `mimeType`,`fileSize`.

  | Key      | Type   |
  | -------- | ------ |
  | fileName | String |
  | fileType | String |
  | mimeType | String |
  | fileSize | Number |
