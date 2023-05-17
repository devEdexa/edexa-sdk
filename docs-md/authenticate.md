# 🛣️ Authenticating the Client

## To authenticate the client with the Edexa API, use the authenticate method.

---

```SDK.js
import { Bstamp, Network } from 'bstamp-library';

async function authenticateClient() {
  const bstamp = new Bstamp();
  const settings = {
    clientId: 'your_client_id',
    clientSecret: 'your_client_secret',
    network: Network.SANDBOX, // or Network.MAINNET for the mainnet network
  };

  try {
    const authResponse = await bstamp.authenticate(settings);
    console.log('Authentication successful:', authResponse);
  } catch (error) {
    console.error('Authentication failed:', error);
  }
}

```
---

In this example, the `authenticateClient` function is an `async` function that uses `await` to wait for the `bstamp.authenticate` promise to resolve. If the promise resolves successfully, the authentication response is logged. If an error occurs, it is caught and logged using `console.error`.

Make sure to replace `your_client_id` and `your_client_secret` with your actual `client ID` and `client secret`.

