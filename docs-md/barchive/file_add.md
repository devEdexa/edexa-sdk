# 📝 Add File

## To add file with the Barchive API, use the addFile method:

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
  } catch (error) {
    // Handle the error
  }
}

```

---

- Please ensure that you replace the `token` used in the `Authorization` header with your own `token`, which you will receive in response to the [authentication method](./authenticate.md)
- In this example, the `addFile` function is an `async` function that uses `await` to pause execution until the `barchive.addFile` promise resolves. If the promise resolves successfully, the response for adding the file will be logged. If an error occurs, it will be caught and logged using `console.error`
- Make sure to replace `IMAGE_URL` with your actual `attachments` value and also pass multiple file in the `attachments` field.
- Provide the latitude and longitude in the `lat` and `long` fields, respectively.
- Include a proper file `description` in the `description` field.
- Specify the file's expiration time in the `expireTimeInMinutes` field.

---

- Response Description: In response, the following attributes are included—`file`, `fileName`, `description`, `lat`, `long`, `transactionId`, `uniqueId`, `expireTime`, `expireTimeStamp`, `id`, `createdAt`, and `updatedAt`.

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


- Response of File Object: In response, the following attributes are included—`fileName`, `fileType`, `mimeType`, and `fileSize`.

  | Key      | Type   |
  | -------- | ------ |
  | fileName | String |
  | fileType | String |
  | mimeType | String |
  | fileSize | Number |
