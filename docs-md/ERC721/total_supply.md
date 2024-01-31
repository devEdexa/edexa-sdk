# 📝 Total Supply of minted tokens

## To inquire about the total supply of minted tokens with the ERC721 API. This can be achieved by utilizing the getTotalSupply method:

---

```SDK.js
import { ERC721, Network } from 'edeXa-sdk';

async function getTotalSupply() {
  const erc721 = new ERC721({
      ...settings,
      authorization: `Bearer ${token}`,
    });
  const settings = {
    network: Network.SANDBOX, // or Network.MAINNET for the mainnet network
  };

  const dataToGetSupply = {
    chaincode(optional): 'The name of the smart contract or chaincode managing the tokens',
    channel(optional): 'The name of the channel in the blockchain network'
  }

  try {
    const getTotalSupplyResponse = await erc721.getTotalSupply(dataToGetSupply);
  } catch (error) {
    // Handle the error
  }
}

```

---

- Please ensure that you replace the `token` used in the `Authorization` header with your own `token`, which you will receive in response to the [authentication method](./authenticate.md)

- In this example, the `getTotalSupply` function is an `async` function that uses `await` to pause execution until the `erc721.getTotalSupply` promise resolves. If the promise resolves successfully, the response for getting the total supply will be logged. If an error occurs, it will be caught and logged using `console.error`

- Before attempting to fetch the total supply, make sure that the ERC721 tokens have been minted. The minting process should be implemented using the specific minting function [Mint Tokens](./mint_token.md)

---

- Response Description: In response, the following attributes are included—`supply`;

  | Key     | Type   |
  | ------- | ------ |
  | supply  | string |
