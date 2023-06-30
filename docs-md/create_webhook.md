# Create Webhook

## To create webhook, use webhook ebents in action:

---

```SDK.js
import { Bstamp, Network } from 'bstamp-library';

async function createWebhook() {
  const bStamp = new Bstamp({
      ...settings,
      authorization: `Bearer ${token}`,
    });
  const settings = {
    network: Network.SANDBOX, // or Network.MAINNET for the mainnet network
  };

  const dataToCreate = {
    redirectUrl: 'https://example.com',
    description: 'Creating webhook for an event, provided by edeXa',
    action: ['hash.succeed', 'hash.failed'],
  }

  const version = {
    version: API_VERSION.VERSION_2
  }

  try {
    const webhook = await bstamp.createWebhook(dataToCreate, version);
    console.log('Success: ', webhook);
  } catch (error) {
    console.error('Failure: ', error);
  }
}

```

---

- Make sure to replace `token` used in `Authorization` with your `token`, which you will get in response of [authentication method](./authenticate.md)

---

- In this example, the `createWebhook` function is an `async` function that uses `await` to wait for the `bstamp.createWebhook` promise to resolve. If the promise resolves successfully, the stamped response is logged. If an error occurs, it is caught and logged using `console.error`.
- Make sure to replace `redirectUrl` with the url on which you want to create webhook.
- Make sure to add `description` for the respective webhook which you are going to create.
- Make sure to replace `action` with actual events.
- The details of the edeXa webhook-events for bStamp, is available on [bStamp-Webhook](https://developer.edexa.network/docs/edeXa-apis/bStamp/V2/webhooks/introduction)

- In `version`, use specific availiable versions of bstamp.

---
