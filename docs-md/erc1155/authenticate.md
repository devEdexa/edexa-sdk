# 🛣️ Authenticating the Client

## To authenticate the client with the edeXa API, utilize the authenticate method.

---

```SDK.js
import { ERC1155, Network } from 'edeXa-sdk';

async function authenticateClient() {
  const erc1155 = new ERC1155();
   const authSettings = {
      clientId: 'your_client_id',
      secretKey: 'your_client_secret',
       network: Network.SANDBOX, // or Network.MAINNET for the mainnet network
    };

  try {
    const authResponse = await erc1155.authenticate(settings);
  } catch (error) {
    // Handle the error
  }
}

```

---

- In this example, the `authenticateClient` function is an `async` function that uses `await` to wait for the `erc1155.authenticate` promise to resolve. If the promise resolves successfully, the authentication response is logged. If an error occurs, it is caught and logged using `console.error`.

- Make sure to replace `your_client_id` and `your_client_secret` with your actual `client ID` and `client secret`.

---

- Response Description:

  | Key      | Type   |
  | -------- | ------ |
  | id       | String |
  | token    | String |
  | username | String |
  | email    | String |
