# 🛣️ Authenticating the Client

## To authenticate the client with the Barchive API, use the authenticate method.

---

```SDK.js
import { Barchive, Network } from 'edeXa-sdk';

async function authenticateClient() {
  const barchive = new Barchive();
  const settings = {
    clientId: 'your_client_id',
    clientSecret: 'your_client_secret',
    network: Network.SANDBOX, // or Network.MAINNET for the mainnet network
  };

  try {
    const authResponse = await barchive.authenticate(settings);
  } catch (error) {
    // Handle the error
  }
}

```

---

- In this example, the `authenticateClient` function is an `async` function that uses `await` to wait for the `barchive.authenticate` promise to resolve. If the promise resolves successfully, the authentication response is logged. If an error occurs, it is caught and logged using `console.error`.

- Make sure to replace `your_client_id` and `your_client_secret` with your actual `client ID` and `client secret`.

---

- Response Description:

  | Key      | Type   |
  | -------- | ------ |
  | id       | String |
  | token    | String |
  | username | String |
  | name     | String |
