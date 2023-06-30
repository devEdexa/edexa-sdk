# Webhook Events

## To list webhooks created:

---

```SDK.js
import { Bstamp, Network } from 'bstamp-library';

async function getWebhook() {
  const bStamp = new Bstamp({
      ...settings,
      authorization: `Bearer ${token}`,
    });
  const settings = {
    network: Network.SANDBOX, // or Network.MAINNET for the mainnet network
  };

  const version = {
    version: API_VERSION.VERSION_2
  }

  try {
    const webhook = await bstamp.createWebhook(version);
    console.log('Success: ', webhook);
  } catch (error) {
    console.error('Failure: ', error);
  }
}

```

---

- Make sure to replace `token` used in `Authorization` with your `token`, which you will get in response of [authentication method](./authenticate.md)

---

- In this example, the `getWebhook` function is an `async` function that uses `await` to wait for the `bstamp.getWebhook` promise to resolve. If the promise resolves successfully, the stamped response is logged. If an error occurs, it is caught and logged using `console.error`.
- The details of the edeXa webhook-events for bStamp, is available on [bStamp-Webhook](https://developer.edexa.network/docs/edeXa-apis/bStamp/V2/webhooks/introduction)

- In `version`, use specific availiable versions of bstamp.

---

- Response Description :

  - The method resposne will have `message ` and `data`.
  - Type of `message` is `String`.
  - Type of `data` is `Array of objects`.

    | Key         | Type   |
    | ----------- | ------ |
    | \_id        | String |
    | action      | Array  |
    | userId      | String |
    | redirectUrl | String |
    | description | String |
    | status      | Number |
    | createdAt   | String |
    | updatedAt   | String |

  - Type of `action` is `Array of string`.
