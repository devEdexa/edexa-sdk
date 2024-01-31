# 🛣️ Authenticating the Client

## To authenticate the client with the edeXa API, utilize the authenticate method.

---

```SDK.js
import { ERC20, Network } from 'edeXa-sdk';

async function authenticateClient() {
  const erc20 = new ERC20();
  const settings = {
   client-id: 'your_client_id',
   secret-key: 'your_client_secret',
    network: Network.SANDBOX, // or Network.MAINNET for the mainnet network
  };

  try {
    const authResponse = await erc20.authenticate(settings);
    console.log('Authentication successful:', authResponse);
  } catch (error) {
    console.error('Authentication failed:', error);
  }
}

```

---

- In this example, the `authenticateClient` function is an `async` function that uses `await` to wait for the `erc20.authenticate` promise to resolve. If the promise resolves successfully, the authentication response is logged. If an error occurs, it is caught and logged using `console.error`.

- Make sure to replace `your_client_id` and `your_client_secret` with your actual `client ID` and `client secret`.

---

- Response Description:

  | Key      | Type   |
  | -------- | ------ |
  | id       | String |
  | token    | String |
  | username | String |
  | email    | String |
