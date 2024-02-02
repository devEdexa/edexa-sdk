# 📝 Batch Burn Token

## For burning the token with the ERC1155 API, utilize the batchBurn method:

---

```SDK.js
import { ERC1155, Network } from 'edeXa-sdk';

async function batchBurn() {
  const erc1155 = new ERC1155({
      ...settings,
      authorization: `Bearer ${token}`,
    });
  const settings = {
    network: Network.SANDBOX, // or Network.MAINNET for the mainnet network
  };

  const dataToBatchBurn = {
    tokenId(required): 'Enter multiple tokenIds into the array to burn.'
    value(required): 'Enter the amounts of tokens into the array to burn.',
    chaincode(optional): 'The name of the smart contract or chaincode managing the tokens',
    channel(optional): 'The name of the channel in the blockchain network'
  }

  try {
    const batchBurnResponse = await erc1155.batchBurn(dataToBatchBurn);
  } catch (error) {
    // Handle the error
  }
}

```

---

- Please ensure that you replace the `token` used in the `Authorization` header with your own `token`, which you will receive in response to the [authentication method](./authenticate.md)
- In this example, the `batchBurn` function is an `async` function that uses `await` to pause execution until the `erc1155.batchBurn` promise resolves. If the promise resolves successfully, the response for burning the token will be logged. If an error occurs, it will be caught and logged using `console.error`
- This function is used to burn multiple tokens at the same time through a single API or single function call.
- Provide the amount of tokens you want to burn in the `value` field, respectively.
- Enter an array containing the amounts of multiple tokens you wish to burn in a single API or single function call.
---

- Response Description: In response, the following attributes are included—`burner`.

  | Key             | Type   |
  | --------------- | ------ |
  | burner          | string |
