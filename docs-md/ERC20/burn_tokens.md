# 📝 Burn Tokens

## To burn tokens with the ERC20 API, utilize the burnToken method:

---

```SDK.js
import { ERC20, Network } from 'edeXa-sdk';

async function burnToken() {
  const erc20 = new ERC20({
      ...settings,
      authorization: `Bearer ${token}`,
    });
  const settings = {
    network: Network.SANDBOX, // or Network.MAINNET for the mainnet network
  };

  const dataToBurnToken = {
    value(required): 'Enter the amount of tokens to burn',
    chaincode(optional): 'The name of the smart contract or chaincode managing the tokens',
    channel(optional): 'The name of the channel in the blockchain network'
  }

  try {
    const burnTokenResponse = await erc20.burnToken(dataToBurnToken);
  } catch (error) {
    // Handle the error
  }
}

```

---

- Please ensure that you replace the `token` used in the `Authorization` header with your own `token`, which you will receive in response to the [authentication method](./authenticate.md)

- In this example, the `burnToken` function is an `async` function that uses `await` to pause execution until the `erc20.burnToken` promise resolves. If the promise resolves successfully, the response for burn tokens will be logged. If an error occurs, it will be caught and logged using `console.error`

- Provide the amount of tokens you want to burn in the `value` field, respectively.
---

- Response Description: In response, the following attributes are included—`burner`, `updatedBalance`.

  | Key             | Type   |
  | --------------- | ------ |
  | updatedBalance  | number |
  | burner          | string |
